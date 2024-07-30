'use server';

import type { Submission } from 'snoowrap';
import Snoowrap from 'snoowrap';

import keywords from '~/data/keyword.json' assert { type: 'json' };
import subreddits from '~/data/subreddit.json' assert { type: 'json' };

import type { RedditPost } from '.prisma/client';

export function initializeRedditClient(username?: string, password?: string) {
  return new Snoowrap({
    clientId: process.env.REDDIT_CLIENT_ID as string,
    clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
    password: password || (process.env.REDDIT_PASSWORD as string),
    userAgent: process.env.REDDIT_USER_AGENT as string,
    username: username || (process.env.REDDIT_USERNAME as string),
  });
}

function createRedditPost({
  matchedKeywords,
  post,
}: {
  matchedKeywords: Array<string>;
  post: Submission;
}): RedditPost {
  return {
    content: post.selftext_html ?? post.selftext,
    createdAt: new Date(),
    id: post.id,
    keywords: matchedKeywords,
    postedAt: new Date(post.created_utc * 1000), // In milliseconds
    replied: false,
    repliedAt: null,
    response: null,
    subreddit: post.subreddit_name_prefixed,
    title: post.title,
    url: post.url,
  };
}

export async function getPostsFromReddit() {
  const timeFrameInHour = 1;
  const currentTime = Date.now();
  const startTime = currentTime - timeFrameInHour * 3600000;

  const relevantSubmissions: Array<{
    matchedKeywords: Array<string>;
    post: Submission;
  }> = [];

  const snoowrap = initializeRedditClient();

  // Loop through each subreddit
  for (const subreddit of subreddits.items) {
    const subredditInstance = snoowrap.getSubreddit(subreddit);

    // Fetch new posts, defaults to 25
    // There's no way to get posts from a specific time onwards, so we fetch new posts and filter them manually
    // Another way is to use the after parameter, but that means we keep track of the last post we've seen:
    // const posts = await subredditInstance.getNew({after: 't3_1iwx6i'});
    const posts = await subredditInstance.getNew();

    const keywordRegex = new RegExp(keywords.items.join('|'), 'gi');

    // Filter posts based on keywords and timeframe
    const filteredPosts = posts
      .filter((post) => {
        const createdAtInMillisecond = post.created_utc * 1000;

        return (
          (keywordRegex.test(post.title) || keywordRegex.test(post.selftext)) &&
          createdAtInMillisecond >= startTime
        );
      })
      .map((post) => {
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

        return {
          matchedKeywords: uniqueMatchedKeywords,
          post,
        };
      });

    relevantSubmissions.push(...filteredPosts);
  }

  return relevantSubmissions.map((submission) => createRedditPost(submission));
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
  const snoowrap = initializeRedditClient(username, password);

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
