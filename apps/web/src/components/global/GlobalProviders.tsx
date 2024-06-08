'use client';

import nextI18nosticConfig from 'next-i18nostic/config';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import useScrollToHash from '~/hooks/useScrollToHash';

import MDXComponents from '~/components/mdx/MDXComponents';

import type { IntlMessages } from '~/i18n';
import { I18nProvider } from '~/next-i18nostic/src';
import type { Database } from '~/supabase/database.types';

import AppContextProvider from './AppContextProvider';
import ColorSchemePreferencesProvider from './color-scheme/ColorSchemePreferencesProvider';
import TrpcClientProvider from './TrpcClientProvider';
import UserPreferencesProvider from './UserPreferencesProvider';
import UserProfileProvider from './UserProfileProvider';

import { MDXProvider } from '@mdx-js/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  children: React.ReactNode;
  intlMessages: IntlMessages;
  locale: string;
}>;

export default function GlobalProviders({
  children,
  intlMessages,
  locale,
}: Props) {
  // eslint-disable-next-line react/hook-use-state
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  );

  useScrollToHash();

  return (
    <TrpcClientProvider>
      <I18nProvider locale={locale}>
        <IntlProvider
          defaultLocale={nextI18nosticConfig.defaultLocale}
          locale={locale}
          messages={intlMessages}>
          <ColorSchemePreferencesProvider>
            <SessionContextProvider supabaseClient={supabaseClient}>
              <AppContextProvider>
                <UserProfileProvider>
                  <UserPreferencesProvider>
                    <MDXProvider components={MDXComponents}>
                      {children}
                    </MDXProvider>
                  </UserPreferencesProvider>
                </UserProfileProvider>
              </AppContextProvider>
            </SessionContextProvider>
          </ColorSchemePreferencesProvider>
        </IntlProvider>
      </I18nProvider>
    </TrpcClientProvider>
  );
}