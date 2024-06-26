import type { Submission } from 'snoowrap';
import Snoowrap from 'snoowrap';

import prisma from '~/server/prisma';

import type { Platform } from '../Platform';

import type { RedditPost } from '@prisma/client';

class RedditPlatform implements Platform {
  private snooWrap: Snoowrap;
  private subreddits: Array<string>;
  private keywords: Array<string>;
  private timeframeInHours: number;

  constructor(
    clientId: string,
    clientSecret: string,
    userAgent: string,
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
      userAgent,
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

  private createRedditPost(post: Submission): RedditPost {
    return {
      content: post.selftext_html ?? post.selftext,
      foundAt: new Date(),
      id: post.id,
      postedAt: new Date(post.created_utc * 1000), // In milliseconds
      replied: false,
      repliedAt: null,
      response: null,
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
        data: posts.map((post) => {
          return {
            content: post.content,
            id: post.id,
            postedAt: post.postedAt,
            replied: post.replied,
            response: post.response,
            title: post.title,
            url: post.url,
          };
        }),
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

    const relevantSubmissions: Array<Submission> = [];

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
      const filteredPosts = posts.filter((post) => {
        const createdAtInMillisecond = post.created_utc * 1000;

        return (
          (keywordRegex.test(post.title) || keywordRegex.test(post.selftext)) &&
          createdAtInMillisecond >= startTime
        );
      });

      relevantSubmissions.push(...filteredPosts);
    }

    // Save to db
    const relevantPosts = relevantSubmissions.map((post) =>
      this.createRedditPost(post),
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
  }): Promise<boolean> {
    // Check conditions for replying
    if (!response) {
      throw new Error('Response is mandatory to reply to a post');
    }

    try {
      const replySuccess = await this.snooWrap
        .getSubmission(postId)
        .reply(response)
        .then(
          () => {
            console.info('Successfully replied to post');

            return true;
          },
          (error) => {
            console.error(error);

            return false;
          },
        );

      if (!replySuccess) {
        // TODO: throw an error
        console.error('Failed to reply to post');

        return false;
      }

      // Update response and replied flag in DB
      const updateSuccess = await this.updateResponse({
        id: postId,
        replied: true,
        repliedAt: new Date(),
        response,
      });

      if (!updateSuccess) {
        throw new Error('Failed to update post in database');
      }

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  async getUnrepliedPosts({
    limit,
    cursor,
  }: Readonly<{ cursor?: string | null; limit: number }>): Promise<{
    nextCursor?: string;
    posts: Array<RedditPost>;
  }> {
    // Get posts from database where replied is false
    const posts = await prisma.redditPost.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        postedAt: 'desc',
      },
      take: limit + 1,
      where: {
        replied: false,
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

  async getRepliedPosts({
    limit,
    cursor,
  }: Readonly<{ cursor?: string | null; limit: number }>): Promise<{
    nextCursor?: string;
    posts: Array<RedditPost>;
  }> {
    // Get posts from database where replied is true
    const posts = await prisma.redditPost.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        postedAt: 'desc',
      },
      take: limit + 1,
      where: {
        replied: true,
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
