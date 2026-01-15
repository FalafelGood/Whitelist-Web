import { neon } from '@neondatabase/serverless'

// Tell Vercel to use the edge runtime. (I can choose from a few options like nodejs I think)
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
        // Initialize Neon client with environment variable containing handshake
        const sql = neon(process.env.VITE_NEON_DATABASE_URL);
        const channels = await sql`SELECT * FROM channels`;
        return new Response(
            JSON.stringify({ channels }),
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