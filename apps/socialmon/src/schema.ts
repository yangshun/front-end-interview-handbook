import { z } from 'zod';

export const postSchema = z.object({
  content: z.string(),
  createdAt: z.union([z.date(), z.string()]).nullable(),
  id: z.string(),
  keywords: z.string().array(),
  postedAt: z.union([z.date(), z.string()]).nullable(),
  replied: z.boolean(),
  repliedAt: z.union([z.date(), z.string()]).nullable(),
  response: z.string().nullable(),
  title: z.string(),
  url: z.string(),
});

export const aiResponseSchema = z.object({
  promotion: z
    .boolean()
    .describe('Promotion are included in the response or not'),
  response: z.string().describe('Response to title and content'),
});

export const accountSchema = z.object({
  clientId: z.string(),
  clientSecret: z.string(),
  password: z.string(),
  username: z.string(),
});
