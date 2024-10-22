import { InterviewsMarketingTestimonialsDict } from '~/components/interviews/marketing/testimonials/InterviewsMarketingTestimonials';

export default function useInterviewsMarketingSliderTestimonials() {
  const testimonials = InterviewsMarketingTestimonialsDict();

  return [
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
