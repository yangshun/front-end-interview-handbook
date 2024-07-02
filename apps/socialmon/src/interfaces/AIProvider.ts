import type { AIResponse, Post } from '~/types';

export type AIProvider = {
  generateResponseTo(post: Post): Promise<AIResponse>;
};
