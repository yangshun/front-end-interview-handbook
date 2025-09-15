import clsx from 'clsx';
import { RiNotification3Line } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeDivideEmphasizeColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

type Props = Readonly<{ closeNotification: () => void }>;

export default function InterviewsNotificationPopoverContent(_: Props) {
  const isLoading = false;
  const notifications = [];

  return (
    <div>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size="sm" />
        </div>
      ) : notifications?.length === 0 ? (
        <div
          className={clsx(
            'h-full w-full',
            'flex flex-col items-center justify-center gap-4',
          )}>
          <RiNotification3Line
            className={clsx('size-10 shrink-0', themeTextSubtitleColor)}
          />
          <div className="flex flex-col gap-1 text-center">
            <Text size="body1" weight="medium">
              <FormattedMessage
                defaultMessage="No notification yet!"
                description="Label for no notification"
                id="hz5dJR"
              />
            </Text>
            <Text color="subtle" size="body2">
              <FormattedMessage
                defaultMessage="It looks like you don't have any notifications at the moment. Check back here for updates on your activities."
                description="Description for no notification"
                id="Nn5jH+"
              />
            </Text>
          </div>
        </div>
      ) : (
        <div className={clsx('divide-y', themeDivideEmphasizeColor)}>
          Notifications
        </div>
      )}
    </div>
  );
}
