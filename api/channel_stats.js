// J.M.J.
import { neon } from "@neondatabase/serverless";

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
    }

    const sql = neon(process.env.NEON_DATABASE_URL);
    const url = new URL(request.url);
    const cid = url.searchParams.get('cid');

    if (!cid) {
      return new Response(
        JSON.stringify({ error: "Channel id is required"}),
        { status: 400 }
      )
    }

    try {
      const [rawRatingStats, rawVideoStats] =  await sql.transaction(
        [
          sql`
            SELECT osv_rating, COUNT(*) FROM videos
            WHERE yt_channel_id = ${cid}
            GROUP BY osv_rating
          `,
          sql`
            SELECT 
              video_count, 
              video_review_count, 
              offensive_videos_count, 
              low_quality_videos_count, 
              videos_exposed_count 
            FROM channels
            WHERE yt_channel_id = ${cid}
          `
        ]
      )

      const videoStats = rawVideoStats[0];

      /*
        Raw video stats is an array with the following shape:
        [
          { osv_rating: null, count: '754' },
          { osv_rating: 'A-I', count: '59' }
        ]

        Next step is to convert this array into a dict with undefined rating fields
        set to zero
      */

      const ratingStats = {};
      for ( let entry of rawRatingStats ) {
        if (entry.osv_rating === null) {
          ratingStats.unrated = Number(entry.count);
          continue;
        }
        ratingStats[entry.osv_rating] = Number(entry.count)
      }
      
      // Add zeros to undefined fields
      const channelRatings = ['A-I', 'A-II', 'A-III', 'L', 'O'];
      for (let rating of channelRatings ) {
        if (!ratingStats[rating]) {
          ratingStats[rating] = 0;
        }
      }
      
      return new Response(
        JSON.stringify({ ratingStats, videoStats }),
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
}