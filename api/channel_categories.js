// J.M.J.
import { neon } from '@neondatabase/serverless'
import { createClerkClient } from '@clerk/backend'

export const config = {
  runtime: 'edge',
}

export default async function handler(request) {
  const headers = {
    'Content-Type': 'application/json',
  }

  const url = new URL(request.url)
  const channel = url.searchParams.get('channel')

  try {
    const sql = neon(process.env.NEON_DATABASE_URL)

    if (!channel && request.method === 'GET') {
      // No channel specified, get all channel categoires
      const rows = await sql`
        SELECT name
        FROM categories
        ORDER BY name
      `
      const categories = rows.map((row) => row.name)
      return new Response(
        JSON.stringify({ categories }),
        { status: 200, headers }
      )
    } else if (!channel) {
      // Every other operation must have a channel. Throw an error
      return new Response(
        JSON.stringify({ error: 'Every method except GET requires a channel' }),
        { status: 405, headers }
      )
    }

    if (request.method === 'GET') {
      // Get categories for channel ${channel}
      const rows = await sql`
        SELECT cat.name
        FROM channel_categories cc
        JOIN categories cat ON cat.id = cc.category_id
        WHERE cc.yt_channel_id = ${channel}
        ORDER BY cat.name
      `
      const categories = rows.map((row) => row.name)
      return new Response(
        JSON.stringify({ categories }),
        { status: 200, headers }
      )
    }

    if (request.method === 'DELETE') {
      const category = url.searchParams.get('category')
      if (!category) {
        return new Response(
          JSON.stringify({ error: 'Missing required parameter: category' }),
          { status: 400, headers }
        )
      }

      const clerkClient = createClerkClient({
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY,
      })

      const { isAuthenticated } = await clerkClient.authenticateRequest(
        request,
        {
            authorizedParties: ['http://localhost:3000', 'https://whitelist.media'],
        }
      )

      if (!isAuthenticated) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers }
        )
      }

      await sql`
        DELETE FROM channel_categories
        WHERE yt_channel_id = ${channel}
          AND category_id = (
            SELECT id FROM categories WHERE name = ${category}
          )
      `

      return new Response(
        JSON.stringify({ ok: true }),
        { status: 200, headers }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers }
    )
  } catch (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Internal server error', message: error.message }),
        { status: 500, headers }
      )
  }
}
