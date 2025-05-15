import clsx from 'clsx';

type OpacityRange = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;

type Props = Readonly<{
  align?: 'bottom' | 'center' | 'top';
  blurClassName?: string;
  children: React.ReactNode;
  height?: number;
  opacity?: OpacityRange;
  overlay: React.ReactNode;
  showOverlay?: boolean;
}>;

export default function BlurOverlay({
  children,
  align = 'top',
  showOverlay = false,
  overlay,
  height = 500,
  blurClassName = 'blur',
  opacity = 0.3,
}: Props) {
  if (!showOverlay) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  return (
    <div className="relative w-full">
      <div
        aria-hidden={true}
        className={clsx('h-full overflow-hidden', blurClassName)}
        style={{ height }}>
        <div
          className="h-full"
          style={{
            maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, ${opacity}), transparent)`,
          }}>
          {children}
        </div>
      </div>
      <div
        className={clsx(
          'absolute top-0 flex size-full flex-col',
          align === 'top' && 'justify-start',
          align === 'bottom' && 'justify-end',
          align === 'center' && 'justify-center',
        )}>
        {overlay}
      </div>
    </div>
  );
}
