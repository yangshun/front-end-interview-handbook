import type { Metadata } from 'next/types';

import AuthLoginSuccessPage from '~/components/auth/AuthLoginSuccessPage';

import { emailTrackRedisKey } from '~/emails/emailUtils';
import { getIntlServerOnly } from '~/i18n';
import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

import { Redis } from '@upstash/redis';

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

  let welcomeSeriesEmailSent = false;

  if (viewer) {
    const redis = Redis.fromEnv();
    const welcomeEmailImmediateRedisKey = emailTrackRedisKey(
      viewer.id,
      MAILJET_TEMPLATE.welcomeEmailImmediate.name,
    );

    const welcomeEmailImmediateRedisValue = await redis.get(
      welcomeEmailImmediateRedisKey,
    );

    welcomeSeriesEmailSent = welcomeEmailImmediateRedisValue === 'SENT';
  }

  return (
    <AuthLoginSuccessPage
      next={searchParams.next}
      welcomeSeriesEmailSent={welcomeSeriesEmailSent}
    />
  );
}
