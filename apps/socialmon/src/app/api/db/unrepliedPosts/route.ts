import RedditPlatform from '../../../../interfaces/implementations/RedditPlatform';
import { type Platform } from '../../../../interfaces/Platform';

// Alternate design considered: make like a [postStatus].ts and then use postStatus to determine which method to call
// Going with this first because easier to implement and also because not sure if the above might cause issues with other API methods
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
    const unrepliedPosts = await platform.getUnrepliedPosts();

    return new Response(JSON.stringify(unrepliedPosts), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching unreplied posts:', error);

    return new Response('error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
