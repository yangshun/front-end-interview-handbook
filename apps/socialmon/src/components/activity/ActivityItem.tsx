import { Text } from '@mantine/core';
import Link from 'next/link';

import useCurrentProjectSlug from '~/hooks/useCurrentProjectSlug';
import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';

import type { ActivityExtended } from '~/types';

type Props = Readonly<{
  activity: ActivityExtended;
}>;

export default function ActivityItem({ activity }: Props) {
  const projectSlug = useCurrentProjectSlug();
  const { action, createdAt, post, user } = activity;
  const userLabel = <span className="font-bold">{user.name}</span>;
  const postLabel = (
    <Text
      c="blue"
      component={Link}
      href={`/projects/${projectSlug}/posts/${post.id}`}>
      {post.title}
    </Text>
  );

  const timestampLabel = (
    <Text c="gray" size="sm">
      <span className="font-medium">
        <RelativeTimestamp timestamp={new Date(createdAt)} />
      </span>
    </Text>
  );

  if (action === 'REPLIED') {
    return (
      <div>
        <Text size="sm">
          {userLabel} replied to the post {postLabel}.
        </Text>
        {timestampLabel}
      </div>
    );
  }

  if (action === 'MADE_IRRELEVANT') {
    return (
      <div>
        <Text size="sm">
          {userLabel} marked the post {postLabel} as irrelevant.
        </Text>
        {timestampLabel}
      </div>
    );
  }

  return (
    <div>
      <Text size="sm">
        {userLabel} marked the post {postLabel} as relevant.
      </Text>
      {timestampLabel}
    </div>
  );
}
