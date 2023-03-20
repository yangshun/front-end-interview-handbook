import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import AffiliatePage from './AffiliatePage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Refer more users to us and earn 15% commission of the first order',
    pathname: '/affiliates',
    title: 'Affiliate Program',
  });
}

export default AffiliatePage;
