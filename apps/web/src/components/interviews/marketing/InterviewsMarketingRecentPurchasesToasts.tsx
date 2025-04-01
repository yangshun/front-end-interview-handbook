'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { RiStarSmileFill } from 'react-icons/ri';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Chip from '~/components/ui/Chip';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeGlassyBorder,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';
import { ToastClose } from '~/components/ui/Toast/Toast';

import { useUserProfile } from '../../global/UserProfileProvider';

const ONE_DAY_IN_SECONDS = 24 * 60 * 60 * 1_000;
const ONE_WEEK_IN_SECONDS = 7 * ONE_DAY_IN_SECONDS;
const MARKETING_TOAST_INDEX = 'gfe:marketing.purchases.toast.index';

function RecentPurchaseToastComponent({
  onClose,
  country,
}: Readonly<{ country: string; onClose: () => void }>) {
  const intl = useIntl();

  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden',
        'rounded-full',
        'p-3',
        'drop-shadow-sm',
        'max-w-[312px]',
        themeBackgroundColor,
        [
          themeWhiteGlowCardBackground,
          'before:-left-20 before:-top-28 before:z-[1]',
        ],
      )}>
      <div
        className={clsx(
          '!absolute inset-0 rounded-[inherit] before:m-[-1px]',
          themeGlassyBorder,
        )}
      />
      <div className={clsx('relative z-[2]', 'flex items-center')}>
        <div className="flex items-center gap-2">
          <Chip
            icon={RiStarSmileFill}
            iconClassName="!text-neutral-950 size-4"
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Premium',
              description: 'Label for premium',
              id: 'ymmDf7',
            })}
            size="sm"
            variant="primary"
          />
          <Text color="subtitle" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="Someone from {country} subscribed to <link>Premium</link> recently"
              description="Marketing toast to show that someone has subscribed"
              id="5gqGca"
              values={{
                country,
                link: (chunks) => (
                  <Anchor href="/interviews/pricing" prefetch={null}>
                    {chunks}
                  </Anchor>
                ),
              }}
            />
          </Text>
        </div>
        <ToastClose onClick={onClose} />
      </div>
    </div>
  );
}

function MarketingRecentPurchasesImpl({
  setLastShown,
}: Readonly<{
  setLastShown: (lastShown: number) => void;
}>) {
  const { showToast, dismissToast } = useToast();
  const lastToastId = useRef<string | null>(null);
  const { data } = trpc.purchases.recent.useQuery();

  const [index, setIndex] = useLocalStorage(MARKETING_TOAST_INDEX, 0);

  useEffect(() => {
    if (data == null) {
      return;
    }

    if (index >= data.length) {
      setLastShown(Date.now());

      return;
    }

    const currentPurchase = data[index];

    if (currentPurchase == null) {
      return;
    }

    // Manual dismissing because the toast may still be present
    // as Radix still shows the previous toast if it's being focused
    // or the page is blurred.
    if (lastToastId.current) {
      dismissToast(lastToastId.current);
    }

    const { id } = showToast({
      customComponent: () => (
        <RecentPurchaseToastComponent
          country={currentPurchase.country}
          onClose={() => {
            setIndex(data.length);
            setLastShown(Date.now());
          }}
        />
      ),
      duration: 8000,
      side: 'end',
      variant: 'custom',
    });

    lastToastId.current = id;

    const timer = setTimeout(() => {
      setIndex((curr) => curr + 1);
    }, 30000);

    return () => {
      clearTimeout(timer);
    };
  }, [index, data, showToast, dismissToast, setLastShown, setIndex]);

  return null;
}

export default function InterviewsMarketingRecentPurchasesToasts() {
  const { isUserProfileLoading, userProfile } = useUserProfile();
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');

  const [lastShown, setLastShown] = useLocalStorage<number | null>(
    'gfe:marketing:purchases:toast:last_shown',
    null,
  );

  if (
    isUserProfileLoading ||
    userProfile?.isInterviewsPremium ||
    isMobileAndBelow
  ) {
    return null;
  }

  if (lastShown != null) {
    const currentDate = new Date().getTime();
    const lastShownDate = new Date(lastShown).getTime();

    // If shown recently, don't show again.
    if (Math.abs(currentDate - lastShownDate) < ONE_WEEK_IN_SECONDS) {
      return null;
    }

    localStorage.removeItem(MARKETING_TOAST_INDEX);
  }

  return <MarketingRecentPurchasesImpl setLastShown={setLastShown} />;
}
