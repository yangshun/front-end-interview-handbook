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
    <p
      className={clsx(
        'text-brand-500 text-sm font-semibold leading-7',
        className,
      )}>
      {children}
    </p>
  );
}
