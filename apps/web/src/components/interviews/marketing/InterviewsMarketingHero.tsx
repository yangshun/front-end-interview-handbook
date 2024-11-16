'use client';

import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import FadeInSentence from '~/components/common/FadeInSentence';
import GoogleAnalyticsLogo from '~/components/icons/GoogleAnalyticsLogo';
import InterviewsMarketingTestimonialCard from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonialCard';
import { FormattedMessage, useIntl } from '~/components/intl';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { InterviewsMarketingTestimonial } from './testimonials/InterviewsMarketingTestimonialCard';
import { QuestionCountFree } from '../questions/listings/stats/QuestionCount';
import AmazonLogo from '../../icons/AmazonLogo';
import GoogleLogo from '../../icons/GoogleLogo';
import MetaLogo from '../../icons/MetaLogo';

type Props = Readonly<{
  testimonials: ReadonlyArray<InterviewsMarketingTestimonial>;
}>;

const DELAY_SECOND = 'delay-700';
const DELAY_THIRD = 'delay-1000';

export default function InterviewsMarketingHeroNew({ testimonials }: Props) {
  const intl = useIntl();
  const titleRef = useRef(null);
  const isTitleVisible = useInView(titleRef, {
    amount: 'some',
    once: true,
  });

  return (
    <Container
      className={clsx(
        'pb-10 pt-20 md:pt-[88px] xl:pt-[108px]',
        'flex flex-col gap-12',
      )}
      width="marketing">
      <div
        ref={titleRef}
        className={clsx('flex flex-col gap-8', 'md:max-w-[634px]')}>
        {/* Cannot use gradient for heading because it messes with the entrance transitions */}
        <Heading
          className={clsx(
            '-tracking-4 text-5xl md:text-6xl md:leading-[4rem]',
            themeTextColor,
          )}
          color="custom"
          level="custom"
          weight="medium">
          <FadeInSentence
            isVisible={isTitleVisible}
            sentence={intl.formatMessage({
              defaultMessage: "Don't let front end interviews hold you back",
              description: 'Homepage title',
              id: 'kKZhDV',
            })}
          />
        </Heading>
        <Text
          className={clsx(
            'max-w-[634px] text-lg md:text-xl',
            'transition-opacity',
            'duration-1000',
            DELAY_SECOND,
            isTitleVisible ? 'opacity-100' : 'opacity-0',
          )}
          color="secondary"
          size="inherit"
          weight="medium">
          <span className="me-2">
            <FormattedMessage
              defaultMessage="Meet the <strong>front end interview prep platform</strong> built to make your interviews much easier. By Big Tech ex-interviewers at"
              description="Subtitle for hero"
              id="Eel+ez"
              values={{
                strong: (chunks) => <Text color="default">{chunks}</Text>,
              }}
            />
          </span>
          <GoogleLogo
            className="me-3 inline-flex h-5"
            title={intl.formatMessage({
              defaultMessage: 'Google logo',
              description: 'Google company logo',
              id: 'da4RLj',
            })}
          />
          <AmazonLogo
            className="me-4 mt-2 inline-flex h-5"
            title={intl.formatMessage({
              defaultMessage: 'Amazon logo',
              description: 'Amazon company logo',
              id: 'nai6YT',
            })}
          />
          <MetaLogo
            className="inline-flex h-3.5"
            title={intl.formatMessage({
              defaultMessage: 'Meta logo',
              description: 'Meta company logo',
              id: 'a8ETQr',
            })}
          />
        </Text>
      </div>
      <div className="flex flex-col gap-x-16 gap-y-6 md:flex-row">
        <div
          className={clsx(
            'flex flex-col items-center gap-4',
            'transition-opacity',
            'duration-1000',
            DELAY_THIRD,
            isTitleVisible ? 'opacity-100' : 'opacity-0',
          )}>
          <Button
            href="/interviews/dashboard"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Get started now',
              description:
                'Label for Get Started button in Hero section of HomePage.',
              id: 'U0KCty',
            })}
            prefetch={null}
            size="lg"
            variant="primary"
          />
          <Text color="secondary" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="{count}+ questions are free to do"
              description="Free questions"
              id="rm432p"
              values={{
                count: QuestionCountFree,
              }}
            />
          </Text>
        </div>
        <div
          className={clsx(
            'flex flex-wrap gap-x-5 gap-y-2',
            'py-0.5',
            'transition-opacity',
            'duration-1000',
            DELAY_THIRD,
            isTitleVisible ? 'opacity-100' : 'opacity-0',
          )}>
          <div className="isolate">
            {testimonials.map((testimonial, index) => (
              <Hovercard key={testimonial.id} closeDelay={100} openDelay={0}>
                <HovercardTrigger asChild={true}>
                  <Avatar
                    alt={testimonial.name ?? ''}
                    className={clsx(
                      'size-9',
                      'border-2 border-white dark:border-neutral-900',
                      'relative',
                      'hover:z-[1]',
                      index > 0 && '-ml-2',
                    )}
                    size="custom"
                    src={testimonial.authorThumbnailUrl ?? ''}
                  />
                </HovercardTrigger>
                <HovercardPortal>
                  <HovercardContent className="max-w-md !p-0">
                    <InterviewsMarketingTestimonialCard
                      disableSpotlight={true}
                      {...testimonial}
                    />
                  </HovercardContent>
                </HovercardPortal>
              </Hovercard>
            ))}
          </div>
          <Tooltip
            asChild={true}
            label={
              <FormattedMessage
                defaultMessage="We've had {number} unique active users on our site. Verifiable by Google Analytics."
                description="Tooltip for used by engineers"
                id="5kWNqG"
                values={{
                  number: '500k+',
                }}
              />
            }>
            <div className="flex flex-col items-start gap-1.5">
              <Text
                className="block"
                color="subtitle"
                size="body3"
                weight="medium">
                <FormattedMessage
                  defaultMessage="{number} engineers already on board"
                  description="Number of engineers using"
                  id="RJqMw1"
                  values={{ number: '500k+' }}
                />
              </Text>
              <Text
                className="flex gap-1.5"
                color="secondary"
                size="body3"
                weight="medium">
                <GoogleAnalyticsLogo
                  aria-hidden={true}
                  className="size-4 shrink-0"
                />
                <FormattedMessage
                  defaultMessage="Verifiable by Google Analytics"
                  description="Number of engineers using can be verified by Google Analytics"
                  id="3tY8mQ"
                />
              </Text>
            </div>
          </Tooltip>
        </div>
      </div>
    </Container>
  );
}
