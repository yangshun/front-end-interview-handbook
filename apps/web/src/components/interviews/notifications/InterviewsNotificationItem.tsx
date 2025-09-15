import { trpc } from '~/hooks/trpc';

import InterviewsActivityItem from '../activity/InterviewsActivityItem';
import type { InterviewsActivityExtended } from '../activity/types';
import InterviewsNotificationUnreadIndicator from './InterviewsNotificationUnreadIndicator';

type Props = Readonly<{
  activity: InterviewsActivityExtended;
  closeNotification?: () => void;
  variant?: 'full' | 'minimal';
}>;

export default function InterviewsNotificationItem({
  activity,
  closeNotification,
  variant = 'full',
}: Props) {
  const trcUtils = trpc.useUtils();
  const { read } = activity;
  const markAsRead = trpc.notifications.markAsRead.useMutation({
    onSuccess: () => {
      trcUtils.notifications.list.invalidate();
      trcUtils.notifications.getUnreadCount.invalidate();
    },
  });

  function onClick() {
    if (!read) {
      markAsRead.mutate({
        id: activity.id,
      });
    }
    closeNotification?.();
  }

  return (
    <div className="relative" onClick={onClick}>
      <InterviewsActivityItem activity={activity} variant={variant} />
      {!read && (
        <InterviewsNotificationUnreadIndicator className="absolute right-1.5 top-1.5" />
      )}
    </div>
  );
}
