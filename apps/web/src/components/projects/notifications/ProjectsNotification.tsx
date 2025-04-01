'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiNotification3Line } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import useProjectsNotificationUnreadCount from './hooks/useProjectsNotificationUnreadCount';
import ProjectsNotificationContent from './ProjectsNotificationContent';
import ProjectsNotificationPopover from './ProjectsNotificationPopover';
import ProjectsNotificationUnreadIndicator from './ProjectsNotificationUnreadIndicator';

export default function ProjectsNotification() {
  const intl = useIntl();
  const unreadCount = useProjectsNotificationUnreadCount();
  const [showNotification, setShowNotification] = useState(false);

  return (
    <ProjectsNotificationPopover
      className={clsx('h-[80vh] overflow-y-auto', 'w-[500px]')}
      isShown={showNotification}
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
            size="sm"
            variant="secondary"
            onClick={() => setShowNotification(true)}
          />
          {unreadCount > 0 && (
            <ProjectsNotificationUnreadIndicator className="absolute right-0.5 top-0.5" />
          )}
        </div>
      }
      onClose={() => setShowNotification(false)}>
      <ProjectsNotificationContent
        closeNotification={() => setShowNotification(false)}
      />
    </ProjectsNotificationPopover>
  );
}
