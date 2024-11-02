'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import type { InterviewsMarketingTestimonial } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialCard';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import BorderBeam from '~/components/ui/BorderBeam/BorderBeam';
import Heading from '~/components/ui/Heading';
import ScrollArea from '~/components/ui/ScrollArea';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBackgroundCardColor,
  themeBackgroundLineEmphasizedColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeWhiteGlowCardBackground,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import * as TabsPrimitive from '@radix-ui/react-tabs';

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
  return (
    <div
      className={clsx(
        'isolate overflow-hidden',
        'flex flex-col justify-between gap-3',
        'p-6',
        'rounded-lg',
        'h-[318px] md:h-[218px]',
        themeBackgroundCardColor,
        ['border', themeBorderElementColor],
        [themeWhiteGlowCardBackground, 'before:-left-10 before:-top-10'],
      )}>
      <blockquote
        className={clsx(
          'relative',
          'before:absolute before:inset-x-0 before:bottom-0',
          'before:z-[1] before:h-8',
          'before:bg-gradient-to-b before:from-[rgba(0,0,0,0)] before:to-neutral-50 before:dark:to-[#1E1E21]',
        )}>
        <ScrollArea heightClass="h-[168px] md:h-[124px]">
          <div className={clsx('pb-5 text-base font-semibold md:text-lg')}>
            "{testimonial}"
          </div>
        </ScrollArea>
      </blockquote>
      <figcaption className="flex flex-col gap-4 md:flex-row md:items-center">
        {authorThumbnailUrl && (
          <Avatar
            alt={name ?? ''}
            decoding="async"
            loading="lazy"
            size="md"
            src={authorThumbnailUrl}
          />
        )}
        <div className="flex flex-col flex-wrap gap-x-2 md:flex-row">
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
  brandSlider?: boolean;
  data: ReadonlyArray<
    Omit<InterviewsMarketingTestimonial, 'offers'> & {
      compensationMultiplier: string | null;
      offers: ReadonlyArray<{
        logoUrl: string;
        name: string;
      }>;
    }
  >;
}>;

export default function InterviewsTestimonialsSlider({
  data,
  brandSlider = true,
}: Props) {
  const intl = useIntl();
  const timer = useRef<NodeJS.Timeout>();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrentItemIndex((preIndex) => (preIndex + 1) % data.length);
    }, 10000);

    return () => {
      window.clearInterval(timer.current);
    };
  }, [data.length]);

  const dataValue = data[currentItemIndex].id;

  const overview = [
    {
      label: intl.formatMessage(
        {
          defaultMessage: '{offerCount, plural,=1 {1 offer} other {# offers}}',
          description: 'Testimonials overview',
          id: 'GUGImr',
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
          label: data[currentItemIndex].compensationMultiplier,
          subtitle: intl.formatMessage({
            defaultMessage: 'Total compensation',
            description: 'Total compensation label',
            id: 'T3WnuZ',
          }),
        }
      : null,
  ];

  const sliderNavigation = (
    <TabsPrimitive.List className="flex justify-center gap-4">
      {data.map((item) => (
        <TabsPrimitive.Trigger key={item.id} asChild={true} value={item.id}>
          <button
            aria-label={item.id}
            className={clsx(
              'h-1.5 w-12 rounded',
              item.id === dataValue
                ? brandSlider
                  ? themeBackgroundBrandColor
                  : 'bg-neutral-900 dark:bg-neutral-100'
                : 'bg-neutral-200/70 dark:bg-neutral-700',
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            )}
            type="button"
          />
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
  );

  return (
    <TabsPrimitive.Root
      className="flex w-full flex-col gap-x-6 gap-y-8 lg:flex-row lg:items-center"
      value={dataValue}
      onValueChange={(newValue) => {
        // Stop auto-advancing if user interacts with steppers.
        window.clearInterval(timer.current);
        setCurrentItemIndex(data.findIndex(({ id }) => id === newValue));
      }}>
      <div className="flex flex-col gap-6 overflow-hidden">
        <div className="relative rounded-lg">
          {data.map((item) => (
            <TabsPrimitive.Content key={item.id} value={item.id}>
              <TestimonialCard {...item} />
            </TabsPrimitive.Content>
          ))}
          <BorderBeam />
        </div>
        <div className="hidden lg:block">{sliderNavigation}</div>
      </div>
      <div
        className={clsx('w-full shrink-0 lg:w-[352px]', 'flex items-center')}>
        <div
          className={clsx(
            'flex w-full flex-col gap-y-12 md:flex-row lg:flex-col',
          )}>
          {overview
            .flatMap((item) => (item != null ? [item] : []))
            .map(({ label, subtitle, logos }) => (
              <div
                key={label}
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
                    <Heading level="heading5">{label}</Heading>
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
                                'bg-neutral-900 dark:bg-white',
                                'hover:z-[1]',
                                'border border-white dark:border-neutral-900',
                                index > 0 && '-ml-2',
                              )}>
                              <img
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
                  <Text color="subtitle" size="body1" weight="medium">
                    {subtitle}
                  </Text>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="block lg:hidden">{sliderNavigation}</div>
    </TabsPrimitive.Root>
  );
}
