import clsx from 'clsx';
import { RiArrowRightLine, RiNotification3Line } from 'react-icons/ri';
import url from 'url';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeDivideColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import InterviewsNotificationItem from './InterviewsNotificationItem';

const MAX_ITEMS_TO_SHOW = 4;

type Props = Readonly<{ closeNotification: () => void }>;

export default function InterviewsNotificationPopoverContent({
  closeNotification,
}: Props) {
  const intl = useIntl();
  const { data, isLoading } = trpc.notifications.list.useQuery({
    pagination: {
      limit: MAX_ITEMS_TO_SHOW + 1,
      page: 1,
    },
  });
  const { notifications } = data ?? {};

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
        <div className={clsx('divide-y', themeDivideColor)}>
          {notifications
            ?.slice(0, MAX_ITEMS_TO_SHOW)
            .map((notification) => (
              <InterviewsNotificationItem
                key={notification.id}
                activity={notification}
                closeNotification={closeNotification}
                variant="minimal"
              />
            ))}

          {(notifications?.length ?? 0) > MAX_ITEMS_TO_SHOW && (
            <div className={clsx('w-full py-4', 'flex justify-center')}>
              <Button
                href={url.format({
                  pathname: '/profile',
                  query: {
                    tab: 'notifications',
                  },
                })}
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'See all notifications',
                  description: 'Label for view all notifications button',
                  id: 'yvKbxT',
                })}
                size="xs"
                variant="secondary"
                onClick={closeNotification}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
