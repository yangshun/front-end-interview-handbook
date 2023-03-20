import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import LogoutPage from './LogoutPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/logout',
    title: 'Signing Out',
  });
}

export default LogoutPage;
