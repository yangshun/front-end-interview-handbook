import clsx from 'clsx';
import { useState } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import SlideOut from '~/components/ui/SlideOut';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import useProjectsNotificationUnreadCount from './hooks/useProjectsNotificationUnreadCount';
import ProjectsNotificationContent from './ProjectsNotificationContent';
import ProjectsNotificationUnreadIndicator from './ProjectsNotificationUnreadIndicator';

type Props = Readonly<{
  closeMobileNav: () => void;
}>;

export default function ProjectsNotificationMobile({ closeMobileNav }: Props) {
  const intl = useIntl();
  const unreadCount = useProjectsNotificationUnreadCount();
  const [showNotification, setShowNotification] = useState(false);

  const closeNotification = () => {
    setShowNotification(false);
    closeMobileNav();
  };

  return (
    <SlideOut
      enterFrom="start"
      isShown={showNotification}
      size="sm"
      title={intl.formatMessage({
        defaultMessage: 'Notifications',
        description: 'Notifications label',
        id: 'sY9s8P',
      })}
      trigger={
        <button
          className={clsx(
            'group flex items-center gap-2',
            'px-2 py-2',
            'rounded',
            textVariants({ size: 'body3', weight: 'medium' }),
            themeTextSecondaryColor,
            themeBackgroundLayerEmphasized_Hover,
          )}
          type="button"
          onClick={() => setShowNotification(true)}>
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="Notifications"
              description="Label for notifications"
              id="PrexEG"
            />
          </Text>
          {unreadCount > 0 && <ProjectsNotificationUnreadIndicator />}
        </button>
      }
      onClose={() => setShowNotification(false)}>
      <div className="flex h-full flex-col gap-5">
        <Divider color="emphasized" />
        <ProjectsNotificationContent closeNotification={closeNotification} />
      </div>
    </SlideOut>
  );
}
