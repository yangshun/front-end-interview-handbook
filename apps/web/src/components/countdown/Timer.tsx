import clsx from 'clsx';

import type { TextColor } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';

import type { TimeContainerVariant } from './TimeContainer';
import TimeContainer from './TimeContainer';

function TimeSeparator() {
  return (
    <Text color="inherit" size="body2" weight="medium">
      :
    </Text>
  );
}

type Props = Readonly<{
  className?: string;
  color?: TextColor;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  variant?: TimeContainerVariant;
}>;

export default function Timer({
  className,
  color,
  days,
  hours,
  minutes,
  seconds,
  variant = 'default',
}: Props) {
  return (
    <div
      className={clsx(
        'flex items-center gap-1',
        textVariants({ color }),
        className,
      )}>
      <TimeContainer value={days} variant={variant} />
      <TimeSeparator />
      <TimeContainer value={hours} variant={variant} />
      <TimeSeparator />
      <TimeContainer value={minutes} variant={variant} />
      <TimeSeparator />
      <TimeContainer value={seconds} variant={variant} />
    </div>
  );
}
