import clsx from 'clsx';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = Readonly<{
  children: React.ReactNode;
  maskEdges?: boolean;
  periodSeconds?: number;
  // The gap in pixels between the end and the wrapped start of the marquee.
  startEndGap: number;
}>;

const maskClasses = clsx(
  'motion-safe:[mask-image:linear-gradient(90deg,_rgba(0,_0,_0,_0)_0%,_#000000_7.25%,_#000000_92.75%,_rgba(0,_0,_0,_0)_100%)]',
  'motion-safe:[-webkit-mask-image:linear-gradient(90deg,_rgba(0,_0,_0,_0)_0%,_#000000_7.25%,_#000000_92.75%,_rgba(0,_0,_0,_0)_100%)]',
);

export default function Marquee({
  children,
  maskEdges = true,
  periodSeconds = 5,
  startEndGap,
}: Props) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const reducedMotion = useReducedMotion();

  // Use effect to prevent hydration mismatch.
  useEffect(() => {
    if (reducedMotion !== null) {
      setReduceMotion(reducedMotion);
    }
  }, [reducedMotion]);

  return (
    <div
      className={clsx(
        'relative flex overflow-x-auto motion-safe:overflow-x-hidden',
        maskEdges && maskClasses,
      )}>
      <div
        className="motion-safe:animate-marquee whitespace-nowrap"
        style={{
          animationDuration: `${periodSeconds}s`,
          paddingInlineEnd: reduceMotion ? 0 : startEndGap,
        }}>
        {children}
      </div>
      <div
        aria-hidden="true"
        className="motion-safe:animate-marquee2 absolute top-0 hidden whitespace-nowrap motion-safe:block"
        style={{
          animationDuration: `${periodSeconds}s`,
          paddingInlineEnd: reduceMotion ? 0 : startEndGap,
        }}>
        {children}
      </div>
    </div>
  );
}
