'use client';

import { MDXProvider } from '@mdx-js/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import nextI18nosticConfig from 'next-i18nostic/config';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { useState } from 'react';

import useScrollToHash from '~/hooks/useScrollToHash';

import { IntlProvider } from '~/components/intl';
import MDXComponents from '~/components/mdx/MDXComponents';

import type { IntlMessages } from '~/i18n';
import { I18nProvider } from '~/next-i18nostic/src';
import type { Database } from '~/supabase/database.types';

import { useWriteSearchParamsToCookie } from './analytics/useWriteSearchParamsToCookie';
import AppContextProvider from './AppContextProvider';
import ColorSchemePreferencesProvider from './color-scheme/ColorSchemePreferencesProvider';
import TrpcClientProvider from './TrpcClientProvider';
import UserPreferencesProvider from './UserPreferencesProvider';
import UserProfileProvider from './UserProfileProvider';

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
  useWriteSearchParamsToCookie();

  return (
    <TrpcClientProvider>
      <I18nProvider locale={locale}>
        <IntlProvider
          defaultLocale={nextI18nosticConfig.defaultLocale}
          locale={locale}
          messages={intlMessages}>
          <NuqsAdapter>
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
          </NuqsAdapter>
        </IntlProvider>
      </I18nProvider>
    </TrpcClientProvider>
  );
}
