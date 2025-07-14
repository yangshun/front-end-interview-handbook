import { notFound } from 'next/navigation';

import InterceptedPostDetailClient from '~/components/posts/InterceptedPostDetailClient';

import prisma from '~/server/prisma';

type Props = {
  params: { id: string; projectSlug: string };
};

export default async function InterceptedPostPage({ params }: Props) {
  const { id } = params;
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
        where: {
          action: {
            in: [
              'MADE_IRRELEVANT',
              'MADE_RELEVANT',
              'MARKED_AS_REPLIED',
              'MARKED_AS_NOT_REPLIED',
            ],
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

  return <InterceptedPostDetailClient post={post} />;
}
