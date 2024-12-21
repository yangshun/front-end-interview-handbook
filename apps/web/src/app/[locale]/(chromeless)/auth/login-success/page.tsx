import type { Metadata } from 'next/types';

import AuthLoginSuccessPage from '~/components/auth/AuthLoginSuccessPage';

import EmailsSendStatus from '~/emails/EmailsSendStatus';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams: { next: string | null };
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/auth/login-success',
    title: intl.formatMessage({
      defaultMessage: 'Login successful',
      description: 'Title of login successful page',
      id: 'OKKVCO',
    }),
  });
}

export default async function Page({ searchParams }: Props) {
  const viewer = await readViewerFromToken();

  let shouldSendWelcomeSeriesEmail = true;

  if (viewer) {
    const sendStatusImmediate = new EmailsSendStatus(
      'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE',
      viewer.id,
    );

    shouldSendWelcomeSeriesEmail = await sendStatusImmediate.shouldSend();
  }

  return (
    <AuthLoginSuccessPage
      next={searchParams.next}
      shouldSendWelcomeSeriesEmail={shouldSendWelcomeSeriesEmail}
    />
  );
}
