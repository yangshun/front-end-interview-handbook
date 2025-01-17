import type React from 'react';
import { z } from 'zod';

export type EmailKey =
  | 'AUTH_EMAIL_VERIFY'
  | 'AUTH_PASSWORD_RESET'
  | 'INTERVIEWS_CHECKOUT_FIRST_TIME'
  | 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES'
  | 'INTERVIEWS_PROGRESS'
  | 'INTERVIEWS_WELCOME_EMAIL_24_HOURS'
  | 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE'
  | 'PAYMENT_FAILED';

export const EmailContactListKeyZodEnum = z.enum([
  'ANNOUNCEMENTS',
  'FEEDBACK',
  'INTERVIEWS_TIPS',
  'MARKETING',
  'NEWSLETTER',
  'PROMOTIONS',
]);

export type EmailContactListKey = z.infer<typeof EmailContactListKeyZodEnum>;

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
