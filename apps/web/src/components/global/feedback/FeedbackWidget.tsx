'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

import { fbqGFE } from '~/lib/fbq';

import { trpc } from '~/hooks/trpc';

import { formatBigNumber } from '~/components/common/formatBigNumber';
import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementPressedStateColor_Active,
  themeBorderColor,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_Hover,
  themeTextSubtitleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import FeedbackDialog from './FeedbackDialog';

function OnlineUsers({ count }: Readonly<{ count: number }>) {
  const intl = useIntl();

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Active users in the last 2 hours',
        description: 'Label for online user count',
        id: 'Qhyafe',
      })}>
      <div className="flex items-center gap-2 px-2">
        <span
          className={clsx(
            'bg-success size-2.5 relative inline-flex rounded-full',
            'animate-pulse-slow',
          )}
        />
        <Text size="body3" weight="medium">
          <FormattedMessage
            defaultMessage="{noOfOnlineUsers} online"
            description="Text describing online users"
            id="6VId29"
            values={{
              noOfOnlineUsers: formatBigNumber(count),
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}

type Props = Readonly<{
  bottomClassname?: string;
}>;

export default function FeedbackWidget({
  bottomClassname = 'bottom-6',
}: Props) {
  const intl = useIntl();
  const { showFeedbackWidget, setShowFeedbackWidget } = useUserPreferences();
  const [isOpen, setIsOpen] = useState(false);
  const { data: count, isLoading } = trpc.marketing.getOnlineUsers.useQuery();

  const showOnlineUsers = count && count > 0;

  if (!showFeedbackWidget || isLoading) {
    return null;
  }

  return (
    <>
      <div
        className={clsx(
          'z-fixed group',
          ['fixed right-6', bottomClassname],
          'flex items-center justify-start',
          'rounded-full',
          'p-2',
          'bg-white transition-colors dark:bg-neutral-900',
          ['border', themeBorderColor],
          'shadow-glow-sm shadow-brand/10',
          'overflow-hidden',
        )}>
        {showOnlineUsers && (
          <div className="pr-2">
            <OnlineUsers count={count} />
          </div>
        )}
        <Button
          addonPosition="start"
          className={clsx(
            themeTextSubtitleColor,
            themeTextBrandColor_Hover,
            'border-transparent',
            // This is needed so that the button is visible
            // in contrast to the page background because
            // this variant doesn't have a border.
            'bg-neutral-100 dark:bg-neutral-800',
            themeBackgroundElementPressedStateColor_Active,
            themeOutlineElementBrandColor_FocusVisible,
          )}
          label={intl.formatMessage({
            defaultMessage: 'Feedback',
            description: 'Label for feedback button',
            id: 'FDiHN7',
          })}
          size="xs"
          variant="unstyled"
          onClick={() => {
            const newOpenState = !isOpen;

            setIsOpen(newOpenState);
            fbqGFE('track', 'Contact');
          }}
        />
        <span
          className={clsx(
            'inline-block transition-all',
            'w-0 group-hover:w-10',
            'opacity-0 group-hover:opacity-100',
          )}>
          <Button
            addonPosition="start"
            className={clsx('ml-2 hidden group-hover:flex')}
            icon={RiCloseLine}
            iconClassName="!size-4 !shrink-0"
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Hide feedback widget',
              description: 'Hide feedback widget',
              id: 'ePtSLU',
            })}
            size="xs"
            tooltip={intl.formatMessage({
              defaultMessage: 'Hide feedback widget',
              description: 'Hide feedback widget',
              id: 'ePtSLU',
            })}
            variant="tertiary"
            onClick={() => setShowFeedbackWidget(false)}
          />
        </span>
      </div>
      <FeedbackDialog
        isShown={isOpen}
        showHideWidgetForSessionButton={true}
        onClose={() => setIsOpen(false)}
        onHideWidgetForSession={() => {
          setShowFeedbackWidget(false);
        }}
      />
    </>
  );
}
