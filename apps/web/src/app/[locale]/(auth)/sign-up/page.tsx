import type { Metadata } from 'next/types';

import AuthPage from '~/components/auth/AuthPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export const dynamic = 'force-static';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Sign up for a free GreatFrontEnd account to track your progress and access premium',
      description: 'Description of Sign Up page',
      id: 'd+wYSW',
    }),
    locale,
    pathname: '/sign-up',
    title: intl.formatMessage({
      defaultMessage: 'Sign Up',
      description: 'Title of Sign Up page',
      id: 'V0hPhI',
    }),
  });
}

export default function SignUpPage() {
  return <AuthPage view="sign_up" />;
}
