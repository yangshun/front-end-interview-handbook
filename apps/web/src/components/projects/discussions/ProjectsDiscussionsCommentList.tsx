import clsx from 'clsx';
import { useState } from 'react';
import { RiQuestionnaireLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeBorderColor, themeTextSubtleColor } from '~/components/ui/theme';

import ProjectsDiscussionsComment from './ProjectsDiscussionsComment';
import ProjectsDiscussionsCommentSort from './ProjectsDiscussionsCommentSort';
import type {
  ProjectsDiscussionsCommentAuthor,
  ProjectsDiscussionsCommentSortField,
} from './types';

import type { ProjectsDiscussionCommentDomain } from '@prisma/client';

type Props = Readonly<{
  domain: ProjectsDiscussionCommentDomain;
  entityId: string;
  viewer?: ProjectsDiscussionsCommentAuthor | null;
}>;

export default function ProjectsDiscussionsCommentList({
  entityId,
  domain,
  viewer,
}: Props) {
  const [isAscendingOrder, setIsAscendingOrder] = useState(false);
  const [sortField, setSortField] =
    useState<ProjectsDiscussionsCommentSortField>('createdAt');
  const { data, isLoading } = trpc.projects.comments.list.useQuery({
    domain,
    entityId,
    sort: {
      field: sortField,
      isAscendingOrder,
    },
  });

  if (isLoading) {
    return (
      <div className="p-18 w-full">
        <Spinner display="block" />
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
        <div className="flex items-center gap-1.5">
          <RiQuestionnaireLine
            className={clsx('size-5', themeTextSubtleColor)}
          />
          <Text color="secondary" size="body3">
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
        <ProjectsDiscussionsCommentSort
          isAscendingOrder={isAscendingOrder}
          setIsAscendingOrder={setIsAscendingOrder}
          setSortField={setSortField}
          sortField={sortField}
        />
      </div>
      {comments?.map((comment) => (
        <ProjectsDiscussionsComment
          key={comment.id}
          comment={comment}
          level={1}
          viewer={viewer}
        />
      ))}
    </div>
  );
}
