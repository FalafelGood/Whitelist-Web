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
    const videoId = url.searchParams.get('video_id');

    if (!videoId) {
        return new Response(
            JSON.stringify({ error: 'Missing required parameter: video_id' }),
            { status: 400, headers }
        )
    }

    try {
        const sql = neon(process.env.VITE_NEON_DATABASE_URL);
        const [packagedVideo] = await sql.transaction([
            sql`SELECT * FROM videos WHERE yt_video_id = ${videoId}`,
        ])
        // packagedName 
        const video = packagedVideo[0];
        return new Response(
            JSON.stringify({ video }),
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