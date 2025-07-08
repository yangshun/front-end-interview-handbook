import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { shuffle } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Divider from '~/components/ui/Divider';
import { headingCVA } from '~/components/ui/Heading';
import Text, { textVariants } from '~/components/ui/Text';
import { themeTextSubtitleColor } from '~/components/ui/theme';

import LogoComboMark from '../global/logos/LogoComboMark';

const TESTIMONIAL_DURATION = 30_000;

type TestimonialCardProps = Readonly<{
  anonymous: boolean;
  authorThumbnailUrl?: string | null;
  authorUrl?: string | null;
  id: string;
  location?: string | null;
  name?: string | null;
  testimonial: string;
  title?: string | null;
  variant?: 'compact' | 'full';
}>;

function TestimonialCard({
  authorThumbnailUrl,
  authorUrl,
  location,
  name,
  testimonial,
  title,
  variant = 'full',
}: TestimonialCardProps) {
  return (
    <div className={clsx('flex flex-col justify-between gap-6')}>
      <div className={clsx('flex items-center gap-4', themeTextSubtitleColor)}>
        <LogoComboMark height={20} />
        <Divider
          className={clsx('h-3.5 shrink-0')}
          color="emphasized"
          direction="vertical"
        />
        <Text color="inherit" size="body2" weight="bold">
          Interviews
        </Text>
      </div>
      <blockquote
        className={
          variant === 'full'
            ? headingCVA({
                level: 'heading6',
                weight: 'medium',
              })
            : textVariants({
                color: 'subtitle',
                size: 'body0',
                weight: 'medium',
              })
        }>
        {testimonial}
      </blockquote>
      <figcaption
        className={clsx('flex flex-col gap-4 sm:flex-row sm:items-center')}>
        {authorThumbnailUrl && (
          <Avatar
            alt={name ?? ''}
            decoding="async"
            loading="lazy"
            size="lg"
            src={authorThumbnailUrl}
          />
        )}
        <div
          className={clsx(
            'flex gap-x-2 gap-y-0.5',
            variant === 'full' ? 'flex-row flex-wrap' : 'flex-col',
          )}>
          {name &&
            (() => {
              if (!authorUrl) {
                return (
                  <Text size="body1" weight="medium">
                    {name}
                  </Text>
                );
              }

              return (
                <Anchor
                  className={textVariants({
                    size: 'body1',
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
            size="body1"
            weight="medium">
            {[title, location].filter(Boolean).join(', ')}
          </Text>
        </div>
      </figcaption>
    </div>
  );
}

type Props = Readonly<{
  variant?: 'compact' | 'full';
}>;

export default function AuthTestimonialSlider({ variant = 'full' }: Props) {
  const intl = useIntl();
  const testimonials = InterviewsMarketingTestimonialsDict(intl);
  const [authTestimonials, setAuthTestimonials] = useState(() =>
    shuffle([
      testimonials.cliffordFung,
      testimonials.yugantJoshi,
      testimonials.deannaTran,
      testimonials.locChuong,
      testimonials.edWang,
      testimonials.lunghaoLee,
    ]),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;

        if (nextIndex >= authTestimonials.length) {
          // Reshuffle after all testimonials have been shown
          setAuthTestimonials(shuffle(authTestimonials));

          return 0;
        }

        return nextIndex;
      });
    }, TESTIMONIAL_DURATION);

    return () => {
      window.clearInterval(timer.current);
    };
  }, [authTestimonials]);

  return (
    <div className="w-full max-w-[515px] overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={authTestimonials[currentIndex].id}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}>
          <TestimonialCard
            {...authTestimonials[currentIndex]}
            variant={variant}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
