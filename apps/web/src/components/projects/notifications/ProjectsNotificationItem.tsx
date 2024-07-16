import clsx from 'clsx';
import url from 'url';

import { trpc } from '~/hooks/trpc';

import Anchor from '~/components/ui/Anchor';
import { themeBackgroundBrandColor } from '~/components/ui/theme';

import ProjectsNotificationDiscussion from './category/ProjectsNotificationDiscussion';
import ProjectsNotificationSubmissionUpvote from './category/ProjectsNotificationSubmissionUpvote';
import type { ProjectsNotificationAugmentedType } from './types';

type Props = Readonly<{
  closeNotification: () => void;
  item: ProjectsNotificationAugmentedType;
}>;

export default function ProjectsNotificationItem({
  item,
  closeNotification,
}: Props) {
  const utils = trpc.useUtils();
  const markAsRead = trpc.projects.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.projects.notifications.list.invalidate();
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
    markAsRead.mutate({
      ids: [item.id],
    });
    closeNotification();
  };

  return (
    <div className="relative flex gap-4" onClick={onClick}>
      {item.category === 'UPVOTE' ? (
        <ProjectsNotificationSubmissionUpvote data={item} />
      ) : (
        <ProjectsNotificationDiscussion data={item} />
      )}

      <Anchor className="absolute inset-0" href={getUrl()} />
      {!read && (
        <div
          className={clsx(
            'size-2 shrink-0 rounded-full',
            themeBackgroundBrandColor,
          )}
        />
      )}
    </div>
  );
}
