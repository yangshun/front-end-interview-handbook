import clsx from 'clsx';

import Text from '../ui/Text';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function MarketingSectionTitleLabel({
  children,
  className,
}: Props) {
  return (
    <Text
      className={clsx('block leading-7', className)}
      color="active"
      size="body2"
      weight="bold">
      {children}
    </Text>
  );
}
