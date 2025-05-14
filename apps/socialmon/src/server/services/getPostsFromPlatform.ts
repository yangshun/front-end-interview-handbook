import { getPostsFromReddit } from '~/db/RedditUtils';

import prisma from '../prisma';
import { sendGoogleChatMessage } from '../utils/googleChat';

export async function fetchPostsFromPlatform(projectSlug: string) {
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
    await sendGoogleChatMessage({
      numPostsFetched: insertedNewPosts,
      projectName: project.name,
      subreddits: project.subreddits,
    });
  }

  return result;
}
