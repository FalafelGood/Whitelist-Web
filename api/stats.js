// J.M.J.
import { neon } from '@neondatabase/serverless'

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

  try {
    const sql = neon(process.env.NEON_DATABASE_URL);
    const [videoCountRows, channelCountRows] = await sql.transaction([
      sql`SELECT COUNT(*)::int AS total FROM videos WHERE video_status = 'approved'`,
      sql`SELECT COUNT(*)::int AS total FROM channels WHERE human_moderation_status = 'approved'`,
    ]);
    return new Response(
      JSON.stringify({
        numVideos: videoCountRows[0].total,
        numChannels: channelCountRows[0].total,
      }),
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