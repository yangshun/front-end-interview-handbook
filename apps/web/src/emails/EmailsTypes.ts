import type React from 'react';

export type EmailKey =
  | 'INTERVIEWS_CHECKOUT_FIRST_TIME'
  | 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES'
  | 'INTERVIEWS_PROGRESS'
  | 'INTERVIEWS_WELCOME_EMAIL_24_HOURS'
  | 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE'
  | 'PAYMENT_FAILED';

export type EmailContactListKey =
  | 'ANNOUNCEMENTS'
  | 'FEEDBACK'
  | 'INTERVIEWS_TIPS'
  | 'MARKETING'
  | 'NEWSLETTER'
  | 'PROMOTIONS';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EmailItemConfig<Component extends React.FC<any>> = Readonly<{
  component: Component;
  contactListKey?: EmailContactListKey;
  defaultProps: Omit<React.ComponentProps<Component>, 'unsub'>;
  from: {
    email: string;
    name: string;
  };
  id: EmailKey;
  replyTo?: {
    email: string;
    name?: string;
  };
  subject: (props: Omit<React.ComponentProps<Component>, 'unsub'>) => string;
}>;

export type EmailsUnsubscribeFields = Readonly<{
  email: string;
  hash: string;
  list: EmailContactListKey;
}>;
