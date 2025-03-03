'use client';

import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import type { SponsorsAdFormat } from '~/components/sponsors/SponsorsTypes';
import Button from '~/components/ui/Button';

import SponsorsAdFormatAvailableSlotsDialog from './SponsorsAdFormatAvailableSlotsDialog';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';
import {
  sponsorsDateFormatter,
  sponsorsDateFormatterWithDay,
  sponsorsDateFormatterWithYear,
} from '../../SponsorsDatesUtils';

type Props = Readonly<{
  format: SponsorsAdFormat;
}>;

const MAX_SLOTS_SHOWN__UPFRONT = 3;

export default function SponsorsAdFormatAvailableSlotInfo({ format }: Props) {
  const intl = useIntl();
  const { data, isLoading } = trpc.sponsorships.availability.useQuery({
    format,
  });
  const availableSlots = (data ?? [])?.filter((slot) => slot.available);

  const nextAvailableSlots = availableSlots
    .slice(1, MAX_SLOTS_SHOWN__UPFRONT)
    .map((slot) => {
      const startDate = sponsorsDateFormatterWithDay.format(
        new Date(slot.start),
      );
      const endDate = sponsorsDateFormatterWithDay.format(new Date(slot.end));

      return {
        key: slot.start,
        label: `${startDate} - ${endDate}`,
      };
    });
  const formattedAvailableSlots = availableSlots.map((slot) => {
    const startDate = sponsorsDateFormatterWithYear.format(
      new Date(slot.start),
    );
    const endDate = sponsorsDateFormatterWithYear.format(new Date(slot.end));

    return {
      key: slot.start,
      label: `${startDate} – ${endDate}`,
    };
  });

  return (
    <SponsorsAdFormatInfo
      addOnItem={
        formattedAvailableSlots.length <= MAX_SLOTS_SHOWN__UPFRONT ? null : (
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
          : sponsorsDateFormatter.format(new Date(availableSlots[0].start))
      }
      type="slot"
    />
  );
}
