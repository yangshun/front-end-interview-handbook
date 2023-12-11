import RedditPlatform from '../../../interfaces/implementations/RedditPlatform';
import { type Platform } from '../../../interfaces/Platform';

export async function GET() {
    const clientId = process.env.REDDIT_CLIENT_ID as string;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET as string;
    const userAgent = process.env.REDDIT_USER_AGENT as string;
    const username = process.env.REDDIT_USERNAME as string;
    const password = process.env.REDDIT_PASSWORD as string;
    const subreddits = ['reactjs', 'javascript'];
    const keywords = ['typescript', 'javascript'];
    const timeframeInHours = 1;

    const platform: Platform = new RedditPlatform(clientId, clientSecret, userAgent, username,
        password, subreddits, keywords, timeframeInHours);

    try {
        const posts = await platform.getRelevantPosts();

        return new Response(JSON.stringify(posts), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching posts:', error);

        return new Response('error', {
            status: 500,
            statusText: 'Internal Server Error'
        });
    }
}

export async function POST(request: Request) {
    const clientId = process.env.REDDIT_CLIENT_ID as string;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET as string;
    const userAgent = process.env.REDDIT_USER_AGENT as string;
    const username = process.env.REDDIT_USERNAME as string;
    const password = process.env.REDDIT_PASSWORD as string;
    const subreddits = ['reactjs', 'javascript'];
    const keywords = ['typescript', 'javascript'];
    const timeframeInHours = 1;

    const platform: Platform = new RedditPlatform(clientId, clientSecret, userAgent, username,
        password, subreddits, keywords, timeframeInHours);

    const body = await request.json();

    try {
        const success = await platform.replyToPost({
            content: body.content,
            foundAt: body.foundAt,
            id: body.id,
            postedAt: body.postedAt,
            replied: body.replied,
            repliedAt: body.repliedAt,
            response: body.response,
            title: body.title,
            url: body.url,
        });

        console.info('Sent reply to post: ', success);

        return new Response(JSON.stringify(success), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error updating post:', error);

        return new Response('error', {
            status: 500,
            statusText: 'Internal Server Error'
        });
    }
}
