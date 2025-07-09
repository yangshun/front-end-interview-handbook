import clsx from 'clsx';
import type { Metadata } from 'next';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  description: 'Admin dashboard',
  title: 'GreatFrontEnd Admin',
};

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx('antialiased', 'bg-white')}>{children}</body>
    </html>
  );
}
