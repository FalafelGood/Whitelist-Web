import { neon } from '@neondatabase/serverless'

// Tell Vercel to use the edge runtime. (I can choose from a few options like nodejs I think)
export const config = {
    runtime: 'edge',
}

// This was the incorrect way of doing it. My program was hanging because of this line.
// runtime = 'edge';

export default async function handler(request) {

    // Header is used here to tell client they're recieving json data
    const headers = {
        'Content-Type' : 'application/json',
    };

    if (request.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        );
    }

    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const seed = url.searchParams.get('seed') || crypto.randomUUID();
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = parseInt(url.searchParams.get('limit') || '12', 10);
    const offset = (page - 1) * limit;

    try {
        // Initialize Neon client with environment variable containing handshake
        const sql = neon(process.env.NEON_DATABASE_URL);
        let channels = [];

        if (!category || category === "all") {
            channels = await sql`
                SELECT * FROM channels
                    WHERE human_moderation_status = 'approved'
                ORDER BY md5(yt_channel_id::text || ${seed}) 
                LIMIT ${limit} OFFSET ${offset};
            `
        } else {
            channels = await sql`
                SELECT c.*
                FROM channels c
                JOIN channel_categories cc ON cc.yt_channel_id = c.yt_channel_id
                WHERE cc.category_id = (
                    SELECT id FROM categories WHERE name = ${category}
                )
                AND c.human_moderation_status = 'approved'
                ORDER BY md5(c.yt_channel_id::text || ${seed}) 
                LIMIT ${limit} OFFSET ${offset};
            `
        }

        // if (!category || category==="all") {
        //     channels = await sql`SELECT * FROM channels WHERE human_moderation_status = 'approved' ORDER BY md5(yt_channel_id::text || ${seed}) LIMIT ${limit} OFFSET ${offset}`;
        // } else {
        //     channels = await sql`SELECT * FROM channels WHERE human_moderation_status = 'approved' AND category = ${category} ORDER BY md5(yt_channel_id::text || ${seed}) LIMIT ${limit} OFFSET ${offset}`;
        // }

        return new Response(
            JSON.stringify({ seed, channels }),
            { status: 200, headers }
        );

    } catch (error) {
        console.error('Database error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error', message: error.message }),
            { status: 500, headers }
        );
    }
}