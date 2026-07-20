import { createClerkClient } from '@clerk/backend';

// What are my options for runtime? Why use edge?
export const config = { runtime: 'edge' }

/* 
clerkClient is a wrapper around the BackendAPI that makes it easier to interact with the API for JavaScript environments. You can, for example, use the users.getUserList() method instead of manually making a fetch request to the https://api.clerk.com/v1/users endpoint.
*/

export default async function handler(request) {
  
  const clerkClient = createClerkClient({ 
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
  });

  // toAuth is a function that returns the Auth object -- This contains important info like the current user's session ID, user ID, etc.
  const { isAuthenticated, toAuth } = await clerkClient.authenticateRequest(
    request,
    {
      authorizedParties: ['http://localhost:3000', 'https://whitelist.media']
    }
  )

  if (!isAuthenticated) {
    return new Response(JSON.stringify({ error: 'Unauthorized'}), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { userId } = toAuth()
  // do the protected work (e.g. insert channel)
  return new Response(JSON.stringify({ ok: true, userId }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

