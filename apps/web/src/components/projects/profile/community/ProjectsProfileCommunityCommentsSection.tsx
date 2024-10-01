import { RiDiscussLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';

import ProjectsProfileCommunityCommentList from './ProjectsProfileCommunityCommentList';
import type { ProjectsProfileCommunityComment } from './ProjectsProfileCommunitySection';

function getStartOfCurrWeek(date: Date) {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  const startOfWeek = new Date(date.setDate(diff));

  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

function getStartOfPrevWeek(date: Date) {
  const startOfPrevWeek = getStartOfCurrWeek(date);

  startOfPrevWeek.setDate(startOfPrevWeek.getDate() - 7);

  return startOfPrevWeek;
}

function getStartOfCurrMonth(date: Date) {
  const startOfCurrMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  startOfCurrMonth.setHours(0, 0, 0, 0);

  return startOfCurrMonth;
}

function getStartOfPrevMonth(date: Date) {
  const startOfPrevMonth = getStartOfCurrMonth(date);

  startOfPrevMonth.setMonth(startOfPrevMonth.getMonth() - 1);

  return startOfPrevMonth;
}

type Props = Readonly<{
  comments: ReadonlyArray<ProjectsProfileCommunityComment>;
  hasFilters: boolean;
  isViewingOwnProfile: boolean;
  targetUserId?: string;
}>;

export default function ProjectsProfileCommunityCommentsSection({
  comments,
  hasFilters,
  isViewingOwnProfile,
  targetUserId,
}: Props) {
  const intl = useIntl();

  if (comments.length === 0) {
    return hasFilters ? (
      <EmptyState
        icon={RiDiscussLine}
        subtitle={intl.formatMessage({
          defaultMessage:
            'No contributions in the community matching those filters',
          description:
            'Subtitle for empty state when there are no contributions matching filters',
          id: 'B8uTwW',
        })}
        title={intl.formatMessage({
          defaultMessage: 'No community contributions',
          description:
            'Title for empty state when there are no contributions matching filters',
          id: 'lu/XVn',
        })}
        variant="empty"
      />
    ) : (
      <EmptyState
        icon={RiDiscussLine}
        subtitle={intl.formatMessage({
          defaultMessage: 'No contributions in the community so far',
          description:
            'Subtitle for empty state when there are no contributions',
          id: 'DHQOPk',
        })}
        title={intl.formatMessage({
          defaultMessage: 'No community contributions',
          description: 'Title for empty state when there are no contributions',
          id: 'iw1XYQ',
        })}
        variant="empty"
      />
    );
  }

  const allComments = comments.slice(0);
  const sortedComments = allComments.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
  const indexOfFirstCommentOlderThanCurrWeek = sortedComments.findIndex(
    (comment) => {
      const startOfCurrWeek = getStartOfCurrWeek(new Date());

      return comment.createdAt.getTime() < startOfCurrWeek.getTime();
    },
  );
  const indexOfFirstCommentOlderThanPrevWeek = sortedComments.findIndex(
    (comment) => {
      const startOfPrevWeek = getStartOfPrevWeek(new Date());

      return comment.createdAt.getTime() < startOfPrevWeek.getTime();
    },
  );
  const indexOfFirstCommentOlderThanCurrMonth = sortedComments.findIndex(
    (comment) => {
      const startOfCurrMonth = getStartOfCurrMonth(new Date());

      return comment.createdAt.getTime() < startOfCurrMonth.getTime();
    },
  );
  const indexOfFirstCommentOlderThanPrevMonth = sortedComments.findIndex(
    (comment) => {
      const startOfPrevMonth = getStartOfPrevMonth(new Date());

      return comment.createdAt.getTime() < startOfPrevMonth.getTime();
    },
  );

  const commentsInCurrWeek = sortedComments.slice(
    0,
    indexOfFirstCommentOlderThanCurrWeek === -1
      ? undefined
      : indexOfFirstCommentOlderThanCurrWeek,
  );
  const commentsInPrevWeek =
    indexOfFirstCommentOlderThanCurrWeek === -1
      ? []
      : sortedComments.slice(
          indexOfFirstCommentOlderThanCurrWeek,
          indexOfFirstCommentOlderThanPrevWeek === -1
            ? undefined
            : indexOfFirstCommentOlderThanPrevWeek,
        );
  const commentsInCurrMonth =
    indexOfFirstCommentOlderThanPrevWeek === -1
      ? []
      : sortedComments.slice(
          indexOfFirstCommentOlderThanPrevWeek,
          indexOfFirstCommentOlderThanCurrMonth === -1
            ? undefined
            : indexOfFirstCommentOlderThanCurrMonth,
        );
  const commentsInPrevMonth =
    indexOfFirstCommentOlderThanCurrMonth === -1
      ? []
      : sortedComments.slice(
          indexOfFirstCommentOlderThanCurrMonth,
          indexOfFirstCommentOlderThanPrevMonth === -1
            ? undefined
            : indexOfFirstCommentOlderThanPrevMonth,
        );
  const commentsOlderThanPrevMonth =
    indexOfFirstCommentOlderThanPrevMonth === -1
      ? []
      : sortedComments.slice(indexOfFirstCommentOlderThanPrevMonth);

  const groupedComments = [
    {
      comments: commentsInCurrWeek,
      title: intl.formatMessage({
        defaultMessage: 'Earlier',
        description: 'Title for earlier list of comments',
        id: '4/SGqe',
      }),
    },
    {
      comments: commentsInPrevWeek,
      title: intl.formatMessage({
        defaultMessage: 'Last week',
        description: 'Title for last week list of comments',
        id: 'C79VF0',
      }),
    },
    {
      comments: commentsInCurrMonth,
      title: intl.formatMessage({
        defaultMessage: 'Earlier this month',
        description: 'Title for earlier this month list of comments',
        id: 'zul/L1',
      }),
    },
    {
      comments: commentsInPrevMonth,
      title: intl.formatMessage({
        defaultMessage: 'Last month',
        description: 'Title for last month list of comments',
        id: 'kpP56G',
      }),
    },
    {
      comments: commentsOlderThanPrevMonth,
      title: intl.formatMessage({
        defaultMessage: 'A long time ago',
        description: 'Title for a long time ago list of comments',
        id: 'Vtp5JU',
      }),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {groupedComments
        .filter((group) => group.comments.length > 0)
        .map(
          (group) =>
            group.comments.length !== 0 && (
              <ProjectsProfileCommunityCommentList
                key={group.title}
                comments={group.comments}
                isViewingOwnProfile={isViewingOwnProfile}
                targetUserId={targetUserId}
                title={group.title}
              />
            ),
        )}
    </div>
  );
}
