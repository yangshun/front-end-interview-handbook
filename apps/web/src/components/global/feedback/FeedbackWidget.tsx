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
  themeBorderEmphasizeColor,
  themeBoxShadow,
} from '~/components/ui/theme';

import FeedbackDialog from './FeedbackDialog';
import { getFormattedNumber } from '../../projects/misc';
import Text from '../../ui/Text';

function OnlineUsers({ count }: Readonly<{ count: number }>) {
  return (
    <div className="flex items-center gap-1">
      <span className="size-2 relative flex">
        <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
        <span className="bg-success size-2 relative inline-flex rounded-full"></span>
      </span>
      <Text size="body3" weight="medium">
        <FormattedMessage
          defaultMessage="{noOfOnlineUsers} Online"
          description="Text describing online users"
          id="H8K2Jz"
          values={{
            noOfOnlineUsers: getFormattedNumber(count),
          }}
        />
      </Text>
    </div>
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
          'flex items-center justify-start gap-4',
          'rounded-full',
          isFeedbackWidgetExpanded ? ' px-4 py-2 ' : 'p-2',
          'bg-white transition-colors dark:bg-neutral-800',
          'border',
          themeBorderEmphasizeColor,
          themeBoxShadow,
        )}>
        {isFeedbackWidgetExpanded ? (
          <>
            {showOnlineUsers && <OnlineUsers count={count} />}
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Feedback',
                description: 'Label for feedback button',
                id: 'FDiHN7',
              })}
              size="xs"
              variant="secondary"
              onClick={() => {
                const newOpenState = !isOpen;

                setIsOpen(newOpenState);
                fbqGFE('track', 'Contact');
              }}
            />
            <Button
              addonPosition="start"
              className={clsx('!size-4', 'hidden group-hover:flex')}
              icon={RiCloseLine}
              iconClassName="!size-4 !shrink-0"
              isLabelHidden={true}
              label="Close Feedback"
              size="xs"
              variant="tertiary"
              onClick={() => setIsFeedbackWidgetExpanded(false)}
            />
          </>
        ) : (
          <Button
            icon={RiFeedbackLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Feedback',
              description: 'Label for feedback button',
              id: 'FDiHN7',
            })}
            size="md"
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
