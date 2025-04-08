import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import { FormattedMessage, useIntl } from '~/components/intl';

export default function useInterviewsMarketingSliderTestimonials() {
  const intl = useIntl();
  const testimonials = InterviewsMarketingTestimonialsDict(intl);

  return [
    {
      ...testimonials.yugantJoshi,
      compensationMultiplier: '2x',
      offers: [
        {
          logoUrl: '/img/testimonials/company/tiktok.svg',
          name: 'TikTok',
        },
        {
          logoUrl: '/img/testimonials/company/amazon.svg',
          name: 'Amazon',
        },
        {
          logoUrl: '/img/testimonials/company/doordash.svg',
          name: 'Doordash',
        },
      ],
    },
    {
      ...testimonials.luca,
      compensationMultiplier: intl.formatMessage(
        {
          defaultMessage: '{percent}% increase',
          description: 'Compensation increase',
          id: 'PlSLy0',
        },
        { percent: 40 },
      ),
      offers: [
        {
          logoUrl: '/img/testimonials/company/atlassian.svg',
          name: 'Atlassian',
        },
        {
          logoUrl: '/img/testimonials/company/microsoft.svg',
          name: 'Microsoft',
        },
        {
          logoUrl: '/img/testimonials/company/rippling.svg',
          name: 'Rippling',
        },
        {
          logoUrl: '/img/testimonials/company/discord.svg',
          name: 'Discord',
        },
      ],
      offersLabel: (
        <FormattedMessage
          defaultMessage="{offersCount} Senior offers"
          description="Label for offers"
          id="jZ+Gw0"
          values={{ offersCount: 4 }}
        />
      ),
    },
    {
      ...testimonials.edWang,
      compensationMultiplier: null,
      offers: [
        {
          logoUrl: '/img/testimonials/company/microsoft.svg',
          name: 'Microsoft',
        },
      ],
      offersLabel: (
        <FormattedMessage
          defaultMessage="Principal-level offers"
          description="Label for offers"
          id="HkIrn9"
        />
      ),
    },
    {
      ...testimonials.lunghaoLee,
      compensationMultiplier: '4x',
      offers: [
        {
          logoUrl: '/img/testimonials/company/tiktok.svg',
          name: 'TikTok',
        },
      ],
    },
    {
      ...testimonials.locChuong,
      compensationMultiplier: '2x',
      offers: [
        {
          logoUrl: '/img/testimonials/company/amazon.svg',
          name: 'Amazon',
        },
      ],
    },
    {
      ...testimonials.fernando,
      compensationMultiplier: intl.formatMessage(
        {
          defaultMessage: '{percent}% increase',
          description: 'Compensation increase',
          id: 'PlSLy0',
        },
        { percent: 36 },
      ),
      offers: [
        {
          logoUrl: '/img/testimonials/company/meta.svg',
          name: 'Meta',
        },
        {
          logoUrl: '/img/testimonials/company/snap.svg',
          name: 'Snap',
        },
      ],
    },
    {
      ...testimonials.chenweiZhang,
      compensationMultiplier: intl.formatMessage(
        {
          defaultMessage: '{percent}% increase',
          description: 'Compensation increase',
          id: 'PlSLy0',
        },
        { percent: 30 },
      ),
      offers: [
        {
          logoUrl: '/img/testimonials/company/meta.svg',
          name: 'Meta',
        },
      ],
    },
    {
      ...testimonials.shoaibAhmed,
      compensationMultiplier: '2.2x',
      offers: [
        {
          logoUrl: '/img/testimonials/company/twilio.svg',
          name: 'Twilio',
        },
        {
          logoUrl: '/img/testimonials/company/mpokket.png',
          name: 'mPokket',
        },
      ],
    },
  ];
}
