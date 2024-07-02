import type { z } from 'zod';

import type { aiResponseSchema } from './schema';

import type { RedditPost } from '@prisma/client';

export type Post = RedditPost;

export type PostTab = 'all' | 'replied' | 'unreplied';

export type User = Readonly<{
  email?: string | null;
  image?: string | null;
  name?: string | null;
}>;

export type AIResponse = z.infer<typeof aiResponseSchema>;
