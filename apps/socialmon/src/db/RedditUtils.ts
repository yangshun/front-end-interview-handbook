'use server';

import fetch from 'node-fetch';
import type { Submission } from 'snoowrap';
import Snoowrap from 'snoowrap';

import type { RedditPost } from '~/prisma/client';
import AIProvider from '~/providers/AIProvider';

export async function initializeRedditClient(
  username?: string,
  password?: string,
) {
  return new Snoowrap({
    clientId: process.env.REDDIT_CLIENT_ID as string,
    clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
    password: password || (process.env.REDDIT_PASSWORD as string),
    userAgent: process.env.REDDIT_USER_AGENT as string,
    username: username || (process.env.REDDIT_USERNAME as string),
  });
}

export async function createRedditPost({
  matchedKeywords,
  post,
}: {
  matchedKeywords: Array<string>;
  post: Submission;
}): Promise<
  Omit<
    RedditPost,
    'createdAt' | 'id' | 'projectId' | 'relevancy' | 'response' | 'updatedAt'
  >
> {
  return {
    commentsCount: post.num_comments,
    content: post.selftext,
    keywords: matchedKeywords,
    permalink: post.permalink,
    postId: post.id,
    postedAt: new Date(post.created_utc * 1000),
    statsUpdatedAt: new Date(),
    subreddit: post.subreddit_name_prefixed,
    title: post.title,
    upvoteCount: post.ups,
  };
}

export async function getPostsFromReddit({
  keywords,
  subreddits,
  postFilteringPrompt,
}: {
  keywords: ReadonlyArray<string>;
  postFilteringPrompt: string;
  subreddits: ReadonlyArray<string>;
}) {
  const relevantSubmissions: Array<{
    matchedKeywords: Array<string>;
    post: Submission;
  }> = [];

  const snoowrap = await initializeRedditClient();
  const aiProvider = new AIProvider();

  // Loop through each subreddit
  for (const subreddit of subreddits) {
    const subredditInstance = snoowrap.getSubreddit(subreddit);

    // Fetch new posts, defaults to 25
    // There's no way to get posts from a specific time onwards, so we fetch new posts and filter them manually
    // Another way is to use the after parameter, but that means we keep track of the last post we've seen:
    // const posts = await subredditInstance.getNew({after: 't3_1iwx6i'});
    const posts = await subredditInstance.getNew();

    const keywordRegex = new RegExp(keywords.join('|'), 'gi');

    const filteredPosts = [];

    for (const post of posts) {
      // First pass filtering with keywords
      const firstFilterPass =
        keywordRegex.test(post.title) || keywordRegex.test(post.selftext);

      // Second pass filtering with LLM
      if (firstFilterPass) {
        const result = await aiProvider.filterPost({
          post: {
            content: post.selftext,
            title: post.title,
          },
          systemPrompt: postFilteringPrompt,
        });

        if (result.relevant) {
          filteredPosts.push(post);
        }
      }
    }

    filteredPosts.forEach((post) => {
      const matchedKeywords = [];

      // Check for matches in the title and selftext
      if (keywordRegex.test(post.title)) {
        const match = post.title.match(keywordRegex);

        matchedKeywords.push(...(match ? match : []));
      }
      if (keywordRegex.test(post.selftext)) {
        const match = post.selftext.match(keywordRegex);

        matchedKeywords.push(...(match ? match : []));
      }

      // Remove duplicates
      const uniqueMatchedKeywords = Array.from(new Set(matchedKeywords));

      relevantSubmissions.push({
        matchedKeywords: uniqueMatchedKeywords,
        post,
      });
    });
  }

  return relevantSubmissions.map(
    async (submission) => await createRedditPost(submission),
  );
}

export async function replyToRedditPost({
  user,
  postId,
  response,
}: {
  postId: string;
  response: string;
  user: Readonly<{ password: string; username: string }>;
}) {
  const { username, password } = user;
  const snoowrap = await initializeRedditClient(username, password);

  // TODO(socialmon): Figure out how to add type here.
  let finalResponse: any = null;

  const replySuccess = await snoowrap
    .getSubmission(postId)
    .reply(response)
    .then(
      (result) => {
        finalResponse = result;

        return true;
      },
      (error) => {
        console.error(error);

        return false;
      },
    );

  return { response: finalResponse, success: replySuccess };
}

// Function to get Reddit access token
export async function getAccessToken() {
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Client ID or Secret is missing');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });

  if (!response.ok) {
    const errorBody = await response.text();

    console.error('Access Token Error Response:', errorBody);
    throw new Error(
      `Failed to get access token: ${response.status} - ${errorBody}`,
    );
  }

  const data = (await response.json()) as Readonly<{
    access_token: string;
  }>;

  return data.access_token;
}
