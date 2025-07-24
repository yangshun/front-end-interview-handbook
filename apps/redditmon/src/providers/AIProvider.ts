import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';

import { getSystemPrompt, getUserPrompt } from '~/app/lib/prompt';
import { aiFilterPostSchema, aiResponseSchema } from '~/schema';
import type { AIFilterPost, AIResponse } from '~/types';

class AIProvider {
  private readonly model = google('gemini-2.0-flash-lite');

  constructor() {}

  async generateResponseTo({
    post,
    resources,
  }: {
    post: Readonly<{ content: string; title: string }>;
    resources: ReadonlyArray<{ description: string; url: string }>;
  }): Promise<AIResponse> {
    console.info('Generating response to post:', post.title);

    const systemPrompt = getSystemPrompt(resources);
    const userPrompt = getUserPrompt(post);

    const result = await generateObject({
      model: this.model,
      prompt: userPrompt,
      schema: aiResponseSchema,
      system: systemPrompt,
    });

    return result.object;
  }

  async filterPost({
    post,
    systemPrompt,
  }: Readonly<{
    post: Readonly<{ content: string; title: string }>;
    systemPrompt: string;
  }>): Promise<AIFilterPost> {
    const userPrompt = getUserPrompt(post);

    const result = await generateObject({
      model: this.model,
      prompt: userPrompt,
      schema: aiFilterPostSchema,
      system: systemPrompt,
    });

    return result.object;
  }
}

export default AIProvider;
