import type { EmailContactListKey } from '../EmailsTypes';

type MailjetContactListID = number;
type EmailsContactLists = Record<EmailContactListKey, MailjetContactListID>;

// IDs from https://app.mailjet.com/contacts (Primary account)
const EmailsContactLists_PROD: EmailsContactLists = {
  ANNOUNCEMENTS: 150413,
  FEEDBACK: 150410,
  INTERVIEWS_TIPS: 248666,
  MARKETING: 150411,
  NEWSLETTER: 150412,
  PROMOTIONS: 150409,
};

// IDs from https://app.mailjet.com/contacts (Dev account)
const EmailsContactLists_DEV: EmailsContactLists = {
  ANNOUNCEMENTS: 10506151,
  FEEDBACK: 10506152,
  INTERVIEWS_TIPS: 10506153,
  MARKETING: 10506074,
  NEWSLETTER: 10506154,
  PROMOTIONS: 10506155,
};

export function emailsContactListKeyToId(
  emailContactListKey: EmailContactListKey,
) {
  const contactList =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? EmailsContactLists_PROD
      : EmailsContactLists_DEV;

  return contactList[emailContactListKey];
}
