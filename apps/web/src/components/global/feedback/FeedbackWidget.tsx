'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowDownSLine, RiCloseLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import fbq from '~/lib/fbq';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';

import FeedbackDialog from './FeedbackDialog';
import Text from '../../ui/Text';

type Props = Readonly<{
  position: 'bottom' | 'end';
}>;

export default function FeedbackWidget({ position }: Props) {
  const { showFeedbackWidget, setShowFeedbackWidget } = useUserPreferences();
  const [isOpen, setIsOpen] = useState(false);

  if (!showFeedbackWidget) {
    return null;
  }

  return (
    <>
      <button
        className={clsx(
          'fixed z-fixed hidden items-center text-xs text-white drop-shadow-xl transition-colors md:block',
          'focus:ring-2 focus:ring-offset-2',
          'focus:outline-brand-dark dark:focus:outline-brand',
          'bg-neutral-900 dark:bg-neutral-800',
          'hover:bg-neutral-800',
          position === 'end' &&
            'right-0 h-56 w-9 rounded-l-lg sm:bottom-[20px] md:top-1/2 md:-translate-y-1/2',
          position === 'bottom' &&
            'bottom-0 h-9 w-56 rounded-t-lg md:left-1/4 ',
        )}
        type="button"
        onClick={() => {
          const newOpenState = !isOpen;

          setIsOpen(newOpenState);

          fbq.track('Contact');
        }}>
        <div
          className={clsx(
            'flex items-center justify-center gap-3 whitespace-nowrap',
            position === 'end' && '-mt-4 w-10 origin-center -rotate-90',
          )}>
          <FormattedMessage
            defaultMessage="Chat with us directly!"
            description="Text on Feedback Widget when it is closed to notify users of its presence"
            id="8+Ezk6"
          />
          {isOpen ? (
            <RiCloseLine aria-hidden={true} className="size-5 shrink-0" />
          ) : (
            <RiArrowDownSLine aria-hidden={true} className="size-5 shrink-0" />
          )}
        </div>
      </button>
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
