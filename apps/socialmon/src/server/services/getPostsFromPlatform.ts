import { BASE_URL } from '~/constants';
import { getPostsFromReddit } from '~/db/RedditUtils';

import prisma from '../prisma';
import { sendGoogleChatMessage } from '../utils/googleChat';

function extractTriggeringSnippet(
  title: string,
  content: string,
  keyword: string,
  contextLength = 30,
): string {
  const contentToSearch = `${title} ${content}`;
  const keywordIndex = contentToSearch.indexOf(keyword);

  if (keywordIndex === -1) return 'N/A';

  const snippetStart = Math.max(0, keywordIndex - contextLength);
  const snippetEnd = Math.min(
    contentToSearch.length,
    keywordIndex + keyword.length + contextLength,
  );

  return contentToSearch.substring(snippetStart, snippetEnd).trim();
}

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

    // Accumulate links, subreddits, and triggering snippets for all posts
    const postLinks = newPosts.map((post) => {
      const triggeringKeyword = project.keywords.find(
        (keyword) =>
          post.title.includes(keyword) || post.content.includes(keyword),
      );

      const triggeringSnippet = triggeringKeyword
        ? extractTriggeringSnippet(post.title, post.content, triggeringKeyword)
        : 'N/A';

      const postLink = `${BASE_URL}/projects/${projectSlug}/posts/${post.id}`;

      return `Link: ${postLink} | Subreddit: ${
        post.subreddit
      } | Triggered by keyword: ${
        triggeringKeyword || 'N/A'
      } | Snippet: "${triggeringSnippet}"`;
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
