'use client';

import clsx from 'clsx';
import { RiArrowRightSLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { SocialLinks } from '~/data/SocialLinks';

import { formatBigNumber } from '~/components/common/formatBigNumber';
import { FormattedMessage } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeMarketingHeadingSize,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

export default function MarketingCommunitySection() {
  return (
    <Container
      className={clsx('flex flex-col gap-12 lg:gap-16', 'py-16 sm:py-20')}
      tag="section"
      width="marketing">
      <div>
        <Heading className="sr-only" level="custom">
          <FormattedMessage
            defaultMessage="Community"
            description="Marketing section title"
            id="JXC5RF"
          />
        </Heading>
        <Heading
          className={clsx(
            themeMarketingHeadingSize,
            themeGradientHeading,
            'max-w-lg pb-1 xl:max-w-3xl',
            '!text-balance',
          )}
          level="custom"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="Join the community"
            description="Title for marketing page section"
            id="IHwyWr"
          />
        </Heading>
        <Text
          className={clsx(
            'w-full',
            'mt-6',
            'block',
            'text-base lg:text-lg',
            'lg:font-medium',
            'w-full',
          )}
          color="secondary"
          size="inherit"
          weight="inherit">
          <FormattedMessage
            defaultMessage="Be part of our large community of passionate Front End Engineers across the world."
            description="Marketing page section subtitle"
            id="IWhajc"
          />
        </Text>
      </div>
      <Section>
        <div className="w-full">
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {[
              SocialLinks.linkedin,
              SocialLinks.discord,
              SocialLinks.github,
              SocialLinks.x,
            ].map((platform) => {
              const { icon: Icon, name, key, href } = platform;
              const count = platform.userCount ?? 0;

              return (
                <div
                  key={key}
                  className={clsx(
                    'isolate overflow-hidden',
                    'flex flex-col items-center gap-3',
                    'p-6',
                    'rounded-lg',
                    themeBackgroundCardColor,
                    [
                      themeWhiteGlowCardBackground,
                      'before:-left-[70px] before:-top-10 before:h-[105px] before:w-[176px]',
                    ],
                  )}>
                  <div
                    className={clsx(
                      'size-full !absolute inset-0 z-[1] rounded-[inherit] before:m-[-1px]',
                      themeGlassyBorder,
                    )}
                  />
                  <Text
                    className={clsx(
                      themeGradientHeading,
                      'text-4xl md:text-5xl',
                      'font-medium',
                      'z-[2]',
                    )}
                    size="inherit"
                    weight="inherit">
                    {count ? formatBigNumber(count) : '-'}
                  </Text>
                  <Button
                    className="z-[2]"
                    href={href}
                    icon={Icon}
                    iconSecondary_USE_SPARINGLY={RiArrowRightSLine}
                    label={name}
                    size="md"
                    variant="tertiary"
                    onClick={() => {
                      gtag.event({
                        action: `contact_us.${key}.click`,
                        category: 'engagement',
                        label: platform.name,
                      });
                      logEvent('click', {
                        element: 'Social link',
                        label: name,
                        namespace: 'marketing',
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </Container>
  );
}
