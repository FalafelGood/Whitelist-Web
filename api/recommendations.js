// J.M.J.

/*
  IMPORTANT:

  This is a dangerous API function since it exposes POST.
  Vercel Firewall is responsible for rate limiting.
  If you modify the name of this thing, MAKE SURE YOU UPDATE THE FIREWALL RULES
*/

import { neon } from '@neondatabase/serverless'

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
    const body = await request.json()
    const email = body.email?.trim() || null
    const channel = body.channel?.trim()

    if (!channel) {
      return new Response(
        JSON.stringify({ error: 'Channel is required' }),
        { status: 400, headers }
      )
    }

    const sql = neon(process.env.NEON_DATABASE_URL)
    await sql`INSERT INTO recommendations (email, channel) VALUES (${email}, ${channel})`

    return new Response(
      JSON.stringify({ success: true }),
      { status: 201, headers }
    )
  } catch (error) {
    console.error('Database error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers }
    )
  }
}
