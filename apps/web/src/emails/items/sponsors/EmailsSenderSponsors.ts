import url from 'node:url';

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
