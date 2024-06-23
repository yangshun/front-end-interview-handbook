import PlatformManager from '~/interfaces/implementations/PlatformManager';

export async function GET() {
  const clientId = process.env.REDDIT_CLIENT_ID as string;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET as string;
  const userAgent = process.env.REDDIT_USER_AGENT as string;
  const username = process.env.REDDIT_USERNAME as string;
  const password = process.env.REDDIT_PASSWORD as string;

  const platformManager = PlatformManager.getInstance();

  const redditPlatformParams = {
    clientId,
    clientSecret,
    password,
    userAgent,
    username,
  };

  const redditPlatform = platformManager.getPlatform(
    'Reddit',
    redditPlatformParams,
  );

  try {
    await redditPlatform.getRelevantPosts();

    return new Response('Posts fetched successfully!', {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);

    return new Response('error', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
