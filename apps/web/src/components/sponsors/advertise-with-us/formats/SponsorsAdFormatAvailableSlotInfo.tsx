'use client';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import type { SponsorsAdFormat } from '~/components/sponsors/SponsorsTypes';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';

import SponsorsAdFormatInfo from './SponsorsAdFormatInfo';

type Props = Readonly<{
  format: SponsorsAdFormat;
}>;

const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  weekday: 'long',
});

export default function SponsorsAdFormatAvailableSlotInfo({ format }: Props) {
  const { data } = trpc.sponsorships.availability.useQuery({
    format,
  });
  const availableSlots = (data ?? [])?.filter((slot) => slot.available);

  const nextAvailableSlots = availableSlots.slice(1, 3).map((slot) => {
    const startDate = formatter.format(new Date(slot.start));
    const endDate = formatter.format(new Date(slot.end));

    return {
      key: `${startDate} - ${endDate}`,
      label: `${startDate} - ${endDate}`,
    };
  });

  return (
    <SponsorsAdFormatInfo
      addOnItem={
        // TODO(sponsors): Add action to it
        <Anchor variant="flat">
          <Text size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="See more available slots"
              description="See more available slots"
              id="PMbV3v"
            />
            {' ->'}
          </Text>
        </Anchor>
      }
      className="flex-1"
      items={nextAvailableSlots}
      title={
        availableSlots.length === 0
          ? '-'
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
