import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';
import { FormattedMessage } from '~/components/intl';

export default function useInterviewsMarketingSliderTestimonials() {
  const testimonials = InterviewsMarketingTestimonialsDict();

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
      compensationMultiplier: '40% increase',
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
      compensationMultiplier: '36% increase',
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
      compensationMultiplier: '30% increase',
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
