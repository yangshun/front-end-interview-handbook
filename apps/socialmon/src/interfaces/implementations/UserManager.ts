import RedditPlatform from './RedditPlatform';
import RedditUser from './RedditUser';
import type { PlatformUser } from '../PlatformUser';

type PlatformType = 'Reddit';

const platformMap = {
  Reddit: RedditPlatform,
};

class UserManager {
  private usersToImplementation: Map<PlatformType, PlatformUser>;
  private static instance: UserManager;

  private constructor() {
    this.usersToImplementation = new Map<PlatformType, PlatformUser>();
  }

  // Static method to get the single instance of PlatformManager
  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }

    return UserManager.instance;
  }

  public getPlatformUserInstance(platform: PlatformType): PlatformUser {
    // Check if platform is a platform that is being managed
    if (!(platform in platformMap)) {
      throw new Error(`Platform ${platform} is not being managed`);
    }

    // Check if platform has already been initialized
    if (this.usersToImplementation.has(platform)) {
      return this.usersToImplementation.get(platform) as PlatformUser;
    }

    // Initialize user
    const userImplementation = this.initializeUser(platform);

    this.usersToImplementation.set(platform, userImplementation);

    return userImplementation;
  }

  private initializeUser(platform: PlatformType): PlatformUser {
    // TODO: Later add switch case when there are more than 1 platform
    console.info(`${platform}'s Account is initializing...`);

    const userImplementation: PlatformUser = new RedditUser();

    return userImplementation;
  }
}

export default UserManager;
