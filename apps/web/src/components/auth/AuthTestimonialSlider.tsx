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
import Img from '~/components/ui/Img';
import Text, { textVariants } from '~/components/ui/Text';
import { themeTextSubtitleColor } from '~/components/ui/theme';

import LogoComboMark from '../global/logos/LogoComboMark';

const TESTIMONIAL_DURATION = 30_000;

type TestimonialCardProps = Readonly<{
  anonymous: boolean;
  authorThumbnailUrl?: string | null;
  authorUrl?: string | null;
  companyLogoUrl?: string | null;
  createdAt: string;
  featuredOffer?: string | null;
  id: string;
  location?: string | null;
  name?: string | null;
  testimonial: string;
  title?: string | null;
  variant?: 'compact' | 'full';
}>;

function formatDate(
  inputDate: string, // YYYY-MM-DD format
) {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);

  return formatter.format(date);
}

function AuthTestimonialSliderCard({
  authorThumbnailUrl,
  authorUrl,
  companyLogoUrl,
  createdAt,
  featuredOffer,
  location,
  name,
  testimonial,
  title,
  variant = 'full',
}: TestimonialCardProps) {
  const intl = useIntl();

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
        className={clsx('flex flex-col gap-5 sm:flex-row sm:items-center')}>
        {authorThumbnailUrl && (
          <div className="relative">
            <Avatar
              alt={name ?? ''}
              decoding="async"
              loading="lazy"
              size="lg"
              src={authorThumbnailUrl}
            />
            {featuredOffer && companyLogoUrl && (
              <div
                className={clsx(
                  'grid place-items-center rounded-full p-1',
                  'absolute -bottom-0 -right-2',
                  'bg-white',
                )}>
                <Img
                  alt={featuredOffer}
                  className={clsx('size-4', 'object-contain')}
                  src={companyLogoUrl}
                />
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col">
          <div>
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
            <Text color="secondary" size="body1" weight="medium">
              , {[title, location].filter(Boolean).join(', ')}
            </Text>
          </div>
          <div>
            {featuredOffer && (
              <Text color="secondary" size="body2">
                {intl.formatMessage({
                  defaultMessage: 'Offer from',
                  description: 'Offer from companies',
                  id: '9R/+sv',
                })}{' '}
                <Text color="subtitle" weight="medium">
                  {featuredOffer}
                </Text>
                ,{' '}
              </Text>
            )}
            <Text color="secondary" size="body2">
              {formatDate(createdAt)}
            </Text>
          </div>
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
  const marketingTestimonials = InterviewsMarketingTestimonialsDict(intl);
  const [authTestimonials, setAuthTestimonials] = useState(() =>
    shuffle([
      marketingTestimonials.tylerHoldren,
      marketingTestimonials.jessieShen,
      marketingTestimonials.praveenKumar,
      marketingTestimonials.faithMorante,
      marketingTestimonials.anubhavKhanna,
      marketingTestimonials.lamTran,
      marketingTestimonials.cliffordFung,
      marketingTestimonials.yugantJoshi,
      marketingTestimonials.deannaTran,
      marketingTestimonials.locChuong,
      marketingTestimonials.edWang,
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
          <AuthTestimonialSliderCard
            {...authTestimonials[currentIndex]}
            variant={variant}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
