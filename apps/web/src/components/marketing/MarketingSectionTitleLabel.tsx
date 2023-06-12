import clsx from 'clsx';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export default function MarketingSectionTitleLabel({
  children,
  className,
}: Props) {
  return (
    <div
      className={clsx('text-brand text-sm font-semibold leading-7', className)}>
      {children}
    </div>
  );
}
