import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import clsx from 'clsx';

import GlobalProviders from '~/components/global/GlobalProviders';
import CustomToaster from '~/components/ui/CustomToaster';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const theme = {
  defaultRadius: 'md',
  headings: { fontWeight: '500' },
  primaryColor: 'violet',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={clsx('antialiased')}>
        <GlobalProviders>
          <MantineProvider theme={theme}>
            <CustomToaster />
            <div className="bg-white">{children}</div>
          </MantineProvider>
        </GlobalProviders>
      </body>
    </html>
  );
}
