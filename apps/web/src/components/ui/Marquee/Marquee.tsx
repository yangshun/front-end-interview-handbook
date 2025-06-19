import clsx from 'clsx';
import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type Direction = 'leftToRight' | 'rightToLeft';

type Props = Readonly<{
  children: React.ReactNode;
  direction?: Direction;
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
  direction = 'rightToLeft',
  maskEdges = true,
  periodSeconds = 5,
  startEndGap,
}: Props) {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, {
    amount: 'some',
  });
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
      ref={containerRef}
      className={clsx(
        'relative flex overflow-x-auto motion-safe:overflow-x-hidden',
        maskEdges && maskClasses,
      )}>
      <div
        className={clsx(
          'whitespace-nowrap [&_>_*]:whitespace-normal',
          inView && 'motion-safe:animate-marquee will-change-transform',
        )}
        style={{
          animationDirection:
            direction === 'rightToLeft' ? 'normal' : 'reverse',
          animationDuration: `${periodSeconds}s`,
          paddingInlineEnd: reduceMotion ? 0 : startEndGap,
        }}>
        {children}
      </div>
      <div
        className={clsx(
          'absolute top-0 hidden whitespace-nowrap motion-safe:block [&_>_*]:whitespace-normal',
          inView && 'motion-safe:animate-marquee2',
        )}
        style={{
          animationDirection:
            direction === 'rightToLeft' ? 'normal' : 'reverse',
          animationDuration: `${periodSeconds}s`,
          paddingInlineEnd: reduceMotion ? 0 : startEndGap,
        }}>
        {children}
      </div>
    </div>
  );
}
