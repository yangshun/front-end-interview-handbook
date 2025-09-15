'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useState } from 'react';
import { RiNotification3Line } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Popover from '~/components/ui/Popover';

import useInterviewsNotificationUnreadCount from './hooks/useInterviewsNotificationUnreadCount';
import InterviewsNotificationPopoverContent from './InterviewsNotificationPopoverContent';
import InterviewsNotificationUnreadIndicator from './InterviewsNotificationUnreadIndicator';

export default function InterviewsNotification() {
  const user = useUser();
  const intl = useIntl();
  const unreadCount = useInterviewsNotificationUnreadCount();
  const [showNotification, setShowNotification] = useState(false);

  if (user == null) {
    return null;
  }

  return (
    <Popover
      align="start"
      className={clsx('overflow-y-auto', 'mr-6 w-[464px]')}
      open={showNotification}
      trigger={
        <div className="relative">
          <Button
            icon={RiNotification3Line}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Notifications',
              description: 'Notifications label',
              id: 'sY9s8P',
            })}
            size="xs"
            variant="tertiary"
            onClick={() => setShowNotification(true)}
          />
          {unreadCount > 0 && (
            <InterviewsNotificationUnreadIndicator className="absolute right-0.5 top-0.5" />
          )}
        </div>
      }
      onOpenChange={(open) => {
        if (!open) {
          setShowNotification(false);
        }
      }}>
      <InterviewsNotificationPopoverContent
        closeNotification={() => setShowNotification(false)}
      />
    </Popover>
  );
}
