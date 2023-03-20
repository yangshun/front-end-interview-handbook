import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import PasswordResetPage from './PasswordResetPage';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    pathname: '/password/reset',
    title: 'Reset Password',
  });
}

export default PasswordResetPage;
