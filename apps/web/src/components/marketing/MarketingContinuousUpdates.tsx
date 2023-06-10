import clsx from 'clsx';
import { motion, useInView, useMotionValue } from 'framer-motion';
import { useId, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';

const counts: ReadonlyArray<{ label: string; value: number }> = [
  { label: '2021 Q1', value: 10 },
  { label: '2021 Q2', value: 34 },
  { label: '2021 Q3', value: 45 },
  { label: '2021 Q4', value: 56 },
  { label: '2022 Q1', value: 62 },
  { label: '2022 Q2', value: 82 },
  { label: '2022 Q3', value: 135 },
];
const maxPrice = Math.max(...counts.map(({ value }) => value));
const minValue = Math.min(...counts.map(({ value }) => value));
const chartHeight = 240;
const chartWidth = 400;

function Chart({
  activePointIndex,
  onChangeActivePointIndex,
  width: totalWidth,
  height: totalHeight,
  paddingX = 0,
  paddingY = 0,
}: Readonly<{
  activePointIndex: number | null;
  height: number;
  onChangeActivePointIndex: (index: number | null) => void;
  paddingX: number;
  paddingY: number;
  width: number;
}>) {
  const width = totalWidth - paddingX * 2;
  const height = totalHeight - paddingY * 2;

  const id = useId();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const isInView = useInView(svgRef, { amount: 0.5, once: true });
  const pathWidth = useMotionValue(0);
  const [interactionEnabled, setInteractionEnabled] = useState(false);

  let path = '';
  const points: Array<{ x: number; y: number }> = [];

  for (let index = 0; index < counts.length; index++) {
    const x = paddingX + (index / (counts.length - 1)) * width;
    const y =
      paddingY +
      (1 - (counts[index].value - minValue) / (maxPrice - minValue)) * height;

    points.push({ x, y });
    path += `${index === 0 ? 'M' : 'L'} ${x.toFixed(4)} ${y.toFixed(4)}`;
  }

  return (
    <svg
      ref={svgRef}
      className={clsx('overflow-visible')}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      {...(interactionEnabled
        ? {
            onPointerLeave: () => onChangeActivePointIndex(null),
            onPointerMove: (event) => {
              const x = event.nativeEvent.offsetX;
              let closestPointIndex = null;
              let closestDistance = Infinity;

              for (
                let pointIndex = 0;
                pointIndex < points.length;
                pointIndex++
              ) {
                const point = points[pointIndex];
                const distance = Math.abs(point.x - x);

                if (distance < closestDistance) {
                  closestDistance = distance;
                  closestPointIndex = pointIndex;
                } else {
                  break;
                }
              }
              onChangeActivePointIndex(closestPointIndex ?? null);
            },
          }
        : {})}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={`${path} V ${height + paddingY} H ${paddingX} Z`} />
        </clipPath>
        <linearGradient id={`${id}-gradient`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.rect
        clipPath={`url(#${id}-clip)`}
        fill={`url(#${id}-gradient)`}
        height={height}
        opacity="0.5"
        width={pathWidth}
        y={paddingY}
      />
      <motion.path
        ref={pathRef}
        d={path}
        fill="none"
        initial={{ pathLength: 0 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={{ duration: 1 }}
        {...(isInView ? { animate: { pathLength: 1 }, stroke: '#6366f1' } : {})}
        onAnimationComplete={() => setInteractionEnabled(true)}
        onUpdate={({ pathLength }) => {
          if (pathRef.current != null) {
            pathWidth.set(
              pathRef.current?.getPointAtLength(
                (pathLength as number) * pathRef.current?.getTotalLength(),
              ).x,
            );
          }
        }}
      />
      {activePointIndex !== null && (
        <>
          <line
            stroke="#6366f1"
            strokeDasharray="1 3"
            x1="0"
            x2={totalWidth}
            y1={points[activePointIndex].y}
            y2={points[activePointIndex].y}
          />
          <circle
            cx={points[activePointIndex].x}
            cy={points[activePointIndex].y}
            fill="#fff"
            r="4"
            stroke="#6366f1"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

export default function MarketingContinuousUpdates() {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  return (
    <div className="bg-neutral-50">
      <Container className="relative" variant="narrow">
        <div className="mx-auto grid grid-cols-1 gap-8 space-y-10 py-24 md:grid-cols-5 lg:py-40">
          <div className="mx-auto max-w-2xl md:col-span-5 lg:col-span-3 lg:mx-0 lg:max-w-prose lg:pr-24">
            <p className="text-3xl font-bold leading-8 tracking-tight text-neutral-900 sm:text-4xl md:text-4xl lg:text-5xl">
              <FormattedMessage
                defaultMessage="We're still growing our question base."
                description="Question base section title"
                id="rXnAi2"
              />
            </p>
            <p className="relative mt-10 max-w-5xl text-lg text-neutral-500 md:text-xl">
              <FormattedMessage
                defaultMessage="Our focus is currently on expanding our question base. New coding and system design questions are added to the platform on a weekly basis."
                description="Question base section subtitle - first paragraph"
                id="QJaxVF"
              />
            </p>
            <p className="relative mt-10 max-w-5xl text-lg text-neutral-500 lg:text-xl">
              <FormattedMessage
                defaultMessage="We are also looking to include more framework-specific questions like React, Vue, Angular, etc."
                description="Question base section subtitle - second paragraph"
                id="Im9sPX"
              />
            </p>
            <p className="relative mt-10 max-w-5xl text-lg text-neutral-500 lg:text-xl">
              <FormattedMessage
                defaultMessage="Please <link>leave us an email</link> if you have any other needs or wants. We would love to discuss them!"
                description="Question base section subtitle - third paragraph"
                id="jlTtgt"
                values={{
                  link: (chunks) => (
                    <Anchor
                      className="text-brand-600 hover:text-brand-500 font-medium"
                      href="mailto:contact@greatfrontend.com"
                      variant="unstyled">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            </p>
          </div>
          <div className="bg-brand-50 mt-3 hidden rounded-lg lg:col-span-2 lg:flex">
            <Chart
              activePointIndex={activePointIndex}
              height={chartHeight}
              paddingX={16}
              paddingY={32}
              width={chartWidth}
              onChangeActivePointIndex={setActivePointIndex}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
