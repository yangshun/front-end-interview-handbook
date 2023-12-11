import type { Submission } from 'snoowrap';
import Snoowrap from 'snoowrap';

import type { Post } from '~/models/Post';

import type { Platform } from '../Platform';
import prisma from '../../server/prisma';

import type { RedditPost } from '@prisma/client';

class RedditPlatform implements Platform {
    private snooWrap: Snoowrap;
    private subreddits: Array<string>;
    private keywords: Array<string>;
    private timeframeInHours: number;

    constructor(clientId: string, clientSecret: string, userAgent: string, username: string, password: string,
                subreddits: Array<string>, keywords: Array<string>, timeframeInHours: number) {
        this.snooWrap = new Snoowrap({
            clientId,
            clientSecret,
            password,
            userAgent,
            username
        });
        this.subreddits = subreddits;
        this.keywords = keywords;
        this.timeframeInHours = timeframeInHours;
    }

    private createRedditPost(post: Submission): RedditPost {
        return {
            content: post.selftext,
            foundAt: new Date(),
            id: post.id,
            postedAt: new Date((post.created_utc + 3600 * 8)* 1000), // GMT +8
            replied: false,
            repliedAt: null,
            response: null,
            title: post.title,
            url: post.url
        };
    }

    private async insertPostsToDatabase(posts: Array<Post>): Promise<boolean> {
        // If post exists in database, just skip over it?
        const result = await prisma.redditPost.createMany({
            data: posts.map(post => {
                return {
                    content: post.content,
                    id: post.id,
                    postedAt: post.postedAt,
                    replied: post.replied,
                    response: post.response,
                    title: post.title,
                    url: post.url
                };
            })
        }).then(() => {
            console.info('Successfully inserted posts to database');

            return true;
        }).catch(error => {
            console.error(error);

            return false;
        });

        return result;
    }

    async getRelevantPosts(): Promise<Array<Post>> {
        const currentTime = Math.floor(Date.now() / 1000);
        const startTime = currentTime - this.timeframeInHours * 3600;

        const relevantSubmissions: Array<Submission> = [];

        // Loop through each subreddit
        for (const subreddit of this.subreddits) {
            const subredditInstance = this.snooWrap.getSubreddit(subreddit);

            // Fetch new posts, defaults to 25
                // There's no way to get posts from a specific time onwards, so we fetch new posts and filter them manually
                // Another way is to use the after parameter, but that means we keep track of the last post we've seen:
                // const posts = await subredditInstance.getNew({after: 't3_1iwx6i'});
            const posts = await subredditInstance.getNew();

            // Filter posts based on keywords and timeframe
            const filteredPosts = posts.filter(post => {
                return (
                    // This.keywords.some(keyword => post.title.toLowerCase().includes(keyword.toLowerCase())) &&
                    post.created_utc >= startTime
                );
            });

            relevantSubmissions.push(...filteredPosts);
        }

        // Save to db
        const relevantPosts = relevantSubmissions.map(post => this.createRedditPost(post));
        const success = await this.insertPostsToDatabase(relevantPosts);

        if (!success) {
            // TODO: throw an error
            console.error('Failed to insert posts to database');
        }

        // Probably no longer need to return - just return if it's successful or not
        return relevantPosts;
    }

    async replyToPost(post: RedditPost): Promise<boolean> {
        // Check conditions for replying
        if (!post.response) {
            return false; // TODO: throw an error
        }

        try {
            const replySuccess = await this.snooWrap.getSubmission(post.id).reply(post.response).then(() => {
                console.info('Successfully replied to post');
                post.replied = true;
                post.repliedAt = new Date();

                return true;
            }, (error) => {
                console.error(error);

                return false;
            });

            if (!replySuccess) {
                // TODO: throw an error
                console.error('Failed to reply to post');

                return false;
            }

            const updateSuccess = await this.updatePost(post);

            if (!updateSuccess) {
                // TODO: throw an error
                console.error('Failed to update post in database');

                return false;
            }

            return true;
        } catch (error) { // TODO: throw an error
            console.error(error);

            return false;
        }
    }

    private createRedditPostFromDatabase(redditPost: RedditPost): RedditPost {
        return {
            content: redditPost.content,
            foundAt: redditPost.foundAt,
            id: redditPost.id,
            postedAt: redditPost.postedAt,
            replied: redditPost.replied,
            repliedAt: redditPost.repliedAt,
            response: redditPost.response,
            title: redditPost.title,
            url: redditPost.url
        }
    }

    async updatePost(post: RedditPost): Promise<boolean> {
        // Update the post in the database
        const success = await prisma.redditPost.update({
            data: {
                replied: post.replied,
                repliedAt: post.repliedAt,
                response: post.response
            },
            where: {
                id: post.id
            }
        }).then(() => {
            console.info('Successfully updated post in database');

            return true;
        }).catch(error => {
            console.error(error);

            return false;
        });

        return success;
    }

    async getUnrepliedPosts(): Promise<Array<RedditPost>> {
        // Get posts from database where replied is false
        const posts = await prisma.redditPost.findMany({
            where: {
                replied: false
            }
        });

        return posts.map(post => this.createRedditPostFromDatabase(post));
    }

    async getRepliedPosts(): Promise<Array<RedditPost>> {
        // Get posts from database where replied is true
        const posts = await prisma.redditPost.findMany({
            where: {
                replied: true
            }
        });

        return posts.map(post => this.createRedditPostFromDatabase(post));
    }
}

export default RedditPlatform;
