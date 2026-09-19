// J.M.J.

/*
  IMPORTANT:

  This is a dangerous API function since it exposes POST.
  Vercel Firewall is responsible for rate limiting.
  If you modify the name of this thing, MAKE SURE YOU UPDATE THE FIREWALL RULES
*/

import { neon } from '@neondatabase/serverless'

// Anyone can POST here, so only these names are allowed to reach the table
const ALLOWED_NAMES = [
  'like_button',
  'subscribe_button', 
  'profile_button', 
  'google_signup', 
  'whitelist_signup'
]

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
    const url = new URL(request.url)
    const name = url.searchParams.get('name')

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers }
      )
    }

    if (!ALLOWED_NAMES.includes(name)) {
      return new Response(
        JSON.stringify({ error: 'Unknown name' }),
        { status: 403, headers }
      )
    }

    const sql = neon(process.env.NEON_DATABASE_URL)
    const [row] = await sql`
      INSERT INTO clicks (date, name, count)
      VALUES (CURRENT_DATE, ${name}, 1)
      ON CONFLICT (date, name) DO UPDATE SET count = clicks.count + 1
      RETURNING count
    `

    return new Response(
      JSON.stringify({ success: true, count: row.count }),
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
