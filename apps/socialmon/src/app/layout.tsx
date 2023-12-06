import RootLayout from './RootLayout';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  return <RootLayout>{children}</RootLayout>;
}
