import type { Metadata } from 'next/types';
import type { ContactList, LibraryResponse } from 'node-mailjet';

import EmailsUnsubscribePage from '~/components/emails/unsubscribe/EmailsUnsubscribePage';

import type { EmailsUnsubscribeFields } from '~/emails/EmailsTypes';
import { emailsContactListKeyToId } from '~/emails/mailjet/EmailsMailjetContactLists';
import MailjetClient from '~/emails/mailjet/MailjetClient';
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
  const mailjetClient = MailjetClient();
  const contactListKey = searchParams.list;
  const contactListId = emailsContactListKeyToId(contactListKey);

  const result: LibraryResponse<ContactList.GetContactListResponse> =
    await mailjetClient
      .get('contactslist', { version: 'v3' })
      .id(contactListId)
      .request();

  return (
    <EmailsUnsubscribePage
      email={decodeURIComponent(searchParams.email)}
      hash={decodeURIComponent(searchParams.hash)}
      list={contactListKey}
      listName={result.body.Data[0].Name ?? searchParams.list}
    />
  );
}
