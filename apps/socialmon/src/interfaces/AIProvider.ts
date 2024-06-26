import type { Post } from '~/types';

export type AIProvider = {
  generateResponseTo(
    post: Post,
  ): Promise<{ promotion: boolean; response: string }>;
};
