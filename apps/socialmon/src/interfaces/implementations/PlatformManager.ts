import RedditPlatform from './RedditPlatform';
import type { Platform } from '../Platform';
import keyword from '../../data/keyword.json' assert { type: 'json' };
import subreddit from '../../data/subreddit.json' assert { type: 'json' };

import type { AccountType } from '~/types';

type PlatformType = 'Reddit';

const platformMap = {
  Reddit: RedditPlatform,
};

class PlatformManager {
  private platformsToImplementation: Map<string, Platform>;
  private static instance: PlatformManager;

  private constructor() {
    this.platformsToImplementation = new Map<PlatformType, Platform>();
  }

  // Static method to get the single instance of PlatformManager
  public static getInstance(): PlatformManager {
    if (!PlatformManager.instance) {
      PlatformManager.instance = new PlatformManager();
    }

    return PlatformManager.instance;
  }

  private getImplementationKey(platform: PlatformType, account: AccountType) {
    return `${platform}-${account.username}-${account.password}-${account.clientId}-${account.clientSecret}`;
  }

  public getPlatform(
    platform: PlatformType,
    platformParams: AccountType,
  ): Platform {
    // Check if platform is a platform that is being managed
    if (!(platform in platformMap)) {
      throw new Error(`Platform ${platform} is not being managed`);
    }

    const implementationKey = this.getImplementationKey(
      platform,
      platformParams,
    );

    // Check if platform has already been initialized
    if (this.platformsToImplementation.has(implementationKey)) {
      return this.platformsToImplementation.get(implementationKey) as Platform;
    }

    // Initialize platform
    const platformImplementation = this.initializePlatform(
      platform,
      platformParams,
    );

    this.platformsToImplementation.set(
      implementationKey,
      platformImplementation,
    );

    return platformImplementation;
  }

  private initializePlatform(
    platform: PlatformType,
    platformParams: AccountType,
  ): Platform {
    // TODO: Later add switch case when there are more than 1 platform
    console.info(`${platform} is initializing...`);

    const { clientId, clientSecret, username, password } =
      platformParams;
    const subreddits = subreddit.items;
    const keywords = keyword.items;
    // Const subreddits = ['frontend', 'reactjs'];
    // const keywords = ['typescript', 'javascript'];
    const timeframeInHours = 1;

    const platformImplementation: Platform = new RedditPlatform(
      clientId,
      clientSecret,
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
