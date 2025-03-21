import url from 'node:url';

import {
  GREATFRONTEND_ADMIN_EMAIL,
  SPONSOR_MANAGER_EMAIL,
} from '~/data/SponsorsConfig';

import type { SponsorsAdFormatFormItem } from '~/components/sponsors/request/types';

import type { EmailRouteInternalPayload } from '~/emails/EmailsTypes';
import { getSiteOrigin } from '~/seo/siteUrl';

const apiEndpoint = url.format({
  host: getSiteOrigin(),
  pathname: '/api/emails',
  query: {
    api_route_secret: process.env.API_ROUTE_SECRET,
    'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
  },
});

export async function sendSponsorsAdRequestConfirmationEmail({
  adId,
  email,
  signatoryName,
}: Readonly<{
  adId: string;
  email: string;
  signatoryName: string;
}>) {
  const body: EmailRouteInternalPayload = {
    email,
    emailKey: 'SPONSORS_AD_REQUEST_CONFIRMATION',
    name: signatoryName,
    props: {
      name: signatoryName,
      requestUrl: url.format({
        host: getSiteOrigin({ usePreviewForDev: true }),
        pathname: `/advertise-with-us/request/${adId}`,
      }),
    },
  };

  await fetch(apiEndpoint, {
    body: JSON.stringify(body),
    method: 'POST',
  });
}

export async function sendSponsorsAdRequestReviewEmail({
  adId,
  ads,
  legalName,
  signatoryName,
  signatoryTitle,
}: Readonly<{
  adId: string;
  ads: Array<SponsorsAdFormatFormItem>;
  legalName: string;
  signatoryName: string;
  signatoryTitle: string;
}>) {
  const baseBody = {
    emailKey: 'SPONSORS_AD_REQUEST_REVIEW',
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
  } as const;
  const bodyAdmin: EmailRouteInternalPayload = {
    ...baseBody,
    email: GREATFRONTEND_ADMIN_EMAIL,
  };
  const bodyManager: EmailRouteInternalPayload = {
    ...baseBody,
    email: SPONSOR_MANAGER_EMAIL,
  };

  await Promise.all([
    fetch(apiEndpoint, {
      body: JSON.stringify(bodyAdmin),
      method: 'POST',
    }),
    fetch(apiEndpoint, {
      body: JSON.stringify(bodyManager),
      method: 'POST',
    }),
  ]);
}
