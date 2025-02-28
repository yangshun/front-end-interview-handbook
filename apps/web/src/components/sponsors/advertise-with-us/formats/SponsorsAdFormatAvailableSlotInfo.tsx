'use client';

import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import type { SponsorsAdFormat } from '~/components/sponsors/SponsorsTypes';
import Button from '~/components/ui/Button';

import SponsorsAdFormatAvailableSlotsDialog from './SponsorsAdFormatAvailableSlotsDialog';
import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';

type Props = Readonly<{
  format: SponsorsAdFormat;
}>;

const formatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  weekday: 'long',
});

const formatterWithYear = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  weekday: 'long',
  year: 'numeric',
});

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
      const startDate = formatter.format(new Date(slot.start));
      const endDate = formatter.format(new Date(slot.end));

      return {
        key: slot.start,
        label: `${startDate} - ${endDate}`,
      };
    });
  const formattedAvailableSlots = availableSlots.map((slot) => {
    const startDate = formatterWithYear.format(new Date(slot.start));
    const endDate = formatterWithYear.format(new Date(slot.end));

    return {
      key: slot.start,
      label: `${startDate} - ${endDate}`,
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
          ? '–'
          : Intl.DateTimeFormat('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(new Date(availableSlots[0].start))
      }
      type="slot"
    />
  );
}
