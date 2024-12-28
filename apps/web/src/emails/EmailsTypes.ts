import type React from 'react';

export type EmailKey =
  | 'INTERVIEWS_CHECKOUT_FIRST_TIME'
  | 'INTERVIEWS_CHECKOUT_MULTIPLE_TIMES'
  | 'INTERVIEWS_PROGRESS'
  | 'INTERVIEWS_WELCOME_EMAIL_24_HOURS'
  | 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE'
  | 'PAYMENT_FAILED';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EmailItemConfig<Component extends React.FC<any>> = Readonly<{
  component: Component;
  defaultProps: React.ComponentProps<Component>;
  from: {
    email: string;
    name: string;
  };
  id: EmailKey;
  replyTo?: {
    email: string;
    name?: string;
  };
  subject: (props: React.ComponentProps<Component>) => string;
}>;
