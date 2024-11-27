import clsx from 'clsx';
import { useEffect, useState } from 'react';
import url from 'url';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';

import ProjectsNotificationDiscussion from './category/ProjectsNotificationDiscussion';
import ProjectsNotificationSubmissionUpvote from './category/ProjectsNotificationSubmissionUpvote';
import useVisibleDuration from './hooks/useVisibleDuration';
import ProjectsNotificationUnreadIndicator from './ProjectsNotificationUnreadIndicator';
import type { ProjectsNotificationAugmentedType } from './types';

type Props = Readonly<{
  className?: string;
  closeNotification: () => void;
  handleVisibleLongEnough: (id: string) => void;
  item: ProjectsNotificationAugmentedType;
}>;

export default function ProjectsNotificationItem({
  item,
  closeNotification,
  handleVisibleLongEnough,
  className,
}: Props) {
  const trcUtils = trpc.useUtils();
  const { elementRef, visibleDuration } = useVisibleDuration();
  const [markAsSeen, setMarkAsSeen] = useState(false);

  const markAsRead = trpc.projects.notifications.markAsRead.useMutation({
    onSuccess: () => {
      trcUtils.projects.notifications.list.invalidate();
      trcUtils.projects.notifications.getUnreadCount.invalidate();
    },
  });
  const { read } = item;

  const getUrl = () => {
    if (item.category === 'UPVOTE') {
      return item.submission?.hrefs.detail;
    }

    if ('challenge' in item) {
      return url.format({
        hash: item.comment.id,
        pathname: item.challenge.href,
      });
    }

    return url.format({
      hash: item.comment.id,
      pathname: item.submission?.hrefs.detail,
    });
  };

  const onClick = async () => {
    if (!read) {
      markAsRead.mutate({
        ids: [item.id],
      });
    }
    closeNotification();
  };

  useEffect(() => {
    if (visibleDuration >= 2 && !item.read && !markAsSeen) {
      handleVisibleLongEnough(item.id);
      setMarkAsSeen(true);
    }
  }, [visibleDuration, item, handleVisibleLongEnough, markAsSeen]);

  return (
    <div
      ref={elementRef}
      className={clsx(
        'relative flex gap-4',
        '-mx-3 rounded-lg px-3 py-6',
        'transition-colors',
        'hover:bg-neutral-100 dark:hover:bg-neutral-900',
        className,
      )}
      onClick={onClick}>
      <Anchor className="absolute inset-0" href={getUrl()} />
      {item.category === 'UPVOTE' ? (
        <ProjectsNotificationSubmissionUpvote data={item} />
      ) : (
        <ProjectsNotificationDiscussion data={item} />
      )}

      {!read && <ProjectsNotificationUnreadIndicator />}
    </div>
  );
}
