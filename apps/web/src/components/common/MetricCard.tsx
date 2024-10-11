import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Card from '~/components/ui/Card';

import { formatBigNumber } from './formatBigNumber';
import Text from '../ui/Text';
import { themeGradientHeading, themeTextColor } from '../ui/theme';

type Props = Readonly<{
  count: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
}>;

export default function MetricCard({ label, count }: Props) {
  return (
    <Card
      className={clsx(
        'group/card',
        'relative isolate',
        'flex flex-col items-center justify-between gap-3',
        'px-6 py-6 md:px-6',
      )}
      disableBackground={true}
      padding={false}
      pattern={false}>
      <Text
        className={clsx(themeGradientHeading, 'text-4xl font-bold md:text-5xl')}
        size="inherit"
        weight="inherit">
        {count ? formatBigNumber(count) : '-'}
      </Text>
      <div className="flex items-center gap-2">
        <Text className={clsx(themeTextColor)} size="body3" weight="medium">
          {label}
        </Text>
        <RiArrowRightLine className={clsx(themeTextColor, 'size-5')} />
      </div>
    </Card>
  );
}
