import type { Metadata } from 'next/types';

import AuthPage from '~/components/auth/AuthPage';

import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return defaultMetadata({
    description:
      'Sign up for a free GreatFrontEnd account to track your progress and access premium',
    pathname: '/sign-up',
    title: 'Sign Up',
  });
}

export default function SignUpPage() {
  return (
    <div className="bg-gray-50">
      <AuthPage view="sign_up" />
    </div>
  );
}
