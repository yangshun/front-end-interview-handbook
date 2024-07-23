import { z } from 'zod';

export const postSchema = z.object({
  content: z.string(),
  createdAt: z.date(),
  id: z.string(),
  keywords: z.string().array(),
  postedAt: z.date(),
  replied: z.boolean(),
  repliedAt: z.date().nullable(),
  response: z.string().nullable(),
  subreddit: z.string(),
  title: z.string(),
  url: z.string(),
});

export const aiResponseSchema = z.object({
  promotion: z
    .boolean()
    .describe('Promotion are included in the response or not'),
  response: z.string().describe('Response to title and content'),
});

export const userSchema = z.object({
  password: z.string(),
  username: z.string(),
});
