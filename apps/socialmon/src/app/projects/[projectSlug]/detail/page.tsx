import { Pill, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import prisma from '~/server/prisma';
import type { ProjectTransformed } from '~/types';

type Props = Readonly<{
  params: {
    projectSlug: string;
  };
}>;

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon | Project detail',
};

export default async function Page({ params }: Props) {
  const { projectSlug } = params;
  const project = await prisma.project.findUnique({
    include: {
      subredditKeywords: true,
    },
    where: {
      slug: projectSlug,
    },
  });

  if (!project) {
    return notFound();
  }

  const {
    name,
    postFilteringPrompt,
    productsToAdvertise,
    subredditKeywords = [],
  } = project as ProjectTransformed;

  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div>
        <Title order={4}>Name</Title>
        <Text>{name}</Text>
      </div>

      <div>
        <Title order={4}>Keyword/Subreddit Groups</Title>
        {subredditKeywords.length === 0 && (
          <Text c="dimmed" size="sm">
            No groups defined.
          </Text>
        )}
        {subredditKeywords.map((group, idx) => {
          // Create a stable key based on content + position to avoid using pure index
          const contentKey = `${group.keywords.join('-')}-${group.subreddits.join('-')}-${idx}`;

          return (
            <div key={contentKey} className="mb-2 rounded border p-2">
              <Text fw={700}>Group {idx + 1}</Text>
              <div>
                <Text fw={500} span={true}>
                  Keywords:{' '}
                </Text>
                {group.keywords.length > 0 ? (
                  group.keywords.map((kw) => (
                    <Pill key={kw} className="mr-1" size="xs">
                      {kw}
                    </Pill>
                  ))
                ) : (
                  <Text c="dimmed" size="xs" span={true}>
                    None
                  </Text>
                )}
              </div>
              <div>
                <Text fw={500} span={true}>
                  Subreddits:{' '}
                </Text>
                {group.subreddits.length > 0 ? (
                  group.subreddits.map((sr) => (
                    <Pill key={sr} className="mr-1" size="xs">
                      {sr}
                    </Pill>
                  ))
                ) : (
                  <Text c="dimmed" size="xs" span={true}>
                    None
                  </Text>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <Title order={4}>Posts filter prompt</Title>
        <Text>{postFilteringPrompt}</Text>
      </div>

      <div className="flex flex-col gap-2">
        <Title order={4}>Products to advertise</Title>
        {productsToAdvertise?.map((product) => (
          <div
            key={product.url}
            className={clsx(
              'flex flex-col gap-1.5',
              'bg-slate-100',
              'rounded',
              'p-2',
            )}>
            <div>
              <Title order={6}>URL</Title>
              <Link href={product.url} target="_blank">
                <Text c="blue">{product.url}</Text>
              </Link>
            </div>
            <div>
              <Title order={6}>Description</Title>
              <Text>{product.description}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
