import RelativeTimestamp from '../common/datetime/RelativeTimestamp';

import type { ActivityExtended } from '~/types';

import { Text } from '@mantine/core';

type Props = Readonly<{
  activity: ActivityExtended;
}>;

export default function ActivityItem({ activity }: Props) {
  const { action, user, post, createdAt } = activity;
  const userLabel = <span className="font-bold">{user.name}</span>;
  const postLabel = <span className="font-bold">{post.title}</span>;

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
