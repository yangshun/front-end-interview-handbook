'use client';

import type { SponsorsAdFormat } from '@prisma/client';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import {
  sponsorsDateFormatterWithDayAndYear,
  sponsorsDateFormatterWithoutYear,
  sponsorsDateFormatterWithYear,
} from '../../SponsorsDatesUtils';
import SponsorsAdFormatAvailableSlotsDialog from './SponsorsAdFormatAvailableSlotsDialog';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';

type Props = Readonly<{
  format: SponsorsAdFormat;
}>;

const MAX_SLOTS_SHOWN_UPFRONT = 3;

export default function SponsorsAdFormatAvailableSlotInfo({ format }: Props) {
  const intl = useIntl();
  const { data, isLoading } = trpc.sponsors.availability.useQuery({
    format,
  });
  const availableSlots = (data ?? [])?.filter((slot) => slot.available);

  const nextAvailableSlots = availableSlots
    .slice(1, MAX_SLOTS_SHOWN_UPFRONT)
    .map((slot) => {
      const startDate = sponsorsDateFormatterWithoutYear.format(
        new Date(slot.start),
      );
      const endDate = sponsorsDateFormatterWithYear.format(new Date(slot.end));

      return {
        key: slot.start,
        label: `${startDate} - ${endDate}`,
      };
    });
  const formattedAvailableSlots = availableSlots.map((slot) => {
    const startDate = sponsorsDateFormatterWithDayAndYear.format(
      new Date(slot.start),
    );
    const endDate = sponsorsDateFormatterWithDayAndYear.format(
      new Date(slot.end),
    );

    return {
      key: slot.start,
      label: [startDate, endDate].join(' – '),
    };
  });

  return (
    <SponsorsAdFormatInfo
      addOnItem={
        formattedAvailableSlots.length <= MAX_SLOTS_SHOWN_UPFRONT ? null : (
          <div className="-ml-1">
            <SponsorsAdFormatAvailableSlotsDialog
              format={format}
              slots={formattedAvailableSlots}
              trigger={
                <Button
                  icon={RiArrowRightLine}
                  isDisabled={isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'See more available slots',
                    description: 'See more available slots',
                    id: 'PMbV3v',
                  })}
                  size="xs"
                  variant="tertiary"
                />
              }
            />
          </div>
        )
      }
      className="flex-1"
      items={nextAvailableSlots}
      title={
        availableSlots.length === 0
          ? intl.formatMessage({
              defaultMessage: 'None',
              description: 'No available slots',
              id: 'YYJEeq',
            })
          : `${sponsorsDateFormatterWithoutYear.format(new Date(availableSlots[0].start))}
          - ${sponsorsDateFormatterWithoutYear.format(new Date(availableSlots[0].end))}`
      }
      type="slot"
    />
  );
}
