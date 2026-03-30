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
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = parseInt(url.searchParams.get('limit') || '12', 10);
    const offset = (page - 1) * limit;

    if (!channel) {
        return new Response(
            JSON.stringify({ error: 'Missing required parameter: channel' }),
            { status: 400, headers }
        )
    }

    try {
        const sql = neon(process.env.VITE_NEON_DATABASE_URL);
        const [packagedName, videos, packagedNumVideos] = await sql.transaction([
            sql`SELECT name FROM channels WHERE yt_channel_id = ${channel}`,
            sql`SELECT * FROM videos WHERE yt_channel_id = ${channel} AND osv_rating != 'O' ORDER BY published_time DESC LIMIT ${limit} OFFSET ${offset}`,
            sql`SELECT COUNT(*)::int AS total FROM videos WHERE yt_channel_id = ${channel} AND osv_rating != 'O'`
        ])
        // packagedName 
        const name = packagedName[0].name;
        const numVideos = packagedNumVideos[0].total;
        return new Response(
            JSON.stringify({ name, numVideos, videos }),
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