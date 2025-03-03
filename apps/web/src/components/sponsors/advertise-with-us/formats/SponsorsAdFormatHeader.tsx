'use client';

import clsx from 'clsx';
import { RiArrowRightUpLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import { useSponsorsAdFormatData } from '~/components/sponsors/SponsorsAdFormatConfigs';
import type { SponsorsAdFormat } from '~/components/sponsors/SponsorsTypes';
import Button from '~/components/ui/Button';
import Heading, { headingCVA } from '~/components/ui/Heading';
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

  const { data } = trpc.sponsorships.availability.useQuery({
    format,
  });
  const availableSlots = (data ?? [])?.filter((slot) => slot.available);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-x-2 gap-y-6 sm:flex-row">
        <Heading
          className={themeTextSubtitleColor}
          color="custom"
          level="heading4"
          weight="medium">
          {name}
        </Heading>
        <Text
          className="mt-2 flex flex-wrap items-baseline gap-x-0.5"
          color="secondary"
          size="body2">
          <Text
            className={headingCVA({
              level: 'heading3',
            })}
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
      <div className="flex flex-col justify-between gap-x-4 gap-y-6 sm:flex-row md:gap-x-8">
        <Text
          className={clsx('text-base lg:text-lg lg:font-medium', 'max-w-2xl')}
          color="secondary"
          size="inherit"
          weight="inherit">
          {description}
        </Text>
        <div className="flex gap-4">
          <Button
            className="flex flex-1 sm:hidden"
            icon={RiArrowRightUpLine}
            label={intl.formatMessage({
              defaultMessage: 'Preview',
              description: 'Label for preview button',
              id: 'zvcJI/',
            })}
            size="md"
            variant="secondary"
          />
          <div
            className={clsx(
              'flex-1 sm:flex-auto',
              'flex flex-col items-end gap-3',
            )}>
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
