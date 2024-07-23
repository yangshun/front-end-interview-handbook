import type { z } from 'zod';

import type { userSchema } from '~/schema';

import type { SocialUser } from '~/types';

export type PlatformUser = {
  addPlatformUser(user: z.input<typeof userSchema>): void;
  deletePlatformUser(username: string): void;
  getPlatformUser(username: string): Promise<SocialUser | null>;
  getPlatformUsers(): Promise<Array<SocialUser>>;
};
