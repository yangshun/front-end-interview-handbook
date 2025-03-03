import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import { themeDivideEmphasizeColor } from '~/components/ui/theme';

import { useSponsorsAdFormatData } from '../../SponsorsAdFormatConfigs';

import type { SponsorsAdFormat } from '@prisma/client';

type Props = Readonly<{
  format: SponsorsAdFormat;
  slots: ReadonlyArray<{
    key: string;
    label: string;
  }>;
  trigger: React.ReactNode;
}>;

export default function SponsorsAdFormatAvailableSlotsDialog({
  trigger,
  format,
  slots,
}: Props) {
  const adsData = useSponsorsAdFormatData();
  const intl = useIntl();
  const title = intl.formatMessage(
    {
      defaultMessage: '{format} - Available slots',
      description: 'Title for available slots dialog',
      id: 'y3PN6C',
    },
    { format: adsData[format].name },
  );

  return (
    <Dialog
      className="max-h-[50vh]"
      scrollable={true}
      title={title}
      trigger={trigger}
      width="screen-sm">
      <div
        className={clsx('pt-1.5', 'flex flex-col', [
          'divide-y',
          themeDivideEmphasizeColor,
        ])}>
        {slots.map((slot) => (
          <Text
            key={slot.key}
            className={clsx('py-3 first:pt-0 last:pb-0')}
            color="subtitle"
            size="body2">
            {slot.label}
          </Text>
        ))}
      </div>
    </Dialog>
  );
}
