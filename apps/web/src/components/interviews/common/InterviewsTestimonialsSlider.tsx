'use client';

import clsx from 'clsx';
import type { PanInfo } from 'motion/react';
import { AnimatePresence, motion, wrap } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import type { InterviewsMarketingTestimonial } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialCard';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import BorderBeam from '~/components/ui/BorderBeam/BorderBeam';
import Heading from '~/components/ui/Heading';
import Img from '~/components/ui/Img';
import ScrollArea from '~/components/ui/ScrollArea';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundLineEmphasizedColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import NumberFlow from '@number-flow/react';

const carouselMotionVariants = {
  center: {
    opacity: 1,
    x: 0,
    zIndex: 1,
  },
  enter: (direction: number) => {
    return {
      opacity: 0,
      x: direction > 0 ? 1000 : -1000,
    };
  },
  exit: (direction: number) => {
    return {
      opacity: 0,
      x: direction < 0 ? 1000 : -1000,
      zIndex: 0,
    };
  },
};
const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

type TestimonialCardProps = Readonly<{
  anonymous: boolean;
  authorThumbnailUrl?: string | null;
  authorUrl?: string | null;
  id: string;
  location?: string | null;
  name?: string | null;
  testimonial: string;
  title?: string | null;
}>;

function TestimonialCard({
  testimonial,
  authorThumbnailUrl,
  name,
  authorUrl,
  title,
  location,
}: TestimonialCardProps) {
  const maskClasses = clsx(
    'motion-safe:[mask-image:linear-gradient(0deg,_rgba(0,_0,_0,_0)_0%,_#000000_20%,_#000000_100%,_rgba(0,_0,_0,_0)_100%)]',
  );

  return (
    <div
      className={clsx(
        'relative isolate overflow-hidden',
        'flex flex-col justify-between gap-6',
        'py-8',
        'rounded-lg',
        'h-[338px] sm:h-[252px] lg:h-[280px] xl:h-[252px]',
        themeBackgroundCardColor,
        ['border', themeBorderElementColor],
        [themeWhiteGlowCardBackground, 'before:-left-10 before:-top-10'],
      )}>
      <ScrollArea
        className={clsx(
          'pointer-events-none relative',
          maskClasses,
          authorThumbnailUrl ? 'mb-20 sm:mb-12' : 'mb-12 sm:mb-9',
        )}
        heightClass="h-full">
        <blockquote className={clsx('pb-8 lg:pb-4', 'px-8 sm:px-10')}>
          <Text className="pointer-events-auto block" size="body1">
            {testimonial}
          </Text>
        </blockquote>
      </ScrollArea>
      <figcaption
        className={clsx(
          'flex flex-col gap-4 sm:flex-row sm:items-center',
          'absolute bottom-0',
          'px-8 pb-8 sm:px-10',
        )}>
        {authorThumbnailUrl && (
          <Avatar
            alt={name ?? ''}
            decoding="async"
            loading="lazy"
            size="md"
            src={authorThumbnailUrl}
          />
        )}
        <div className="flex flex-col flex-wrap gap-x-2 sm:flex-row">
          {name &&
            (() => {
              if (!authorUrl) {
                return (
                  <Text size="body2" weight="medium">
                    {name}
                  </Text>
                );
              }

              return (
                <Anchor
                  className={textVariants({
                    className: 'flex items-center gap-x-1.5',
                    size: 'body2',
                    weight: 'medium',
                  })}
                  href={authorUrl}
                  variant="flat">
                  {name}
                </Anchor>
              );
            })()}
          <Text
            className="block"
            color="secondary"
            size="body2"
            weight="medium">
            {[title, location].filter(Boolean).join(', ')}
          </Text>
        </div>
      </figcaption>
    </div>
  );
}

type Props = Readonly<{
  data: ReadonlyArray<
    Omit<InterviewsMarketingTestimonial, 'offers'> & {
      compensationMultiplier: string | null;
      offers: ReadonlyArray<{
        logoUrl: string;
        name: string;
      }>;
      offersLabel?: JSX.Element;
    }
  >;
}>;

