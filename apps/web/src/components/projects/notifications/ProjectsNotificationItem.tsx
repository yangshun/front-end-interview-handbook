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
  closeNotification: () => void;
  handleVisibleLongEnough: (id: string) => void;
  item: ProjectsNotificationAugmentedType;
}>;

export default function ProjectsNotificationItem({
  item,
  closeNotification,
  handleVisibleLongEnough,
}: Props) {
  const utils = trpc.useUtils();
  const { elementRef, visibleDuration } = useVisibleDuration();
  const [markAsSeen, setMarkAsSeen] = useState(false);

  const markAsRead = trpc.projects.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.projects.notifications.list.invalidate();
      utils.projects.notifications.getUnreadCount.invalidate();
    },
  });
  const { read } = item;

  const getUrl = () => {
    if (item.category === 'UPVOTE') {
      return item.submission?.hrefs.detail;
    }

    if (item.comment.parentCommentId) {
      return url.format({
        hash: item.comment.id,
        pathname: item.submission?.hrefs.detail,
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
    <div ref={elementRef} className="relative flex gap-4" onClick={onClick}>
      {item.category === 'UPVOTE' ? (
        <ProjectsNotificationSubmissionUpvote data={item} />
      ) : (
        <ProjectsNotificationDiscussion data={item} />
      )}

      <Anchor className="absolute inset-0" href={getUrl()} />
      {!read && <ProjectsNotificationUnreadIndicator />}
    </div>
  );
}
