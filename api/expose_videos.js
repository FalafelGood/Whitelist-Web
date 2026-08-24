// J.M.J.
import { isAuthenticated } from "./_auth.js";
import { neon } from '@neondatabase/serverless'

export default {
  async fetch(request) {

    const headers = {
      'Content-Type': 'application/json',
    }
    
    if (request.method !== 'GET') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers }
      );
    };

    if (!(await isAuthenticated(request))) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers }
      )
    }

    try {
      const sql = neon(process.env.NEON_DATABASE_URL);
      const url = new URL(request.url);
      const cid = url.searchParams.get('cid');

      if (!cid) {
        return new Response(
          JSON.stringify({error: 'A channel id must be provided'}),
          { status: 500, headers }
        )
      }

      const updated = await sql`
        WITH to_update AS (
          SELECT yt_video_id
          FROM videos
          WHERE yt_channel_id = ${cid}
            AND video_status = 'unlisted'
          ORDER BY
            published_time DESC NULLS LAST,
            row_created_at DESC NULLS LAST,
            yt_video_id ASC
          LIMIT 50
        ),
        updated_videos AS (
          UPDATE videos v
          SET video_status = 'unmoderated'
          FROM to_update
          WHERE v.yt_video_id = to_update.yt_video_id
          RETURNING v.yt_video_id
        ),
        updated_channel AS (
          UPDATE channels
          SET videos_exposed_count = videos_exposed_count + (SELECT count(*) FROM updated_videos)
          WHERE yt_channel_id = ${cid}
          RETURNING yt_channel_id
        )
        SELECT yt_video_id FROM updated_videos
      `

      return new Response (
        JSON.stringify({ numVideosExposed: updated.length }),
        { status: 200, headers}
      )

    } catch (error) {
      return new Response (
        JSON.stringify({ error: 'Internal server error', message: error.message }),
        { status: 500, headers}
      )
    }
  }
}