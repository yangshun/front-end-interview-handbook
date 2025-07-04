import { notFound } from 'next/navigation';

import PostDetailPage from '~/components/posts/PostDetailPage';

import prisma from '~/server/prisma';

type Props = {
  params: { id: string; projectSlug: string };
};

export default async function InterceptedPostPage({ params }: Props) {
  const { id } = params;

  // Same post fetching logic as the original
  const post = await prisma.redditPost.findUnique({
    include: {
      activities: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
        where: {
          action: {
            in: ['MADE_IRRELEVANT', 'MADE_RELEVANT'],
          },
        },
      },
      reply: {
        include: {
          redditUser: {
            select: {
              username: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <PostDetailPage post={post} showBackButton={false} />
    </div>
  );
}
