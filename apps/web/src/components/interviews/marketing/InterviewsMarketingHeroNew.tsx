'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

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
import { themeGradientHeading } from '~/components/ui/theme';

import type { InterviewsMarketingTestimonial } from './testimonials/InterviewsMarketingTestimonialCard';
import { QuestionCountFree } from '../questions/listings/stats/QuestionCount';
import AmazonLogo from '../../icons/AmazonLogo';
import GoogleLogo from '../../icons/GoogleLogo';
import MetaLogo from '../../icons/MetaLogo';

type Props = Readonly<{
  testimonials: ReadonlyArray<InterviewsMarketingTestimonial>;
}>;

export default function InterviewsMarketingHeroNew({ testimonials }: Props) {
  const intl = useIntl();

  return (
    <Container className={clsx('px-6 py-20', 'flex flex-col gap-12')}>
      <div className={clsx('flex flex-col gap-8', 'lg:max-w-[634px]')}>
        <Heading
          className={clsx(themeGradientHeading, 'pb-1')}
          level="heading1"
          weight="medium">
          <FormattedMessage
            defaultMessage="Don't let front end interviews hold you back"
            description="Homepage title"
            id="kKZhDV"
          />
        </Heading>
        <Text
          className="max-w-[483px] text-base lg:text-xl"
          color="secondary"
          size="inherit"
          weight="medium">
          <FormattedMessage
            defaultMessage="Meet the <strong>front end interview prep platform</strong> built to make your interviews much easier. By Big Tech ex-interviewers at"
            description="Subtitle for hero"
            id="Eel+ez"
            values={{
              strong: (chunks) => <Text color="default">{chunks}</Text>,
            }}
          />
          <GoogleLogo
            className="ms-2 inline-flex h-5"
            title={intl.formatMessage({
              defaultMessage: 'Google logo',
              description: 'Google company logo',
              id: 'da4RLj',
            })}
          />
          <AmazonLogo
            className="ms-3 mt-2 inline-flex h-5"
            title={intl.formatMessage({
              defaultMessage: 'Amazon logo',
              description: 'Amazon company logo',
              id: 'nai6YT',
            })}
          />
          <MetaLogo
            className="ms-4 inline-flex h-3.5"
            title={intl.formatMessage({
              defaultMessage: 'Meta logo',
              description: 'Meta company logo',
              id: 'a8ETQr',
            })}
          />
        </Text>
      </div>
      <div className="flex flex-col gap-x-16 gap-y-6 md:flex-row">
        <div className="flex flex-col items-start gap-4">
          <Button
            href="/prepare"
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
        <div className="flex gap-5 py-0.5">
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
          <div className="flex flex-col gap-1">
            <Text
              className="block"
              color="subtitle"
              size="body3"
              weight="medium">
              <FormattedMessage
                defaultMessage="Used by {number} engineers"
                description="Number of engineers using"
                id="zw3lia"
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
        </div>
      </div>
    </Container>
  );
}
