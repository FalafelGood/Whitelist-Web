// J.M.J.
// import 'dotenv/config';
import { neon } from "@neondatabase/serverless";


export const config = {
    runtime: 'edge',
}


const VOYAGE_EMBEDDINGS_URL = 'https://api.voyageai.com/v1/embeddings';
const VOYAGE_MODEL = 'voyage-4-lite';
const VOYAGE_DIM = 1024;


function normalizeText(s) {
  return (s ?? '').trim().replace(/\s+/g, ' ');
}


async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms));
}


async function voyageEmbed(
  inputs,
  inputType,
) {
  const apiKey = process.env.VITE_VOYAGE_API_KEY;
  const normalized = inputs.map(normalizeText);

  const maxAttempts = 4;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(VOYAGE_EMBEDDINGS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: VOYAGE_MODEL,
        input_type: inputType,
        input: normalized,
      }),
    });

    if (res.ok) {
      const json = (await res.json());
      const out = new Array(normalized.length);
      for (const row of json.data ?? []) out[row.index] = row.embedding;
      if (out.some((e) => !Array.isArray(e))) {
        throw new Error('Voyage embeddings response missing indices');
      }
      for (const e of out) {
        if (e.length !== VOYAGE_DIM) {
          throw new Error(`Unexpected embedding dim=${e.length} (expected ${VOYAGE_DIM})`);
        }
      }
      return out;
    }

    // Retry 429/5xx with exponential backoff.
    if (res.status === 429 || res.status >= 500) {
      if (attempt === maxAttempts) break;
      const backoffMs = 250 * Math.pow(2, attempt - 1);
      await sleep(backoffMs);
      continue;
    }

    const body = await res.text().catch(() => '');
    throw new Error(`Voyage embeddings error: HTTP ${res.status} ${body}`.trim());
  }

  throw new Error('Voyage embeddings error: exhausted retries');
}

function toPgvectorTextLiteral(vec) {
    // pgvector accepts the "[...]" text format; we'll pass it as a parameter and cast to vector(1024) in SQL.
    return `[${vec.join(',')}]`;
}


async function embedQuery(query) {
  const [v] = await voyageEmbed([query], 'query');
  return v;
}


/*
    Takes a query delimited by '+' and turns it into a query delimited by " ".
    e.g. "pints+with+aquinas" => "pints with aquinas"
*/
function delimitBySpace(str) {
    const words = str.split("+");
    return words.join(" ");
}


export default async function handler(request) {

    const headers = {
        'Content-Type' : 'application/json'
    }

    if (request.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        );
    }

    const url = new URL(request.url);
    const searchQuery = delimitBySpace(url.searchParams.get('search_query'));

    try {
        const vec = await embedQuery(searchQuery);
        const sql = neon(process.env.VITE_NEON_DATABASE_URL);

        const [videoRows, channelRows] = await sql.transaction([
          sql`
            SELECT * FROM search_video_titles(
            ${searchQuery},
            ${toPgvectorTextLiteral(vec)}::vector(1024)
            )
          `,
          sql`
            SELECT 
              to_json(channel) AS channel,
              lexical_score
            FROM search_channels(${searchQuery}, 1)
            `
        ])

        const top = channelRows?.[0];
        const channelMatch = 
          top && Number(top.lexical_score) > 0.50 ? top.channel : null;

        return new Response(
          JSON.stringify({
            rows: videoRows,
            channel: channelMatch
          })
        )
        
        // return new Response(
        //     JSON.stringify({ rows }),
        //     { status: 200, headers }
        // );

    } catch (error) {
        console.error('Database error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error', message: error.message }),
            { status: 500, headers }
        );
    }
}