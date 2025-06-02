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

export const aiFilterPostSchema = z.object({
  relevant: z
    .boolean()
    .describe('Context of the title and content is relevant or not'),
});

export const userSchema = z.object({
  password: z.string(),
  username: z.string(),
});

const projectNameSchema = z
  .string()
  .trim()
  .min(3, {
    message: `Project name must contain at least 3 character(s).`,
  })
  .max(40, {
    message: `Project name must contain at most 40 character(s).`,
  });

const projectKeywordsSchema = z
  .array(z.string())
  .min(1, {
    message: 'There must be at least one keyword',
  })
  .refine(
    (keywords) => {
      const uniqueSet = new Set(keywords);

      return uniqueSet.size === keywords.length;
    },
    {
      message: 'Add unique keywords',
    },
  );

const projectSubredditsSchema = z
  .array(z.string())
  .min(1, {
    message: 'There must be at least one subreddits',
  })
  .refine(
    (subreddits) => {
      const uniqueSet = new Set(subreddits);

      return uniqueSet.size === subreddits.length;
    },
    {
      message: 'Add unique subreddits',
    },
  );

const projectProductsToAdvertiseItemSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'Description must contain at least 10 character(s).',
    })
    .max(160, {
      message: `Description must contain at most 160 character(s).`,
    })
    .trim(),
  url: z
    .string()
    .url({ message: 'Invalid URL format.' })
    .min(1, { message: 'URL is required.' }),
});

const projectProductsToAdvertiseSchema = z
  .array(projectProductsToAdvertiseItemSchema)
  .min(1, {
    message: 'There must be at least 1 product',
  });

const projectPostFilteringPromptSchema = z.string().trim().min(10, {
  message: `Prompt must contain at least 10 character(s).`,
});

const projectSubredditKeywordGroupSchema = z.object({
  id: z.string(),
  keywords: z
    .array(z.string())
    .min(1, { message: 'There must be at least one keyword in the group' })
    .refine(
      (keywords) => {
        const uniqueSet = new Set(keywords);

        return uniqueSet.size === keywords.length;
      },
      { message: 'Add unique keywords in the group' },
    ),
  subreddits: z
    .array(z.string())
    .min(1, { message: 'There must be at least one subreddit in the group' })
    .refine(
      (subreddits) => {
        const uniqueSet = new Set(subreddits);

        return uniqueSet.size === subreddits.length;
      },
      { message: 'Add unique subreddits in the group' },
    ),
});

const projectSubredditKeywordsSchema = z
  .array(projectSubredditKeywordGroupSchema)
  .min(1, { message: 'There must be at least one keyword/subreddit group' });

export const projectSchema = z.object({
  keywords: projectKeywordsSchema,
  name: projectNameSchema,
  postFilteringPrompt: projectPostFilteringPromptSchema,
  productsToAdvertise: projectProductsToAdvertiseSchema,
  subredditKeywords: projectSubredditKeywordsSchema,
  subreddits: projectSubredditsSchema,
});
