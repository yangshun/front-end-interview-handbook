import RedditAccount from './RedditAccount';
import RedditPlatform from './RedditPlatform';
import type { Account } from '../Account';

type PlatformType = 'Reddit';

const platformMap = {
  Reddit: RedditPlatform,
};

class AccountManager {
  private accountsToImplementation: Map<PlatformType, Account>;
  private static instance: AccountManager;

  private constructor() {
    this.accountsToImplementation = new Map<PlatformType, Account>();
  }

  // Static method to get the single instance of PlatformManager
  public static getInstance(): AccountManager {
    if (!AccountManager.instance) {
      AccountManager.instance = new AccountManager();
    }

    return AccountManager.instance;
  }

  public getAccountInstance(platform: PlatformType): Account {
    // Check if platform is a platform that is being managed
    if (!(platform in platformMap)) {
      throw new Error(`Platform ${platform} is not being managed`);
    }

    // Check if platform has already been initialized
    if (this.accountsToImplementation.has(platform)) {
      return this.accountsToImplementation.get(platform) as Account;
    }

    // Initialize platform
    const platformImplementation = this.initializePlatform(platform);

    this.accountsToImplementation.set(platform, platformImplementation);

    return platformImplementation;
  }

  private initializePlatform(platform: PlatformType): Account {
    // TODO: Later add switch case when there are more than 1 platform
    console.info(`${platform}'s Account is initializing...`);

    const accountImplementation: Account = new RedditAccount();

    return accountImplementation;
  }
}

export default AccountManager;
