'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiCloseLine, RiFeedbackLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { fbqGFE } from '~/lib/fbq';
import { trpc } from '~/hooks/trpc';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import Button from '~/components/ui/Button';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderEmphasizeColor,
  themeBoxShadow,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_Hover,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import FeedbackDialog from './FeedbackDialog';
import { getFormattedNumber } from '../../projects/misc';
import Text from '../../ui/Text';

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
        <span className="size-2.5 relative flex">
          <span className="bg-success size-full absolute inline-flex animate-ping rounded-full opacity-75" />
          <span className="bg-success size-full relative inline-flex rounded-full" />
        </span>
        <Text size="body3" weight="medium">
          <FormattedMessage
            defaultMessage="{noOfOnlineUsers} users"
            description="Text describing online users"
            id="Yw3g8b"
            values={{
              noOfOnlineUsers: getFormattedNumber(count),
            }}
          />
        </Text>
      </div>
    </Tooltip>
  );
}

export default function FeedbackWidget() {
  const intl = useIntl();
  const {
    showFeedbackWidget,
    setShowFeedbackWidget,
    isFeedbackWidgetExpanded,
    setIsFeedbackWidgetExpanded,
  } = useUserPreferences();
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
          'z-fixed group fixed bottom-6 right-6',
          'flex items-center justify-start',
          'rounded-full',
          'p-2',
          'bg-white transition-colors dark:bg-neutral-800',
          ['border', themeBorderEmphasizeColor],
          'overflow-hidden',
        )}>
        {isFeedbackWidgetExpanded ? (
          <>
            {showOnlineUsers && (
              <div className="pr-1">
                <OnlineUsers count={count} />
              </div>
            )}
            <Button
              addonPosition="start"
              className={clsx(
                themeTextSubtleColor,
                themeTextBrandColor_Hover,
                'border-transparent',
                // This is needed so that the button is visible
                // in contrast to the page background because
                // this variant doesn't have a border.
                'bg-neutral-200 dark:bg-neutral-900',
                themeBackgroundElementPressedStateColor_Active,
                themeOutlineElementBrandColor_FocusVisible,
              )}
              icon={RiFeedbackLine}
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
                label="Close feedback"
                size="xs"
                variant="tertiary"
                onClick={() => setIsFeedbackWidgetExpanded(false)}
              />
            </span>
          </>
        ) : (
          <Button
            className={clsx(
              themeTextSubtleColor,
              themeTextBrandColor_Hover,
              'border-transparent',
              themeBackgroundElementPressedStateColor_Active,
              themeOutlineElementBrandColor_FocusVisible,
            )}
            icon={RiFeedbackLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Feedback',
              description: 'Label for feedback button',
              id: 'FDiHN7',
            })}
            size="xs"
            tooltip={intl.formatMessage({
              defaultMessage: 'Feedback',
              description: 'Label for feedback button',
              id: 'FDiHN7',
            })}
            variant="tertiary"
            onClick={() => setIsFeedbackWidgetExpanded(true)}
          />
        )}
      </div>
      <FeedbackDialog
        isShown={isOpen}
        preBodyContents={
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="We appreciate any feedback or bug reports on the product. Feedback that the team finds useful will be rewarded with freebies and
            discounts or even cashbacks on your order!"
              description="Feedback widget description."
              id="kzxwOd"
            />
          </Text>
        }
        onClose={() => setIsOpen(false)}
        onHideWidgetForSession={() => {
          setShowFeedbackWidget(false);
        }}
      />
    </>
  );
}
