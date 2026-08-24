// J.M.J.
// Helper function for authorization
import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
})

export async function isAuthenticated(request, options) {
  const { isAuthenticated } = await clerkClient.authenticateRequest(request, options)
  return isAuthenticated
}