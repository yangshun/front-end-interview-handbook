import clsx from 'clsx';
import type { Metadata } from 'next';

import '~/styles/globals.css';

import RootLayout from './RootLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'Socialmon',
};

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx('antialiased', 'bg-white')}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
