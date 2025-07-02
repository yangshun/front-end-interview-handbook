import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import clsx from 'clsx';

import GlobalProviders from '~/components/global/GlobalProviders';
import CustomToaster from '~/components/ui/CustomToaster';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx('antialiased')}>
        <GlobalProviders>
          <MantineProvider
            theme={{ defaultRadius: 'md', primaryColor: 'orange' }}>
            <CustomToaster />
            <div className="bg-white">{children}</div>
          </MantineProvider>
        </GlobalProviders>
      </body>
    </html>
  );
}
