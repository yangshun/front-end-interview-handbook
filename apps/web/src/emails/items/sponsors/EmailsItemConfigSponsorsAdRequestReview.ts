import { SPONSORS_SPONSOR_MANAGER_EMAIL } from '~/data/SponsorsConfig';

import type { EmailItemConfig } from '~/emails/EmailsTypes';

import EmailsTemplateSponsorsAdRequestReview from './EmailsTemplateSponsorsAdRequestReview';

export const EmailsItemConfigSponsorsAdRequestReview: EmailItemConfig<
  typeof EmailsTemplateSponsorsAdRequestReview
> = {
  component: EmailsTemplateSponsorsAdRequestReview,
  defaultProps: {
    ads: [
      {
        format: 'GLOBAL_BANNER',
        id: 'f35d89c8-7570-420d-b0b6-67873a6219f7',
        sponsorName: 'GreatFrontEnd',
        text: 'GFE',
        url: 'https://dev.greatfrontend.com/questions#framework-language',
        weeks: ['2025/12'],
      },
      {
        format: 'SPOTLIGHT',
        id: '9a334614-6e20-4fe5-9e06-cb8ecec45301',
        imageUrl: 'google.com',
        sponsorName: 'GreatFrontEnd',
        text: 'GFE',
        url: 'https://google.com',
        weeks: ['2025/12', '2025/13'],
      },
    ],
    legalName: 'GreatFrontEnd',
    requestUrl: '/advertise-with-us/request',
    signatoryName: 'John',
    signatoryTitle: 'CEO',
  },
  from: {
    email: SPONSORS_SPONSOR_MANAGER_EMAIL,
    name: 'GreatFrontEnd',
  },
  id: 'SPONSORS_AD_REQUEST_REVIEW',
  subject: ({ legalName }) => ` Advertising request submitted by ${legalName}`,
};
