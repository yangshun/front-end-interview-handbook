'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useInterval, useToggle } from 'usehooks-ts';

import gtag from '~/lib/gtag';
import useCountdownTimer from '~/hooks/useCountdownTime';

import { PROJECT_LAUNCH_DATE } from '~/data/FeatureFlags';

import Timer from '~/components/countdown/Timer';
import { SOCIAL_DISCOUNT_PERCENTAGE } from '~/components/promotions/social/SocialDiscountConfig';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Text from '~/components/ui/Text';

import logEvent from '~/logging/logEvent';

import { useUserPreferences } from '../UserPreferencesProvider';
import { useUserProfile } from '../UserProfileProvider';

function MarketingMessage() {
  const { userProfile } = useUserProfile();
  const isPremium = userProfile?.isPremium ?? false;

  const perpetualSaleMessage = (
    <FormattedMessage
      defaultMessage="Enjoy {discountPercentage}% off all plans by <follow>following us on social media</follow>. Check out other <promotion>promotions</promotion>!"
      description="Text on Promo Banner appearing almost on all application pages to inform user of a discount"
      id="47LloU"
      values={{
        discountPercentage: SOCIAL_DISCOUNT_PERCENTAGE,
        follow: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/rewards/social"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.rewards.click`,
                category: 'engagement',
                label: 'following us on social media',
              });
              logEvent('click', {
                element: 'Promo banner rewards',
                label: 'following us on social media',
              });
            }}>
            {chunks}
          </Anchor>
        ),
        promotion: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/promotions"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.promotions.click`,
                category: 'engagement',
                label: 'promotions',
              });
              logEvent('click', {
                element: 'Promo banner',
                label: 'Promotions',
              });
            }}>
            {chunks}
          </Anchor>
        ),
      }}
    />
  );

  const weAreHiringMessage = (
    <FormattedMessage
      defaultMessage="GreatFrontEnd is hiring! Check out our <link>jobs page</link>!"
      description="Text on Promo Banner"
      id="wfod1+"
      values={{
        link: (chunks) => (
          <Anchor
            className="whitespace-nowrap font-medium"
            href="/jobs"
            target="_blank"
            underline={true}
            variant="flat"
            onClick={() => {
              gtag.event({
                action: `global.banner.hiring.click`,
                category: 'engagement',
                label: "We're hiring contributors",
              });
              logEvent('click', {
                element: 'Promo banner',
                label: "We're hiring contributors",
              });
            }}>
            {chunks}
          </Anchor>
        ),
      }}
    />
  );

  return isPremium ? weAreHiringMessage : perpetualSaleMessage;
}

function ComingSoonCountdown({
  onClose,
}: Readonly<{
  onClose: () => void;
}>) {
  const { days, hours, minutes, seconds, finished } =
    useCountdownTimer(PROJECT_LAUNCH_DATE);

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
        color="inherit"
        size="body2"
        weight="medium">
        {bannerTextLg}
      </Text>
      <Text
        className="block sm:hidden"
        color="inherit"
        size="body2"
        weight="medium">
        {bannerTextSm}
      </Text>
      {finished === false && (
        <Timer
          color="inherit"
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
          // Dismiss the global banner on link click when counter
          // is finished as it redirects to projects homepage
          // and projects page also have global banner which is
          // currently showing the same content.
          if (finished) {
            onClose();
          }
        }}>
        <RiArrowRightLine aria-hidden={true} className="size-4 shrink-0" />
      </Anchor>
    </div>
  );
}

export default function GlobalBanner() {
  const { isUserProfileLoading } = useUserProfile();
  const { setShowGlobalBanner } = useUserPreferences();
  const [showCountdownMessage, toggleCountdownMessage] = useToggle();

  useInterval(() => {
    toggleCountdownMessage();
  }, 15000);

  return (
    <div
      className={clsx(
        'global-banner', // Non-Tailwind class. Sync with sticky.css.
        'z-sticky sticky top-0 w-full',
      )}
      data-theme="projects">
      <Banner
        className="h-9" // Sync with sticky.css.
        size="sm"
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
          <MarketingMessage />
        </span>
      </Banner>
    </div>
  );
}
