// J.M.J.
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
        const sql = neon(process.env.NEON_DATABASE_URL);
        const [packagedData] = await sql.transaction([
            sql`
            SELECT
                v.name,
                v.yt_video_id,
                v.published_time,
                v.osv_rating,
                v.summary_text,
                v.review_text,
                v.reviewed_by,
                c.name AS channel_name,
                c.yt_channel_id,
                c.pfp_url
            FROM videos v
            JOIN channels c ON c.yt_channel_id = v.yt_channel_id
            WHERE v.yt_video_id = ${videoId}
            `
        ])

        const data = packagedData[0];

        const videoData = {
            name: data.name,
            yt_video_id: data.yt_video_id,
            published_time: data.published_time,
            osv_rating: data.osv_rating,
            review_text: data.review_text,
            summary_text: data.summary_text,
            reviewed_by: data.reviewed_by
        }

        const channelData = {
            name: data.channel_name,
            yt_channel_id: data.yt_channel_id,
            pfp_url: data.pfp_url,
        }

        return new Response(
            JSON.stringify({ videoData, channelData }),
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