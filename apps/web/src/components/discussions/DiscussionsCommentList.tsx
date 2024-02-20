import clsx from 'clsx';
import { useState } from 'react';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBorderColor, themeTextSubtleColor } from '~/components/ui/theme';

import DiscussionsComment from './DiscussionsComment';
import DiscussionsCommentSort from './DiscussionsCommentSort';
import type {
  DiscussionsCommentSortField,
  DiscussionsCommentUserProfile,
} from './types';

import type { DiscussionCommentDomain } from '@prisma/client';

type Props = Readonly<{
  domain: DiscussionCommentDomain;
  entityId: string;
  viewer?: DiscussionsCommentUserProfile | null;
}>;

export default function DiscussionsCommentList({
  entityId,
  domain,
  viewer,
}: Props) {
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [sortField, setSortField] =
    useState<DiscussionsCommentSortField>('createdAt');
  const { data, isLoading } = trpc.comments.list.useQuery({
    domain,
    entityId,
    sort: {
      field: sortField,
      isAscendingOrder,
    },
  });

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  const { count, comments } = data ?? {};

  if (comments?.length === 0) {
    return (
      <div
        className={clsx('w-full rounded-lg py-10', 'border', themeBorderColor)}>
        <EmptyState
          subtitle="Be the first to leave a comment"
          title="No comments yet"
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div
          className={clsx('flex items-center gap-1.5', themeTextSubtleColor)}>
          <RiQuestionnaireLine className="size-5" />
          <Text color="inherit" size="body3">
            <FormattedMessage
              defaultMessage="{commentCount, plural, =0 {No comments} one {# comment} other {# comments}}"
              description="Label for comment count on project discussions page"
              id="oFz9cs"
              values={{
                commentCount: count,
              }}
            />
          </Text>
        </div>
        <DiscussionsCommentSort
          isAscendingOrder={isAscendingOrder}
          setIsAscendingOrder={setIsAscendingOrder}
          setSortField={setSortField}
          sortField={sortField}
        />
      </div>
      {comments?.map((comment) => (
        <DiscussionsComment
          key={comment.id}
          comment={comment}
          level={1}
          viewer={viewer}
        />
      ))}
    </div>
  );
}
