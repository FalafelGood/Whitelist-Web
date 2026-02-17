import { neon } from '@neondatabase/serverless'

export const config = {
    runtime: 'edge',
}

// Every js module can have one 'default' export (i.e. the main thing it's exporting)
export default async function handler(request) {

    const headers = {
        'Content-Type' : 'application/json',
    }

    if (request.method !== 'GET') {
        return new Response(
            JSON.stringify({ error: 'Method not allowed' }),
            { status: 405, headers }
        )
    }

    const url = new URL(request.url);
    const channel = url.searchParams.get('channel');

    if (!channel) {
        return new Response(
            JSON.stringify({ error: 'Missing required parameter: channel' }),
            { status: 400, headers }
        )
    }

    try {
        const sql = neon(process.env.VITE_NEON_DATABASE_URL);
        const [packagedName, videos] = await sql.transaction([
            sql`SELECT name FROM channels WHERE yt_channel_id = ${channel}`,
            sql`SELECT * FROM videos WHERE yt_channel_id = ${channel}`
        ])
        // packagedName 
        const name = packagedName[0].name;
        return new Response(
            JSON.stringify({ name, videos }),
            { status: 200, headers}
        );
    } catch (error) {
        console.error('Database error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error', message: error.message }),
            { status: 500, headers }
        );
    }
}