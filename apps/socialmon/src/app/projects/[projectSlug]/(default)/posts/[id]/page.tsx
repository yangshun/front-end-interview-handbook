import { Container } from '@mantine/core';
import { notFound } from 'next/navigation';

import PostDetailPage from '~/components/posts/PostDetailPage';

import prisma from '~/server/prisma';

type Props = Readonly<{
  params: {
    id: string;
  };
}>;

export default async function Page({ params }: Props) {
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
    return notFound();
  }

  return (
    <Container size="sm">
      <PostDetailPage post={post} showBackButton={true} />
    </Container>
  );
}
