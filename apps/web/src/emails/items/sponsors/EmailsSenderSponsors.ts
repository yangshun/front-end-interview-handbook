import url from 'node:url';

import type { SponsorsAdFormatFormItem } from '~/components/sponsors/request/types';
import { SPONSOR_MANAGER_EMAIL } from '~/data/SponsorsConfig';

import { getSiteOrigin } from '~/seo/siteUrl';

const apiEndpoint = url.format({
  host: getSiteOrigin(),
  pathname: '/api/emails',
  query: {
    api_route_secret: process.env.API_ROUTE_SECRET,
  },
});

export async function sendSponsorsAdRequestSubmissionAdvertiserEmail({
  email,
  adId,
  signatoryName,
}: Readonly<{
  adId: string;
  email: string;
  signatoryName: string;
}>) {
  await fetch(apiEndpoint, {
    body: JSON.stringify({
      email,
      emailKey: 'SPONSORS_AD_REQUEST_SUBMISSION_ADVERTISER',
      name: signatoryName,
      props: {
        name: signatoryName,
        requestUrl: url.format({
          host: getSiteOrigin({ usePreviewForDev: true }),
          pathname: `/advertise-with-us/request/${adId}`,
        }),
      },
    }),
    method: 'POST',
  });
}

export async function sendSponsorsAdRequestSubmissionReviewEmail({
  signatoryName,
  signatoryTitle,
  legalName,
  ads,
  adId,
}: Readonly<{
  adId: string;
  ads: Array<SponsorsAdFormatFormItem>;
  legalName: string;
  signatoryName: string;
  signatoryTitle: string;
}>) {
  const body = {
    emailKey: 'SPONSORS_AD_REQUEST_SUBMISSION_REVIEW',
    name: 'GreatFrontEnd',
    props: {
      ads,
      legalName,
      requestUrl: url.format({
        host: getSiteOrigin({ usePreviewForDev: true }),
        pathname: `/admin/sponsorships/request/${adId}`,
      }),
      signatoryName,
      signatoryTitle,
    },
  };

  await Promise.all([
    fetch(apiEndpoint, {
      body: JSON.stringify({
        email: 'sponsor@greatfrontend.com',
        ...body,
      }),
      method: 'POST',
    }),
    fetch(apiEndpoint, {
      body: JSON.stringify({
        email: SPONSOR_MANAGER_EMAIL,
        ...body,
      }),
      method: 'POST',
    }),
  ]);
}
