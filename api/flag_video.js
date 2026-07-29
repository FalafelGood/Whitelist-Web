// J.M.J.

/*
  IMPORTANT:

  This is a dangerous API function since it exposes POST.
  Vercel Firewall is responsible for rate limiting.
  If you modify the name of this thing, MAKE SURE YOU UPDATE THE FIREWALL RULES
*/

import { neon } from '@neondatabase/serverless'

const MAX_EMAIL_LEN = 64
const MAX_REPORT_LEN = 500

export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    )
  }

  try {
    const url = new URL(request.url);
    const yt_video_id = url.searchParams.get("yt_video_id");

    if (!yt_video_id) {
      return new Response(
        JSON.stringify({ error: 'YouTube video id is required' }),
        { status: 400, headers }
      )
    }

    const body = await request.json()
    const email = body.email?.trim() || null
    const report = body.report?.trim()

    if (!report) {
      return new Response(
        JSON.stringify({ error: 'Report is required' }),
        { status: 400, headers }
      )
    }

    const emailTooLong = email ? email.length > MAX_EMAIL_LEN : false
    const reportTooLong = report.length > MAX_REPORT_LEN

    if (emailTooLong || reportTooLong) {
      return new Response(
        JSON.stringify({
          error: `Email must not exceed ${MAX_EMAIL_LEN} characters and report must not exceed ${MAX_REPORT_LEN} characters`,
        }),
        { status: 403, headers }
      )
    }

    const sql = neon(process.env.NEON_DATABASE_URL)
    await sql`INSERT INTO flagged_videos (yt_video_id, report, email) VALUES (${yt_video_id}, ${report}, ${email})`

    return new Response(
      JSON.stringify({ success: true }),
      { status: 201, headers }
    )
  } catch (error) {
    console.error('Database error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: error.message }),
      { status: 500, headers }
    )
  }
}