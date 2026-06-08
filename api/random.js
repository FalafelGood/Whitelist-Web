// J.M.J.
// API for random whitelist videos:
const DEFAULT_NUM_VIDEOS = 5

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
    const seed = url.searchParams.get('seed') || crypto.randomUUID();

    const numVideosParam = url.searchParams.get('numVideos');
    const parsedNumVideos = parseInt(numVideosParam ?? '', 10);
    const numVideos = numVideosParam !== null && !Number.isNaN(parsedNumVideos)
        ? parsedNumVideos
        : DEFAULT_NUM_VIDEOS;


    try {
        const sql = neon(process.env.VITE_NEON_DATABASE_URL);
        const randomVideos = await sql`
        SELECT * FROM videos
            WHERE video_status = 'approved' 
            ORDER BY md5(yt_channel_id::text || ${seed}) LIMIT ${numVideos};
        `
        return new Response(
            JSON.stringify({ randomVideos }),
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