import clsx from 'clsx';

import GlobalProviders from '~/components/global/GlobalProviders';

import '~/styles/globals.css';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx('antialiased')}>
        <GlobalProviders>
          <MantineProvider>
            <div className="bg-white">{children}</div>
          </MantineProvider>
        </GlobalProviders>
      </body>
    </html>
  );
}
