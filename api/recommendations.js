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
    const name = body.name?.trim() || null
    const channel = body.channel?.trim()

    if (!channel) {
      return new Response(
        JSON.stringify({ error: 'Channel is required' }),
        { status: 400, headers }
      )
    }

    const sql = neon(process.env.VITE_NEON_DATABASE_URL)
    await sql`INSERT INTO recommendations (name, channel) VALUES (${name}, ${channel})`

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
