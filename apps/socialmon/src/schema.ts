import { z } from 'zod';

export const postSchema = z.object({
  content: z.string(),
  foundAt: z.union([z.date(), z.string()]).nullable(),
  id: z.string(),
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
