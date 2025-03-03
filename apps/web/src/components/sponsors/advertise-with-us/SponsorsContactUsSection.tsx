'use client';

import clsx from 'clsx';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeGradientHeading } from '~/components/ui/theme';

export default function SponsorsContactUsSection() {
  const intl = useIntl();

  return (
    <div className={clsx('flex flex-col gap-y-12 lg:gap-y-16', 'py-16')}>
      <div className="flex flex-col gap-6">
        <Heading
          className={clsx('max-w-3xl', themeGradientHeading)}
          level="heading2"
          tag="p"
          weight="medium">
          <FormattedMessage
            defaultMessage="Have doubts?"
            description="Advertise with us section title"
            id="yyGk2u"
          />
        </Heading>
        <div
          className={clsx(
            'flex flex-col justify-between gap-6 sm:flex-row sm:items-center',
            'text-base lg:text-lg',
          )}>
          <Text color="secondary" size="inherit" weight="medium">
            <div>
              <FormattedMessage
                defaultMessage="Simply email us at <anchor>sponsor@greatfrontend.com</anchor>."
                description="Advertise with us section subtitle"
                id="+g+A4p"
                values={{
                  anchor: (chunks) => (
                    <Anchor href="mailto:sponsor@greatfrontend.com">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            </div>
            <div>
              <FormattedMessage
                defaultMessage="We will be happy to answer any questions you might have."
                description="Advertise with us section subtitle"
                id="7aiZNf"
              />
            </div>
          </Text>
          <div className="flex gap-4">
            <Button
              className="flex-1 sm:flex-auto"
              href="mailto:sponsor@greatfrontend.com"
              label={intl.formatMessage({
                defaultMessage: 'Contact us',
                description: 'Button label for contact us',
                id: '5Gvh/t',
              })}
              size="md"
              variant="secondary"
            />
            <Button
              className="flex-1 sm:flex-auto"
              href="/advertise-with-us/request"
              label={intl.formatMessage({
                defaultMessage: 'Schedule your slots',
                description: 'Book advertising slots',
                id: 'Y/+dNC',
              })}
              size="md"
              variant="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
