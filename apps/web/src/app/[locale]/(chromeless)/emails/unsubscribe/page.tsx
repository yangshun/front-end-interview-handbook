import type { Metadata } from 'next/types';

import EmailsUnsubscribePage from '~/components/emails/unsubscribe/EmailsUnsubscribePage';

import type { EmailsUnsubscribeFields } from '~/emails/EmailsTypes';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
  searchParams: EmailsUnsubscribeFields;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/emails/unsubscribe',
    title: intl.formatMessage({
      defaultMessage: 'Email unsubscription',
      description: 'Title of email unsubcription page',
      id: 'fbNW2f',
    }),
  });
}

export default async function Page({ searchParams }: Props) {
  return (
    <EmailsUnsubscribePage
      email={decodeURIComponent(searchParams.email)}
      hash={decodeURIComponent(searchParams.hash)}
      list={searchParams.list}
    />
  );
}
