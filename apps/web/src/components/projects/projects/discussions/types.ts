import type { User } from '@supabase/supabase-js';

export type Post = {
  author: User;
  content: string;
  id: string;
  isQuestion: boolean;
  likeCount: number;
  replyCount: number;
};
