import clsx from 'clsx';
import { useState } from 'react';
import { RiNotification3Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import SlideOut from '~/components/ui/SlideOut';
import { themeBackgroundBrandColor } from '~/components/ui/theme';

import ProjectsNotificationContent from './ProjectsNotificationContent';

export default function ProjectsNotification() {
  const intl = useIntl();
  const [showNotification, setShowNotification] = useState(false);

  return (
    <SlideOut
      enterFrom="start"
      isShown={showNotification}
      size="md"
      title={intl.formatMessage({
        defaultMessage: 'Notifications',
        description: 'Label for notifications',
        id: 'PrexEG',
      })}
      trigger={
        <div className="relative">
          <Button
            icon={RiNotification3Line}
            isLabelHidden={true}
            label="Notification"
            size="sm"
            variant="secondary"
            onClick={() => setShowNotification(true)}
          />
          <div
            className={clsx(
              'size-2 shrink-0 rounded-full',
              'absolute right-0.5 top-0.5',
              themeBackgroundBrandColor,
            )}
          />
        </div>
      }
      onClose={() => setShowNotification(false)}>
      <ProjectsNotificationContent
        closeNotification={() => setShowNotification(false)}
      />
    </SlideOut>
  );
}
