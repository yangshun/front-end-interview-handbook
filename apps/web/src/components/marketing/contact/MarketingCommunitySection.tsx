'use client';

import clsx from 'clsx';

import gtag from '~/lib/gtag';

import { SocialLinks } from '~/data/SocialLinks';

import { formatBigNumber } from '~/components/common/formatBigNumber';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeGlassyBorder,
  themeGradientHeading,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

export default function MarketingCommunitySection() {
  return (
    <Container
      className={clsx(
        'flex flex-col items-center justify-center gap-[64px] self-stretch py-20 md:items-start',
      )}>
      <div>
        <Heading
          className={clsx(
            themeGradientHeading,
            'max-w-lg pb-1 xl:max-w-3xl',
            '!text-balance',
          )}
          level="heading2"
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
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {[
              SocialLinks.linkedin,
              SocialLinks.discord,
              SocialLinks.github,
              SocialLinks.x,
            ].map((platform) => {
              const { icon: Icon, name, key, href } = platform;
              const count = platform.userCount ?? 0;

              return (
                <Anchor
                  key={key}
                  aria-label={name}
                  href={href}
                  variant="unstyled"
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
                  }}>
                  <div
                    className={clsx(
                      'flex flex-col items-center gap-3',
                      'p-6',
                      'rounded-lg',
                      'transition-colors',
                      themeGlassyBorder,
                      themeBackgroundElementEmphasizedStateColor_Hover,
                    )}>
                    <Text
                      className={clsx(
                        themeGradientHeading,
                        'text-4xl md:text-5xl',
                        'font-medium',
                      )}
                      size="inherit"
                      weight="inherit">
                      {count ? formatBigNumber(count) : '-'}
                    </Text>
                    <div className="flex items-center gap-1">
                      <Icon
                        aria-hidden={true}
                        className={clsx(
                          'size-6 shrink-0',
                          themeTextSecondaryColor,
                        )}
                      />
                    </div>
                  </div>
                </Anchor>
              );
            })}
          </div>
        </div>
      </Section>
    </Container>
  );
}
