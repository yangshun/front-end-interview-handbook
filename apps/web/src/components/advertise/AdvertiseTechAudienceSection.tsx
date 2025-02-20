'use client';

import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeGlassyBorder,
  themeGradientHeading,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';

export default function AdvertiseTechAudienceSection() {
  return (
    <div
      className={clsx('flex flex-col gap-y-12 lg:gap-y-16', 'py-16 sm:py-20')}>
      <div className="flex flex-col gap-6">
        <Heading
          className={clsx(
            'text-4xl sm:text-5xl',
            'sm:-tracking-3 -tracking-2',
            'max-w-3xl',
            themeGradientHeading,
          )}
          level="custom"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="Engage a large and global tech audience of front end developers"
            description="Advertise with us section title"
            id="9/9ljj"
          />
        </Heading>
        <Text
          className={clsx('tex-base lg:text-lg', 'max-w-[634px]')}
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="As a premium platform tailored for front end engineers to upskill and advance their careers, we attracted over <highlight>{activeUsersCount} active users</highlight> last year."
            description="Advertise with us section subtitle"
            id="R0oH1n"
            values={{
              activeUsersCount: '600,000',
              highlight: (chunks) => (
                <Text color="default" size="inherit" weight="inherit">
                  {chunks}
                </Text>
              ),
            }}
          />
        </Text>
      </div>
      <Asset />
    </div>
  );
}

function Asset() {
  return (
    <div
      // So that focus cannot go into the card, which is not meant to be used.
      className={clsx(
        'flex items-end justify-center',
        'relative isolate overflow-hidden',
        'h-[280px] sm:h-[400px]',
        'rounded-xl',
        themeBackgroundColor,
        [
          themeWhiteGlowCardBackground,
          'before:-left-20 before:-top-20 before:z-[1]',
        ],
      )}
      inert="">
      <div
        className={clsx(
          '!absolute inset-0 rounded-[inherit] before:m-[-1px]',
          themeGlassyBorder,
        )}
      />
      <div
        className={clsx(
          'absolute inset-1 pl-2',
          'flex items-center justify-center',
        )}>
        <img
          alt="Globe"
          className={clsx(
            'h-full w-auto object-contain md:object-cover',
            'hidden dark:block', // TODO: Find a better way to handle switching of images based on theme
          )}
          src="/img/advertise/global-tech-audience-dark.png"
        />
        <img
          alt="Globe"
          className={clsx(
            'h-full w-auto object-contain md:object-cover',
            'block dark:hidden',
          )}
          src="/img/advertise/global-tech-audience-light.png"
        />
      </div>
      <div
        className={clsx(
          'relative flex items-center gap-4 lg:gap-8',
          'mb-4 lg:mb-8',
        )}>
        {[
          {
            key: 'event-count',
            label: (
              <FormattedMessage
                defaultMessage="Event count /month"
                description="Label for event count/month"
                id="eixmPm"
              />
            ),
            value: '1.8M',
          },
          {
            key: 'views-count',
            label: (
              <FormattedMessage
                defaultMessage="Page views /month"
                description="Label for page views/month"
                id="yi/hOm"
              />
            ),
            value: '1.3M',
          },
        ].map(({ key, label, value }) => (
          <div key={key} className="text-center">
            <Heading className="text-xl lg:text-3xl" level="custom">
              {value}
            </Heading>
            <Text
              className="text-xs lg:text-sm"
              color="subtitle"
              size="inherit">
              {label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
