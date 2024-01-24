import { useIntl } from 'react-intl';

import ProjectsCommentList from './ProjectsCommentList';
import type { ContributionComment } from './ProjectsProgressAndContributionsSection';

type Props = Readonly<{
  comments: ReadonlyArray<ContributionComment>;
}>;

export default function ProjectsAllCommentsSection({ comments }: Props) {
  const intl = useIntl();
  const allComments = comments.slice(0);
  const sortedComments = allComments.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
  const indexOfFirstCommentOlderThanAWeek = sortedComments.findIndex(
    (comment) => {
      const now = new Date();
      const diff = Math.abs(now.getTime() - comment.createdAt.getTime());
      const diffDays = Math.floor(diff / (1000 * 3600 * 24));

      return diffDays > 7;
    },
  );
  const indexOfFirstCommentOlderThanAMonth = sortedComments.findIndex(
    (comment) => {
      const now = new Date();
      const diff = Math.abs(now.getTime() - comment.createdAt.getTime());
      const diffDays = Math.floor(diff / (1000 * 3600 * 24));

      return diffDays > 30;
    },
  );
  const commentsLessThanAWeek = sortedComments.slice(
    0,
    indexOfFirstCommentOlderThanAWeek === -1
      ? undefined
      : indexOfFirstCommentOlderThanAWeek,
  );
  const commentsAWeekToAMonth = sortedComments.slice(
    indexOfFirstCommentOlderThanAWeek === -1
      ? sortedComments.length
      : indexOfFirstCommentOlderThanAWeek,
    indexOfFirstCommentOlderThanAMonth === -1
      ? undefined
      : indexOfFirstCommentOlderThanAMonth,
  );
  const commentsOlderThanAMonth = sortedComments.slice(
    indexOfFirstCommentOlderThanAMonth === -1
      ? sortedComments.length
      : indexOfFirstCommentOlderThanAMonth,
  );

  const codeReviews = [
    {
      comments: commentsLessThanAWeek,
      title: intl.formatMessage({
        defaultMessage: 'Earlier',
        description: 'Title for earlier list of code reviews',
        id: 'buCV7d',
      }),
    },
    {
      comments: commentsAWeekToAMonth,
      title: intl.formatMessage({
        defaultMessage: 'Last week',
        description: 'Title for last week list of code reviews',
        id: 'BUK7YK',
      }),
    },
    {
      comments: commentsOlderThanAMonth,
      title: intl.formatMessage({
        defaultMessage: 'Last month',
        description: 'Title for last month list of code reviews',
        id: 'ZqRybm',
      }),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {codeReviews.map((codeReview) => (
        <ProjectsCommentList
          key={codeReview.title}
          comments={codeReview.comments}
          title={codeReview.title}
        />
      ))}
    </div>
  );
}
