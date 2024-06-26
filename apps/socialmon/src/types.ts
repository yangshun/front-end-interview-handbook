import type { RedditPost } from '@prisma/client';

export type Post = RedditPost;

export type PostTab = 'all' | 'replied' | 'unreplied';
