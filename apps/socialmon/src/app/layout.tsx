import type { Metadata } from 'next';

import RootLayout from './RootLayout';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon',
};

export default async function Layout({ children }: Props) {
  return <RootLayout>{children}</RootLayout>;
}
