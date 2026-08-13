import { neon } from '@neondatabase/serverless'
import { createClerkClient } from '@clerk/backend'

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

    const sql = neon(process.env.NEON_DATABASE_URL);
    const url = new URL(request.url);
    const cid = url.searchParams.get('cid');
    

    // If a channel id is specified, return all info about that channel
    if (cid) {
        console.log("inside")
        try {
            const channel =  await sql`
                SELECT * FROM channels
                where yt_channel_id = ${cid}
            `
            return new Response(
                JSON.stringify({ channel }),
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

    const category = url.searchParams.get('category');
    const seed = url.searchParams.get('seed') || crypto.randomUUID();
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
    const limit = parseInt(url.searchParams.get('limit') || '12', 10);
    const offset = (page - 1) * limit;

    try {

        let channels = [];

        /*
            Note: Semicolons aren't required for sql tagged templates.
            In some cases. a semicolon can actually break the Neon client. Don't know why.
        */
        if (!category || category === "all") {
            /*
                Query overview:

                1. Load the channels to be paginated into `loaded_channels`
                2. Put the categories of each of the loaded channels into `cats_of_loaded_channels`
                3. LEFT JOIN `loaded_channels` with `cats_of_loaded_channels`.
                
                If a channel has no categories, LEFT JOIN ensures the channel is still present in the JOINed table. COALESCE returns the empty array if `cats_of_loaded_channels` is NULL. 
                
                This ensures that channels with no categories are still fetched by this query. (In theory, every channel should have a category, but I wanted to make sure this edge case got handled)

            */
            channels = await sql`
                WITH loaded_channels AS (
                    SELECT c.*
                    FROM channels c
                    WHERE c.human_moderation_status = 'approved'
                    ORDER BY md5(c.yt_channel_id::text || ${seed})
                    LIMIT ${limit} OFFSET ${offset}
                ),
                cats_of_loaded_channels AS (
                    SELECT
                        cc.yt_channel_id,
                        array_agg(cat.name) AS categories
                    FROM channel_categories cc
                    JOIN categories cat ON cat.id = cc.category_id
                    WHERE cc.yt_channel_id IN (
                        SELECT yt_channel_id FROM loaded_channels
                    )
                    GROUP BY cc.yt_channel_id
                )
                SELECT
                    lc.*,
                    COALESCE(colc.categories, '{}') AS categories
                FROM loaded_channels lc
                LEFT JOIN cats_of_loaded_channels colc
                    ON colc.yt_channel_id = lc.yt_channel_id
            `
        } else if (category === 'unmoderated') {
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

            // channels = await sql`
            //     SELECT * FROM channels 
            //     WHERE human_moderation_status = 'unmoderated'
            //     LIMIT ${limit} OFFSET ${offset}
            // `
            channels = await sql`
                WITH loaded_channels AS (
                    SELECT c.* FROM channels c
                    WHERE c.human_moderation_status = 'unmoderated'
                    LIMIT ${limit} OFFSET ${offset}
                ),
                cats_of_loaded_channels AS (
                    SELECT
                        cc.yt_channel_id,
                        array_agg(cat.name) AS categories
                    FROM channel_categories cc
                    JOIN categories cat ON cat.id = cc.category_id
                    WHERE cc.yt_channel_id IN (
                        SELECT yt_channel_id FROM loaded_channels
                    )
                    GROUP BY cc.yt_channel_id
                )
                SELECT lc.*, colc.categories
                FROM loaded_channels lc
                JOIN cats_of_loaded_channels colc ON colc.yt_channel_id = lc.yt_channel_id
            `
        } else { 
            /*
                Query overview:

                Similar to the previous one:

                1. Load the channels to be paginated into `loaded_channels` (only this time, get the channels where `cat.name = ${category}`)
                2. Put the categories of the loaded channels into `cats_of_loaded_channels`
                3. JOIN `loaded_channels` with `cats_of_loaded_channels`.

                No LEFT JOIN is needed for this query since every channel has at least one category.
            */
            channels = await sql`
                WITH loaded_channels AS (
                    SELECT c.* FROM channels c
                    JOIN channel_categories cc ON cc.yt_channel_id = c.yt_channel_id
                    JOIN categories cat on cc.category_id = cat.id
                    WHERE cat.name = ${category}
                        AND c.human_moderation_status = 'approved'
                    ORDER BY md5(c.yt_channel_id::text || ${seed}) 
                    LIMIT ${limit} OFFSET ${offset}
                ),
                cats_of_loaded_channels AS (
                    SELECT
                        cc.yt_channel_id,
                        array_agg(cat.name) AS categories
                    FROM channel_categories cc
                    JOIN categories cat ON cat.id = cc.category_id
                    WHERE cc.yt_channel_id IN (
                        SELECT yt_channel_id FROM loaded_channels
                    )
                    GROUP BY cc.yt_channel_id
                )
                SELECT lc.*, colc.categories
                FROM loaded_channels lc
                JOIN cats_of_loaded_channels colc ON colc.yt_channel_id = lc.yt_channel_id
            `
        }

        return new Response(
            JSON.stringify({ seed, channels }),
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