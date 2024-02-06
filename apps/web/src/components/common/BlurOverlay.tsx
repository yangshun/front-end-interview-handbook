import clsx from 'clsx';

type Props = Readonly<{
  align?: 'bottom' | 'center' | 'top';
  children: React.ReactNode;
  disableOverlay?: boolean;
  maxHeight?: number;
  overlay: React.ReactNode;
}>;

export default function BlurOverlay({
  children,
  align = 'top',
  disableOverlay = false,
  overlay,
  maxHeight,
}: Props) {
  if (disableOverlay) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div className="relative w-full">
      <div aria-hidden={true} className="h-[500px] blur overflow-hidden">
        <div
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            maskImage: 'linear-gradient(to bottom, black, transparent)',
            maxHeight,
          }}>
          {children}
        </div>
      </div>
      <div
        className={clsx(
          'absolute w-full h-full flex flex-col top-0',
          align === 'top' && 'justify-start',
          align === 'bottom' && 'justify-end',
          align === 'center' && 'justify-center',
        )}>
        {overlay}
      </div>
    </div>
  );
}
