import type { Metadata } from 'next/types';

import AuthPage from '~/components/auth/AuthPage';

import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description: 'Login to track your progress and access premium',
    pathname: '/login',
    title: 'Sign In',
  });
}

export default function LoginPage() {
  return (
    <div className="bg-gray-50">
      <AuthPage view="sign_in" />
    </div>
  );
}
