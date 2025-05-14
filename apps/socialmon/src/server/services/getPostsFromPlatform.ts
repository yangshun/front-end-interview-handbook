import { getPostsFromReddit } from '~/db/RedditUtils';

import prisma from '../prisma';
import { sendGoogleChatMessage } from '../utils/googleChat';

export async function fetchPostsFromPlatform(projectSlug: string) {
  const fetchStartTime = new Date(); // Record the fetch start time before fetching posts

  const project = await prisma.project.findUnique({
    select: {
      id: true,
      keywords: true,
      name: true,
      postFilteringPrompt: true,
      subreddits: true,
    },
    where: {
      slug: projectSlug,
    },
  });

  if (!project) {
    throw new Error('Project not found!');
  }

  const rawPosts = await getPostsFromReddit({
    keywords: project.keywords,
    postFilteringPrompt: project.postFilteringPrompt,
    subreddits: project.subreddits,
  });

  const postsFromReddit = await Promise.all(rawPosts);

  const postsFromRedditWithProjectId = postsFromReddit.map((post) => ({
    ...post,
    projectId: project.id,
  }));

  const result = await prisma.$transaction([
    // Add it to the db
    prisma.redditPost.createMany({
      data: postsFromRedditWithProjectId,
      skipDuplicates: true,
    }),
    // Update last posts fetch time
    prisma.project.update({
      data: {
        postsLastFetchedAt: new Date(),
      },
      where: {
        id: project.id,
      },
    }),
  ]);

  const insertResult = result[0];
  const insertedNewPosts = insertResult.count;
  const newPostsFetched = insertedNewPosts > 0;

  if (newPostsFetched) {
    // Fetch only the successfully inserted posts
    const newPosts = await prisma.redditPost.findMany({
      where: {
        createdAt: {
          gte: fetchStartTime, // Use the recorded fetch start time
        },
        projectId: project.id,
      },
    });

    // Accumulate links and subreddits for all posts
    const postLinks = newPosts.map((post) => {
      const triggeringKeyword = project.keywords.find(
        (keyword) =>
          post.title.includes(keyword) || post.content.includes(keyword),
      );

      const postLink = `https://socialmon.vercel.app/projects/${projectSlug}/posts/${post.id}`;

      return `Link: ${postLink} | Subreddit: ${
        post.subreddit
      } | Triggered by keyword: ${triggeringKeyword || 'N/A'}`;
    });

    // Send a single message with all links
    await sendGoogleChatMessage({
      additionalInfo: `Fetched ${newPosts.length} new posts:\n${postLinks.join(
        '\n',
      )}`,
      projectName: project.name,
      subreddits: project.subreddits,
    });
  }

  return result;
}
