import { BASE_URL } from '~/constants';
import { getPostsFromReddit } from '~/db/RedditUtils';
import prisma from '~/server/prisma';
import type { FetchedRedditPost } from '~/types';

import { sendGoogleChatMessage } from '../utils/googleChat';

function extractTriggeringSnippet(
  title: string,
  content: string,
  keyword: string,
): string {
  const contentToSearch = `${title} ${content}`;

  if (!keyword) return 'N/A';

  // Split into sentences (handles . ! ? and newlines)
  const sentences = contentToSearch.match(/[^.!?\n]+[.!?\n]+/g) || [
    contentToSearch,
  ];

  // Find the first sentence containing the keyword (case-insensitive)
  const found = sentences.find((sentence) =>
    sentence.toLowerCase().includes(keyword.toLowerCase()),
  );

  return found ? found.trim() : 'N/A';
}

export async function fetchPostsFromPlatform(projectSlug: string) {
  const fetchStartTime = new Date();

  const project = await prisma.project.findUnique({
    select: {
      id: true,
      keywords: true,
      name: true,
      postFilteringPrompt: true,
      subredditKeywords: true,
      subreddits: true,
    },
    where: {
      slug: projectSlug,
    },
  });

  if (!project) {
    throw new Error('Project not found!');
  }

  let postsFromReddit: Array<FetchedRedditPost> = [];

  // If subredditKeywords exists and is non-empty, use group-based fetching
  if (project.subredditKeywords && project.subredditKeywords.length > 0) {
    // For each group, fetch posts using its keywords and subreddits
    const groupPosts = await Promise.all(
      project.subredditKeywords.map(async (group) => {
        const rawPosts = await getPostsFromReddit({
          keywords: group.keywords,
          postFilteringPrompt: project.postFilteringPrompt,
          subreddits: group.subreddits,
        });

        return await Promise.all(rawPosts);
      }),
    );

    // Flatten the array of arrays
    postsFromReddit = groupPosts.flat();
  } else {
    // Fallback to legacy way
    const rawPosts = await getPostsFromReddit({
      keywords: project.keywords,
      postFilteringPrompt: project.postFilteringPrompt,
      subreddits: project.subreddits,
    });

    postsFromReddit = await Promise.all(rawPosts);
  }

  const postsFromRedditWithProjectId = postsFromReddit.map((post) => ({
    ...post,
    projectId: project.id,
  }));

  const result = await prisma.$transaction([
    prisma.redditPost.createMany({
      data: postsFromRedditWithProjectId,
      skipDuplicates: true,
    }),
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
    const newPosts = await prisma.redditPost.findMany({
      where: {
        createdAt: {
          gte: fetchStartTime,
        },
        projectId: project.id,
      },
    });

    const postLinks = newPosts.map((post, idx) => {
      // Use group keywords if group-based fetch, else legacy
      const keywordsToCheck =
        project.subredditKeywords && project.subredditKeywords.length > 0
          ? project.subredditKeywords.flatMap((g) => g.keywords)
          : project.keywords;

      const keywordRegex = new RegExp(keywordsToCheck.join('|'), 'gi');
      const match = (post.title + ' ' + post.content).match(keywordRegex);
      const triggeringKeyword = match ? match[0] : undefined;

      const snippet = triggeringKeyword
        ? extractTriggeringSnippet(post.title, post.content, triggeringKeyword)
        : 'N/A';

      const postLink = `<${BASE_URL}/projects/${projectSlug}/posts/${post.id}|Redditmon>`;
      const redditLink = `<https://www.reddit.com${post.permalink}|Reddit>`;

      return `${idx + 1}. ${post.title}
${postLink} · ${redditLink} | ${post.subreddit} | Keyword: ${triggeringKeyword || 'N/A'}
Snippet: "${snippet}"`;
    });

    const additionalInfo = `Fetched ${newPosts.length} new posts:\n\n${postLinks.join('\n\n')}`;

    await sendGoogleChatMessage({
      additionalInfo,
      groups: project.subredditKeywords ?? [],
      projectName: project.name,
    });
  }

  return result;
}
