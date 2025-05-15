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
    where: {
      slug: projectSlug,
    },
  });

  if (!project) {
    return notFound();
  }

  const {
    keywords,
    name,
    postFilteringPrompt,
    productsToAdvertise,
    subreddits,
  } = project as ProjectTransformed;

  return (
    <div className="flex w-full flex-col gap-4 md:w-1/2">
      <div>
        <Title order={4}>Name</Title>
        <Text>{name}</Text>
      </div>

      <div>
        <Title order={4}>Keywords</Title>
        {keywords.map((keyword) => (
          <Pill key={keyword} size="sm">
            {keyword}
          </Pill>
        ))}
      </div>

      <div>
        <Title order={4}>Subreddits</Title>
        {subreddits.map((subreddit) => (
          <Pill key={subreddit} size="sm">
            {subreddit}
          </Pill>
        ))}
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
