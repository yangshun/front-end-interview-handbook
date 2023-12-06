import clsx from 'clsx';

import GlobalProviders from '~/components/global/GlobalProviders';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx('antialiased')}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
