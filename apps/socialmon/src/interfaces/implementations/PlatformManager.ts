import RedditPlatform from './RedditPlatform';
import type { Platform } from '../Platform';

class PlatformManager {
  private platforms: Array<string>;
  private platformsToImplementation: Map<string, Platform>;

  constructor(platforms: Array<string>) {
    this.platforms = platforms;
    this.platformsToImplementation = new Map<string, Platform>();
  }

  public async getPlatform(platform: string): Promise<Platform> {
    // Check if platform is a platform that is being managed
    if (!this.platforms.includes(platform)) {
      throw new Error(`Platform ${platform} is not being managed`);
    }

    // Check if platform has already been initialized
    if (this.platformsToImplementation.has(platform)) {
      return this.platformsToImplementation.get(platform) as Platform;
    }

    // Initialize platform
    const platformImplementation = await this.initializePlatform(platform);

    this.platformsToImplementation.set(platform, platformImplementation);

    return platformImplementation;
  }

  private async initializePlatform(platform: string): Promise<Platform> {
    const namespaceObject = await import(
      `../implementations/${platform}Platform`
    );

    console.info(namespaceObject.default);

    const clientId = process.env.REDDIT_CLIENT_ID as string;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET as string;
    const userAgent = process.env.REDDIT_USER_AGENT as string;
    const username = process.env.REDDIT_USERNAME as string;
    const password = process.env.REDDIT_PASSWORD as string;
    const subreddits = ['reactjs', 'javascript'];
    const keywords = ['typescript', 'javascript'];
    const timeframeInHours = 1;

    const platformImplementation: Platform = new RedditPlatform(
      clientId,
      clientSecret,
      userAgent,
      username,
      password,
      subreddits,
      keywords,
      timeframeInHours,
    );

    return platformImplementation;
  }
}

export default PlatformManager;
