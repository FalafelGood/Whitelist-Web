// J.M.J

import { isAuthenticated } from "./_auth.js";
import { neon } from "@neondatabase/serverless"

export default {
  async fetch(request) {

    const headers = {
      'Content-Type': 'application/json',
    }


    if (request.method !== 'POST') {
      return new Response(
        JSON.stringfy({ error: "Method not allowed" }),
        { status: 405, headers }
      )
    }

    if (!(await isAuthenticated(request))) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers }
      )
    }

    try {
      const sql = neon(process.env.NEON_DATABASE_URL);
      const url = new URL(request.url);
      const cid = url.searchParams.get('cid');
      const status = url.searchParams.get('status');

      if (
        status !== 'approved' && 
        status !== 'unmoderated' &&
        status !== 'banned'
      ) {
        return new Response(
          JSON.stringify({ error: 'invalid status submitted' }),
          { status: 500, headers }
        )
      }

      if (!cid) {
        return new Response(
          JSON.stringify({error: 'A channel id must be provided'}),
          { status: 500, headers }
        )
      }

      await sql`
        UPDATE channels
        SET human_moderation_status = ${status}
        WHERE yt_channel_id = ${cid}
      `

      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers }
      )

    } catch (error) {

      console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Internal server error', message: error.message }),
          { status: 500, headers }
      )
    }
  }
}