import clsx from 'clsx';
import { motion, useInView, useMotionValue } from 'motion/react';
import { useId, useRef, useState } from 'react';

import LogoMark from '~/components/global/logos/LogoMark';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Container from '~/components/ui/Container';
import {
  themeBackgroundLayerEmphasized,
  themeGlassyBorder,
  themeRadialGlowBackground,
} from '~/components/ui/theme';

import Card from '../../ui/Card';
import Heading from '../../ui/Heading';
import Text from '../../ui/Text';

const counts: ReadonlyArray<{ label: string; value: number }> = [
  { label: '2021 Q4', value: 40 },
  { label: '2022 Q1', value: 62 },
  { label: '2022 Q2', value: 82 },
  { label: '2022 Q3', value: 95 },
  { label: '2022 Q4', value: 119 },
  { label: '2023 Q1', value: 153 },
  { label: '2023 Q2', value: 203 },
];
const defaultPointIndex = counts.length - 1;
const maxPrice = Math.max(...counts.map(({ value }) => value));
const minValue = Math.min(...counts.map(({ value }) => value));
const chartHeight = 240;

// The number of extra axis lines to draw on either side of an axis.
// So that the border of the chart cannot be seen.
const chartExtraLines = 2;

function Chart({
  activePointIndex,
  onChangeActivePointIndex,
  gridSize,
  width: totalWidth,
  height: totalHeight,
  paddingX = 0,
  paddingY = 0,
}: Readonly<{
  activePointIndex: number | null;
  gridSize: number;
  height: number;
  onChangeActivePointIndex: (index: number | null) => void;
  paddingX: number;
  paddingY: number;
  width: number;
}>) {
  const currentPointIndex = activePointIndex ?? defaultPointIndex;

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
    const x = paddingX + index * gridSize;
    const y =
      paddingY +
      (1 - (counts[index].value - minValue) / (maxPrice - minValue)) * height;

    points.push({ x, y });
    path += `${index === 0 ? 'M' : 'L'} ${x.toFixed(4)} ${y.toFixed(4)}`;
  }

  return (
    <div
      className="relative block scale-[0.66] items-center md:scale-100"
      style={{
        height: totalHeight,
        width: totalWidth,
      }}>
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
          <mask id={`${id}-vignette-mask`} maskUnits="objectBoundingBox">
            <radialGradient
              cx="50%"
              cy="50%"
              fx="50%"
              fy="50%"
              id={`${id}-vignette-gradient`}
              r="80%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="20%" stopColor="white" stopOpacity="1" />
              <stop offset="80%" stopColor="black" stopOpacity="0" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
            <rect
              fill={`url(#${id}-vignette-gradient)`}
              height="150%"
              width="150%"
              x="-25%"
              y="-25%"
            />
          </mask>
          <clipPath id={`${id}-clip`}>
            <path d={`${path} V ${height + paddingY} H ${paddingX} Z`} />
          </clipPath>
          <linearGradient
            gradientTransform="rotate(180)"
            gradientUnits="userSpaceOnUse"
            id={`${id}-vertical-axis-line-gradient`}
            x1="0%"
            x2="100%"
            y1="0%"
            y2="0%">
            <stop offset="5%" stopColor="gold" />
            <stop offset="95%" stopColor="red" />
          </linearGradient>
          <linearGradient
            gradientTransform="rotate(270)"
            id={`${id}-horizontal-axis-line-gradient`}>
            <stop offset="0%" stopColor="rgba(51, 65, 85, 0.0001)" />
            <stop offset="52.62%" stopColor="#334155" />
            <stop offset="100%" stopColor="rgba(51, 65, 85, 0.0001)" />
          </linearGradient>
        </defs>
        <g mask={`url(#${id}-vignette-mask)`}>
          <motion.path
            ref={pathRef}
            d={path}
            fill="none"
            initial={{ pathLength: 0 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            transition={{ duration: 1 }}
            {...(isInView
              ? {
                  animate: { pathLength: 1 },
                  stroke: 'hsl(var(--brand-default))',
                }
              : {})}
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
          {currentPointIndex !== null && (
            <line
              stroke="white"
              x1={points[currentPointIndex].x}
              x2={points[currentPointIndex].x}
              y1={-gridSize * chartExtraLines}
              y2={totalHeight + gridSize * chartExtraLines}
            />
          )}
          {Array.from({ length: points.length + 2 * chartExtraLines }).map(
            (_, index) => {
              const x = (index - chartExtraLines) * gridSize;

              return (
                <line
                  key={x}
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth={1}
                  x1={x}
                  x2={x}
                  y1={-gridSize * chartExtraLines}
                  y2={totalHeight + gridSize * chartExtraLines}
                />
              );
            },
          )}
          {Array.from({
            length: Math.ceil(totalHeight / gridSize) + 2 * chartExtraLines,
          }).map((_, index) => {
            const y = (index - chartExtraLines) * gridSize;

            return (
              <line
                key={y}
                stroke="rgba(255, 255, 255, 0.5)"
                x1={-gridSize * chartExtraLines}
                x2={width + gridSize * chartExtraLines}
                y1={y}
                y2={y}
              />
            );
          })}
        </g>
      </svg>
      {currentPointIndex !== null && (
        <div
          className="pointer-events-none absolute"
          style={{
            left: points[currentPointIndex ?? 0]?.x - 28,
            top: points[currentPointIndex ?? 0]?.y - 28,
          }}>
          <div
            className={clsx(
              'size-14 flex items-center justify-center rounded-full',
              themeGlassyBorder,
              themeBackgroundLayerEmphasized,
            )}>
            <LogoMark />
          </div>
        </div>
      )}
    </div>
  );
}

type Props = Readonly<{
  children: React.ReactNode;
  title: string;
}>;

export default function InterviewsMarketingContinuousUpdates({
  title,
  children,
}: Props) {
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);

  const chart = (
    <Chart
      activePointIndex={activePointIndex}
      gridSize={48}
      height={chartHeight}
      paddingX={0}
      paddingY={32}
      width={48 * (counts.length - 1)}
      onChangeActivePointIndex={setActivePointIndex}
    />
  );

  return (
    <div
      className={clsx(
        'isolate rounded-t-3xl lg:mx-8 lg:rounded-t-[48px]',
        themeRadialGlowBackground,
      )}>
      <Container className="relative">
        <div className="mx-auto grid grid-cols-1 gap-8 py-24 md:grid-cols-5">
          <div className="mx-auto max-w-2xl md:col-span-5 lg:col-span-3 lg:mx-0 lg:max-w-prose lg:pr-24">
            <Heading
              className="mb-12 text-center lg:text-left"
              level="heading2">
              {title}
            </Heading>
            <div className="mb-6 lg:hidden">
              <Card
                className="flex h-[200px] items-center justify-center"
                pattern={false}>
                {chart}
              </Card>
            </div>
            {children}
            <Text
              className="relative mt-10 block max-w-5xl text-base md:text-xl"
              color="secondary">
              <FormattedMessage
                defaultMessage="Please <link>leave us an email</link> if you have any other needs or wants. We would love to discuss them!"
                description="Question base section subtitle - third paragraph"
                id="jlTtgt"
                values={{
                  link: (chunks) => (
                    <Anchor
                      className="text-brand hover:text-brand-light font-medium"
                      href="mailto:contact@greatfrontend.com"
                      variant="unstyled">
                      {chunks}
                    </Anchor>
                  ),
                }}
              />
            </Text>
          </div>
          <div className="mt-3 hidden rounded-lg lg:col-span-2 lg:flex lg:items-center">
            {chart}
          </div>
        </div>
      </Container>
    </div>
  );
}
