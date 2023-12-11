import RedditPlatform from '../../../../interfaces/implementations/RedditPlatform';
import { type Platform } from '../../../../interfaces/Platform';

export async function GET() {
  const clientId = process.env.REDDIT_CLIENT_ID as string;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET as string;
  const userAgent = process.env.REDDIT_USER_AGENT as string;
  const username = process.env.REDDIT_USERNAME as string;
  const password = process.env.REDDIT_PASSWORD as string;
  const subreddits = ['reactjs', 'javascript'];
  const keywords = ['typescript', 'javascript'];
  const timeframeInHours = 1;

  const platform: Platform = new RedditPlatform(
    clientId,
    clientSecret,
    userAgent,
    username,
    password,
    subreddits,
    keywords,
    timeframeInHours,
  );

  try {
    const repliedPosts = await platform.getRepliedPosts();

    return new Response(JSON.stringify(repliedPosts), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching replied posts:', error);

    return new Response('error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
