import type { Metadata } from 'next';

import '~/styles/globals.css';

import RootLayout from './RootLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export const metadata: Metadata = {
  description: 'Social moderator',
  title: 'SocialMon',
};

export default function Layout({ children }: Props) {
  return <RootLayout>{children}</RootLayout>;
}
