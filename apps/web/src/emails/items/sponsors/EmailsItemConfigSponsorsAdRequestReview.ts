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
        id: 'global-banner',
        sponsorName: 'GreatFrontEnd',
        text: 'GFE',
        url: 'https://dev.greatfrontend.com/questions#framework-language',
        weeks: ['2025/12'],
      },
      {
        format: 'SPOTLIGHT',
        id: 'spotlight',
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
    email: 'hello@greatfrontend',
    name: 'GreatFrontEnd Sponsorships',
  },
  id: 'SPONSORS_AD_REQUEST_REVIEW',
  subject: ({ legalName }) => ` Advertising request submitted by ${legalName}`,
};
