'use client';

import type { SponsorsAdFormat } from '@prisma/client';
import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import { useSponsorsAdFormatData } from '~/components/sponsors/SponsorsAdFormatConfigs';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSubtitleColor } from '~/components/ui/theme';

import { sponsorsDateFormatter } from '../../SponsorsDatesUtils';

type Props = Readonly<{
  format: SponsorsAdFormat;
}>;

export default function SponsorsAdFormatHeader({ format }: Props) {
  const intl = useIntl();
  const placementData = useSponsorsAdFormatData();
  const { name, description, config } = placementData[format];

  const { data } = trpc.sponsors.availability.useQuery({
    format,
  });
  const availableSlots = (data ?? [])?.filter((slot) => slot.available);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-x-2 gap-y-6 sm:flex-row sm:items-baseline">
        <Heading
          className={clsx(
            'md:-tracking-1 md:text-3xl',
            'text-2xl',
            themeTextSubtitleColor,
          )}
          color="custom"
          level="custom"
          weight="medium">
          {name}
        </Heading>
        <Text
          className="mt-2 flex flex-wrap items-baseline gap-x-0.5"
          color="secondary"
          size="body2">
          <Text
            className="text-4xl"
            color="default"
            size="inherit"
            weight="bold">
            US${config.pricePerWeekUSD}
          </Text>
          <FormattedMessage
            defaultMessage="/week"
            description="Per week"
            id="D96Hpr"
          />
        </Text>
      </div>
      <div
        className={clsx(
          'flex flex-col justify-between sm:items-center',
          'gap-x-4 gap-y-6 sm:flex-row md:gap-x-8',
        )}>
        <Text
          className={clsx('text-base lg:text-lg lg:font-medium', 'max-w-2xl')}
          color="secondary"
          size="inherit"
          weight="inherit">
          {description}
        </Text>
        <div className="flex gap-4">
          <div className={clsx('flex flex-col items-center gap-3')}>
            <Button
              className="w-full"
              href="/advertise-with-us/request"
              label={intl.formatMessage({
                defaultMessage: 'Schedule your slots',
                description: 'Book advertising slots',
                id: 'Y/+dNC',
              })}
              size="md"
              variant="primary"
            />
            {availableSlots.length > 0 && (
              <Text color="secondary" size="body3">
                <FormattedMessage
                  defaultMessage="Next slot: {date}"
                  description="Next slot date"
                  id="dAesjD"
                  values={{
                    date: sponsorsDateFormatter.format(
                      new Date(availableSlots[0].start),
                    ),
                  }}
                />
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
