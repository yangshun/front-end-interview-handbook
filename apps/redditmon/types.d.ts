import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user: DefaultUser & {
      id: string;
      isAdmin?: boolean;
    };
  }
}
