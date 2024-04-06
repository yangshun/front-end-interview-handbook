'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import useCountdownTimer from '~/hooks/useCountdownTime';

import { PROJECT_LAUNCH_DATE } from '~/data/FeatureFlags';

import Timer from '~/components/countdown/timer/Timer';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Text from '~/components/ui/Text';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

export default function GlobalBanner() {
  const { isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();
  const { days, hours, minutes, seconds, finished } =
    useCountdownTimer(PROJECT_LAUNCH_DATE);

  function ComingSoonCountdown() {
    const bannerTextLg = finished
      ? `Our new product just launched BETA: Build real world projects with GreatFrontEnd Projects 🚀`
      : `Mystery product dropping. Coming soon in`;

    const bannerTextSm = finished
      ? `Now in BETA: GreatFrontEnd Projects 🚀`
      : `New Product in`;

    const redirectUrl = finished ? `/projects` : `/coming-soon`;

    return (
      <div className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4">
        <Text
          className="hidden sm:block"
          color="light"
          size="body2"
          weight="medium">
          {bannerTextLg}
        </Text>
        <Text
          className="block sm:hidden"
          color="light"
          size="body2"
          weight="medium">
          {bannerTextSm}
        </Text>

        {finished === false && (
          <Timer
            color="light"
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        )}
        <Anchor
          href={redirectUrl}
          variant="unstyled"
          onClick={() => {
            /**
             * Dismissing the global banner on link click when counter is finished
             * as it redirects to projects homepage
             * and projects page also have global banner which is currently showing same content
             *  */
            if (finished) {
              setShowGlobalBanner(false);
            }
          }}>
          <RiArrowRightLine aria-hidden={true} className="size-4 shrink-0" />
        </Anchor>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'global-banner', // Non-Tailwind class. Sync with globals.css.
        'z-sticky sticky top-0 w-full',
      )}
      data-theme="projects">
      <Banner
        className={clsx('h-12')} // Sync with banner.css.
        size="xs"
        variant="primary"
        onHide={() => {
          setShowGlobalBanner(false);
        }}>
        <span
          className={clsx(
            'transition-opacity duration-500',
            isUserProfileLoading ? 'opacity-0' : 'opacity-100',
          )}
          suppressHydrationWarning={true}>
          <ComingSoonCountdown />
        </span>
      </Banner>
    </div>
  );
}
