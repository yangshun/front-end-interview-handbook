import type { Submission } from 'snoowrap';
import Snoowrap from 'snoowrap';

import prisma from '~/server/prisma';

import type { Platform } from '../Platform';

import type { PostTab } from '~/types';

import type { RedditPost } from '.prisma/client';

class RedditPlatform implements Platform {
  private snooWrap: Snoowrap;
  private subreddits: Array<string>;
  private keywords: Array<string>;
  private timeframeInHours: number;

  constructor(
    clientId: string,
    clientSecret: string,
    username: string,
    password: string,
    subreddits: Array<string>,
    keywords: Array<string>,
    timeframeInHours: number,
  ) {
    this.snooWrap = new Snoowrap({
      clientId,
      clientSecret,
      password,
      userAgent: process.env.REDDIT_USER_AGENT as string,
      username,
    });
    this.subreddits = subreddits;
    this.keywords = keywords;
    this.timeframeInHours = timeframeInHours;
  }

  async updateResponse({
    id,
    response,
    repliedAt,
    replied,
  }: {
    id: string;
    replied: boolean;
    repliedAt: Date | null;
    response: string;
  }): Promise<boolean> {
    // Update the post in the database
    const success = await prisma.redditPost
      .update({
        data: {
          replied,
          repliedAt,
          response,
        },
        where: {
          id,
        },
      })
      .then(() => {
        console.info('Successfully updated post in database');

        return true;
      })
      .catch((error) => {
        console.error(error);

        return false;
      });

    return success;
  }

  private createRedditPost({
    keywords,
    post,
  }: {
    keywords: Array<string>;
    post: Submission;
  }): RedditPost {
    return {
      content: post.selftext_html ?? post.selftext,
      createdAt: new Date(),
      id: post.id,
      keywords,
      postedAt: new Date(post.created_utc * 1000),
      // In milliseconds
      replied: false,
      repliedAt: null,
      response: null,
      subreddit: post.subreddit_name_prefixed,
      title: post.title,
      url: post.url,
    };
  }

  private async insertPostsToDatabase(
    posts: Array<RedditPost>,
  ): Promise<boolean> {
    // If post exists in database, just skip over it?
    const result = await prisma.redditPost
      .createMany({
        data: posts,
        skipDuplicates: true,
      })
      .then(() => {
        console.info('Successfully inserted posts to database');

        return true;
      })
      .catch((error) => {
        console.error(error);

        return false;
      });

    return result;
  }

  async getRelevantPosts(): Promise<boolean> {
    const currentTime = Date.now();
    const startTime = currentTime - this.timeframeInHours * 3600000;

    const relevantSubmissions: Array<{
      keywords: Array<string>;
      post: Submission;
    }> = [];

    // Loop through each subreddit
    for (const subreddit of this.subreddits) {
      const subredditInstance = this.snooWrap.getSubreddit(subreddit);

      // Fetch new posts, defaults to 25
      // There's no way to get posts from a specific time onwards, so we fetch new posts and filter them manually
      // Another way is to use the after parameter, but that means we keep track of the last post we've seen:
      // const posts = await subredditInstance.getNew({after: 't3_1iwx6i'});
      const posts = await subredditInstance.getNew();

      const keywordRegex = new RegExp(this.keywords.join('|'), 'gi');

      // Filter posts based on keywords and timeframe
      const filteredPosts = posts
        .filter((post) => {
          const createdAtInMillisecond = post.created_utc * 1000;

          return (
            (keywordRegex.test(post.title) ||
              keywordRegex.test(post.selftext)) &&
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
            keywords: uniqueMatchedKeywords,
            post,
          };
        });

      relevantSubmissions.push(...filteredPosts);
    }

    // Save to db
    const relevantPosts = relevantSubmissions.map((submission) =>
      this.createRedditPost(submission),
    );
    const success = await this.insertPostsToDatabase(relevantPosts);

    if (!success) {
      throw new Error('Failed to insert posts to database');
    }

    return success;
  }

  async replyToPost({
    postId,
    response,
  }: {
    postId: string;
    response: string;
  }) {
    // Check conditions for replying
    if (!response) {
      throw new Error('Response is mandatory to reply to a post');
    }

    // TODO(socialmon): Figure out how to add type here.
    let finalResponse: any = null;

    const replySuccess = await this.snooWrap
      .getSubmission(postId)
      .reply(response)
      .then(
        (result) => {
          console.info('Successfully replied to post');

          finalResponse = result;

          return true;
        },
        (error) => {
          console.error(error);

          return false;
        },
      );

    if (!replySuccess) {
      throw new Error('Failed to reply to post');
    }

    // Update response and replied flag in DB
    const updateSuccess = await this.updateResponse({
      id: postId,
      replied: true,
      repliedAt: finalResponse?.created_utc
        ? new Date(finalResponse.created_utc * 1000) // In milliseconds
        : new Date(),
      response: finalResponse?.body_html || response,
    });

    if (!updateSuccess) {
      throw new Error('Failed to update post in database');
    }
  }

  async getPosts({
    pagination,
    filter,
  }: Readonly<{
    filter: { tab: PostTab };
    pagination: { cursor?: string | null; limit: number };
  }>): Promise<{
    nextCursor?: string;
    posts: Array<RedditPost>;
  }> {
    const { cursor, limit } = pagination;
    const { tab } = filter;

    const postFilter =
      tab === 'all'
        ? {}
        : tab === 'unreplied'
          ? { replied: false }
          : { replied: true };

    // Get posts from database where replied is false
    const posts = await prisma.redditPost.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        postedAt: 'desc',
      },
      take: limit + 1,
      where: {
        ...postFilter,
      },
    });

    let nextCursor: typeof cursor | undefined = undefined;

    if (posts.length > limit) {
      // Remove the last item and use it as next cursor

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const nextItem = posts.pop()!;

      nextCursor = nextItem.id;
    }

    return {
      nextCursor,
      posts,
    };
  }
}

export default RedditPlatform;
