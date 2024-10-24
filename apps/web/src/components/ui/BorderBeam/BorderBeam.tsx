import clsx from 'clsx';

type BorderBeamProps = Readonly<{
  anchor?: number;
  borderWidth?: number;
  className?: string;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  duration?: number;
  size?: number;
}>;

export default function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = '#ffaa40',
  colorTo = '#e4fe71',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]',
        // Mask styles
        '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
        // Pseudo styles
        'after:animate-border-beam after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        className,
      )}
      style={
        {
          '--anchor': anchor,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
          '--duration': duration,
          '--size': size,
        } as React.CSSProperties
      }
    />
  );
}