export default function InterviewsTestimonialsSlider({ data }: Props) {
  const intl = useIntl();

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const timer = useRef<NodeJS.Timeout>();
  const currentItemIndex = wrap(0, data.length, page);

  const paginate = (newDirection: number) => {
    setPage((prevPage) => prevPage + newDirection);
    setDirection(newDirection);
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      setDirection(1);
      setPage((prevPage) => prevPage + 1);
    }, 10000);

    return () => {
      window.clearInterval(timer.current);
    };
  }, [data.length]);

  const dataValue = data[currentItemIndex].id;

  const overview = [
    {
      id: 'offers',
      label:
        data[currentItemIndex]?.offersLabel ||
        intl.formatMessage(
          {
            defaultMessage:
              '{offerCount, plural, =1 {1 offer} other {# offers}}',
            description: 'Testimonials overview',
            id: 'JVjRDB',
          },
          { offerCount: data[currentItemIndex].offers.length },
        ),
      logos: data[currentItemIndex].offers,
      subtitle: intl.formatMessage({
        defaultMessage: 'Received after using GreatFrontEnd',
        description: 'Testimonials overview',
        id: '9qNteR',
      }),
    },
    data[currentItemIndex].compensationMultiplier
      ? {
          id: 'compensation',
          label: data[currentItemIndex].compensationMultiplier,
          subtitle: intl.formatMessage({
            defaultMessage: 'Increase in total compensation',
            description: 'Total compensation label',
            id: '/HgB22',
          }),
        }
      : null,
  ];

  const sliderNavigation = (
    <div className="flex justify-center gap-3">
      {data.map((item, index) => (
        <button
          key={item.id}
          aria-label={item.id}
          className="w-12 py-[5px]"
          type="button"
          onClick={() => {
            // Stop auto-advancing if user interacts with steppers.
            window.clearInterval(timer.current);

            const newDirection = index - currentItemIndex > 0 ? 1 : -1;

            setPage(index);
            setDirection(newDirection);
          }}>
          <div
            className={clsx(
              'h-1 w-full rounded',
              item.id === dataValue
                ? 'bg-neutral-900 dark:bg-neutral-100'
                : 'bg-neutral-200/70 dark:bg-neutral-700',
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            )}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex w-full grid-cols-3 flex-col gap-x-6 gap-y-8 lg:grid lg:flex-row lg:items-center">
      <div className="flex flex-col gap-[18px] overflow-hidden lg:col-span-2">
        <div
          className={clsx(
            'relative h-[338px] rounded-lg sm:h-[252px] lg:h-[280px] xl:h-[252px]',
            'isolate',
          )}>
          <BorderBeam className="z-10" />
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={page}
              animate="center"
              className="absolute"
              custom={direction}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              exit="exit"
              initial="enter"
              transition={{
                opacity: { duration: 0.2 },
                x: { damping: 30, stiffness: 300, type: 'spring' },
              }}
              variants={carouselMotionVariants}
              onDragEnd={(_: MouseEvent, { offset, velocity }: PanInfo) => {
                const swipe = swipePower(offset.x, velocity.x);

                // Stop auto-advancing if user interacts by swiping.
                if (Math.abs(swipe) > swipeConfidenceThreshold) {
                  window.clearInterval(timer.current);
                }

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}>
              <TestimonialCard {...data[currentItemIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hidden lg:block">{sliderNavigation}</div>
      </div>
      <div className={clsx('w-full lg:col-span-1', 'flex items-center')}>
        <div
          className={clsx(
            'flex w-full flex-col gap-y-6 sm:flex-row lg:flex-col',
          )}>
          {overview
            .flatMap((item) => (item != null ? [item] : []))
            .map(({ id, subtitle, logos, label }) => {
              const isString = typeof label === 'string';

              const numeralPrefixString = label.toString().match(/^\d+/)?.[0];
              const numeralPrefix = numeralPrefixString
                ? parseInt(numeralPrefixString, 10)
                : null;
              const textSuffix = label.toString().replace(/^\d+/, '');

              return (
                <div
                  key={id}
                  className={clsx('flex flex-1 items-center gap-6')}>
                  <div
                    className={clsx(
                      'h-6 w-0.5',
                      'rounded-3xl',
                      themeBackgroundLineEmphasizedColor,
                    )}
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Heading level="heading6" tag="p">
                        {isString ? (
                          <>
                            {numeralPrefix && (
                              <NumberFlow value={numeralPrefix} />
                            )}
                            {textSuffix}
                          </>
                        ) : (
                          label
                        )}
                      </Heading>
                      {logos && (
                        <div className="isolate flex">
                          {logos.map((logo, index) => (
                            <Tooltip
                              key={logo.name}
                              asChild={true}
                              label={logo.name}>
                              <div
                                className={clsx(
                                  'flex items-center justify-center',
                                  'size-8 shrink-0',
                                  'rounded-full',
                                  'overflow-hidden',
                                  'bg-white',
                                  'hover:z-[1]',
                                  'border border-neutral-200 dark:border-neutral-900',
                                  index > 0 && '-ml-2',
                                )}>
                                <Img
                                  alt={logo.name}
                                  className="size-4"
                                  decoding="async"
                                  loading="lazy"
                                  src={logo.logoUrl}
                                />
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      )}
                    </div>
                    <Text color="subtitle" size="body2" weight="medium">
                      {subtitle}
                    </Text>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="block lg:hidden">{sliderNavigation}</div>
    </div>
  );
}
