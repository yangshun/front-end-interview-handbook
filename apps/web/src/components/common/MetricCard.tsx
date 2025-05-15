import clsx from 'clsx';

import Card from '~/components/ui/Card';

import Text from '../ui/Text';
import { themeBackgroundChipColor, themeTextSecondaryColor } from '../ui/theme';
import { formatBigNumber } from './formatBigNumber';

type Props = Readonly<{
  count: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
}>;

export default function MetricCard({ icon: Icon, label, count }: Props) {
  return (
    <Card
      className={clsx(
        'group/card',
        'relative isolate',
        'flex flex-col items-start justify-between gap-3',
        'px-4 py-4 md:px-6',
      )}
      padding={false}>
      <div className="flex items-center gap-2">
        <span
          className={clsx(
            'size-9 hidden items-center justify-center rounded-md md:inline-flex',
            themeBackgroundChipColor,
            themeTextSecondaryColor,
            'border border-transparent transition',
            'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
            'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
          )}>
          <Icon aria-hidden={true} className="size-5" />
        </span>
        <Text color="secondary" size="body2" weight="medium">
          {label}
        </Text>
      </div>
      <Text
        className="text-4xl font-bold md:text-5xl"
        size="inherit"
        weight="inherit">
        {count ? formatBigNumber(count) : '-'}
      </Text>
    </Card>
  );
}
