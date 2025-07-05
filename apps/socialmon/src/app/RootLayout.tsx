'use client';

import '@mantine/core/styles.css';

import type { MantineThemeOverride } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

import GlobalProviders from '~/components/global/GlobalProviders';
import CustomToaster from '~/components/ui/CustomToaster';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;

const theme: MantineThemeOverride = {
  components: {
    Badge: {
      styles: {
        label: {
          fontWeight: 600,
        },
      },
    },
    Button: {
      styles: {
        label: {
          fontWeight: 500,
        },
      },
    },
    Tabs: {
      styles: {
        tabLabel: {
          fontWeight: 400,
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
