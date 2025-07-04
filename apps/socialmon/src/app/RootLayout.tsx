'use client';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import GlobalProviders from '~/components/global/GlobalProviders';
import CustomToaster from '~/components/ui/CustomToaster';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const theme = {
  components: {
    Button: {
      styles: {
        label: {
          fontWeight: 500,
        },
      },
    },
  },
  defaultRadius: 'md',
  headings: { fontWeight: '500' },
  primaryColor: 'violet',
};

export default function RootLayout({ children }: Props) {
  return (
    <GlobalProviders>
      <MantineProvider theme={theme}>
        {children}
        <CustomToaster />
      </MantineProvider>
    </GlobalProviders>
  );
}
