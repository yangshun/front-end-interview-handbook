'use client';

import { FormattedMessage, useIntl } from '~/components/intl';
import Chip from '~/components/ui/Chip';
import Text from '~/components/ui/Text';

export default function MarketingAffiliateSteps() {
  const intl = useIntl();
  const steps = useSteps();

  return (
    <div
      aria-label={intl.formatMessage({
        defaultMessage: 'Steps',
        description: 'Affiliate steps',
        id: 'CdvNz+',
      })}>
      <ol
        className="grid grow grid-cols-1 content-start gap-8 align-top md:grid-cols-2 md:gap-12 lg:grid-cols-3"
        role="list">
        {steps.map((step, stepIdx) => (
          <li key={step.title} className="flex flex-col md:col-span-1">
            <div className="flex items-center">
              <Chip label={`${stepIdx + 1}`} variant="primary" />
              <Text
                className="block py-4 pl-4 text-2xl md:text-xl"
                weight="bold">
                {step.title}
              </Text>
            </div>
            <div className="flex grow flex-col pt-2">
              <Text className="block grow" color="secondary" size="body1">
                {step.subtitle}
              </Text>
              <div className="mt-12 flex grow">
                <img
                  alt={step.title}
                  className="m-auto block h-48"
                  src={step.imageUrl}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function useSteps() {
  const intl = useIntl();

  return [
    {
      imageUrl: '/img/affiliate/share_link.svg',
      status: 'complete',

      subtitle: intl.formatMessage({
        defaultMessage:
          'Apply to our affiliate program and obtain your unique affiliate link upon acceptance.',
        description: 'Affiliate program step subtitle',
        id: 'IZal7v',
      }),

      title: intl.formatMessage({
        defaultMessage: 'Generate your links',
        description: 'Affiliate program step',
        id: '5HkUT3',
      }),
    },
    {
      imageUrl: '/img/affiliate/social_influence.svg',
      status: 'complete',

      subtitle: intl.formatMessage({
        defaultMessage:
          'Share about GreatFrontEnd on your social media, YouTube channel, blog, etc., using your affiliate links.',
        description: 'Affiliate program step subtitle',
        id: '8zZVob',
      }),

      title: intl.formatMessage({
        defaultMessage: 'Share our offerings',
        description: 'Affiliate program step',
        id: 'sh0mp6',
      }),
    },
    {
      imageUrl: '/img/affiliate/get_remunerated.svg',
      status: 'complete',

      subtitle: (
        <FormattedMessage
          defaultMessage="A unique browser cookie will be created when users use your link to
          access our site which attributes any of their purchases to you. If
          they purchase within {days} days, we pay you <strong>{percent}%</strong> of their first order."
          description="Affiliate program step subtitle"
          id="ZrXDlv"
          values={{
            days: 7,
            percent: 15,
            strong: (chunks) => (
              <strong className="font-medium">{chunks}</strong>
            ),
          }}
        />
      ),

      title: intl.formatMessage({
        defaultMessage: 'Get remunerated',
        description: 'Affiliate program step',
        id: 'FIHdOw',
      }),
    },
  ];
}
