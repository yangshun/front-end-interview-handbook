import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import InterviewsStudyPlanTestimonialsSlider from './InterviewsStudyPlanTestimonialsSlider';

export default function InterviewsStudyPlanTestimonialsSection() {
  const intl = useIntl();

  const overview = [
    {
      label: intl.formatMessage(
        {
          defaultMessage: '{offerCount} offers',
          description: 'Testimonials overview',
          id: 'TUW8Tm',
        },
        { offerCount: 3 },
      ),
      logos: [
        {
          name: 'Dropbox logo',
          url: '/img/company-logos/dropbox-logomark.svg',
        },
        {
          name: 'Lyft logo',
          url: '/img/company-logos/lyft-logomark.svg',
        },
        {
          name: 'Google logo',
          url: '/img/company-logos/google-logomark.svg',
        },
        {
          name: 'Airbnb logo',
          url: '/img/company-logos/airbnb-logomark.svg',
        },
      ],
      subtitle: intl.formatMessage({
        defaultMessage: 'Received after using GreatFrontEnd',
        description: 'Testimonials overview',
        id: '9qNteR',
      }),
    },
    {
      label: intl.formatMessage(
        {
          defaultMessage: '{growthFactor}x',
          description: 'Testimonials overview',
          id: 'kJoI6P',
        },
        {
          growthFactor: 4,
        },
      ),
      subtitle: intl.formatMessage({
        defaultMessage: 'Increase in total compensation',
        description: 'Testimonials overview',
        id: 'meAtoW',
      }),
    },
  ];

  return (
    <Section>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Hear it from our users"
              description="Testimonials section heading of study plans page"
              id="jZFgzW"
            />
          </Heading>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="With our study plans, many users have secured multiple offers at leading companies with substantial TC gains. You could be next."
              description="Testimonials section description of study plans page"
              id="VBLk5q"
            />
          </Text>
        </div>

        <div className="flex grid-cols-12 flex-col gap-y-6 lg:grid">
          <div className={clsx('col-span-4', 'flex items-center')}>
            <div className={clsx('flex w-full flex-row gap-y-12 lg:flex-col')}>
              {overview.map(({ label, subtitle, logos }) => (
                <div
                  key={label}
                  className={clsx('flex flex-1 items-center gap-6')}>
                  <div
                    className={clsx(
                      'h-[46px] w-0.5',
                      'rounded-3xl',
                      'bg-neutral-500',
                    )}
                  />
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-3">
                      <Text color="subtitle" size="body0" weight="bold">
                        {label}
                      </Text>

                      {logos && (
                        <div className="flex">
                          {logos.map((logo, index) => (
                            <div
                              key={logo.name}
                              className={clsx(
                                'flex items-center justify-center',
                                'size-6 shrink-0',
                                'rounded-full',
                                'overflow-hidden',
                                'bg-white',
                                'border border-white dark:border-neutral-900',
                                index !== 0 && '-ml-2',
                              )}>
                              <img
                                alt={logo.name}
                                className={clsx('size-3')}
                                decoding="async"
                                loading="lazy"
                                src={logo.url}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Text color="secondary" size="body3">
                      {subtitle}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-8">
            <InterviewsStudyPlanTestimonialsSlider />
          </div>
        </div>
      </div>
    </Section>
  );
}
