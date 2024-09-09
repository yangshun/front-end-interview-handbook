import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import { useInterviewsMarketingTestimonialsDict } from '../../../../marketing/testimonials/InterviewsMarketingTestimonials';

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
  const cardGlow =
    'relative before:absolute before:-left-10 before:-top-10 before:-z-[1] before:h-[130px] before:w-[210px] before:rounded-full before:bg-[radial-gradient(32.11%_32.11%_at_50%_50%,_#FFFFFF_0%,_#D8D8E1_100%)] before:opacity-10 before:blur-[42.0942px]';

  return (
    <div
      className={clsx(
        'isolate overflow-hidden',
        'flex flex-col gap-8',
        'p-6',
        'rounded-lg',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
        cardGlow,
      )}>
      <blockquote className={textVariants({ size: 'body2', weight: 'medium' })}>
        {testimonial}
      </blockquote>
      <figcaption className="flex items-center gap-x-4">
        {authorThumbnailUrl && (
          <Avatar
            alt={name ?? ''}
            className="size-9"
            decoding="async"
            loading="lazy"
            size="custom"
            src={authorThumbnailUrl}
          />
        )}
        <div>
          {name &&
            (() => {
              if (!authorUrl) {
                return (
                  <Text size="body2" weight="bold">
                    {name}
                  </Text>
                );
              }

              return (
                <Anchor
                  className={textVariants({
                    className: 'flex items-center gap-x-1.5',
                    size: 'body2',
                    weight: 'bold',
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
            size="body3"
            weight="medium">
            {[title, location].filter(Boolean).join(', ')}
          </Text>
        </div>
      </figcaption>
    </div>
  );
}

export default function InterviewsStudyPlanTestimonialsSlider() {
  const timer = useRef<NodeJS.Timeout>();
  const testimonials = useInterviewsMarketingTestimonialsDict();
  const [index, setIndex] = useState(0);

  const data = [testimonials.locChuong, testimonials.chenweiZhang];

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((preIndex) => (preIndex + 1) % data.length);
    }, 6000);

    return () => {
      window.clearInterval(timer.current);
    };
  }, [data.length]);

  const dataValue = data[index].id;

  return (
    <div className="w-full">
      <TabsPrimitive.Root
        className="flex flex-col gap-8"
        value={dataValue}
        onValueChange={(newValue) => {
          // Stop auto-advancing if user interacts with steppers.
          window.clearInterval(timer.current);
          setIndex(data.findIndex(({ id }) => id === newValue));
        }}>
        <div>
          {data.map((item) => (
            <TabsPrimitive.Content key={item.id} value={item.id}>
              <TestimonialCard {...item} />
            </TabsPrimitive.Content>
          ))}
        </div>
        <TabsPrimitive.List className="flex justify-center gap-4">
          {data.map((item) => (
            <TabsPrimitive.Trigger key={item.id} asChild={true} value={item.id}>
              <button
                aria-label={item.id}
                className={clsx(
                  'h-[5px] w-10 rounded',
                  item.id === dataValue
                    ? themeBackgroundBrandColor
                    : 'bg-neutral-200/70 dark:bg-neutral-700',
                  themeOutlineElement_FocusVisible,
                  themeOutlineElementBrandColor_FocusVisible,
                )}
                type="button"
              />
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </TabsPrimitive.Root>
    </div>
  );
}
