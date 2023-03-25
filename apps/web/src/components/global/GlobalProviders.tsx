'use client';

import { I18nProvider } from 'next-i18nostic';
import nextI18nosticConfig from 'next-i18nostic/config';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';

import MDXComponents from '~/components/mdx/MDXComponents';

import type { IntlMessages } from '~/i18n';
import type { Database } from '~/supabase/database.types';

import AppContextProvider from './AppContextProvider';
import ScrollManagementProvider from './ScrollManagementProvider';
import ToastsProvider from './toasts/ToastsProvider';
import UserPreferencesProvider from './UserPreferencesProvider';
import UserProfileProvider from './UserProfileProvider';

import { MDXProvider } from '@mdx-js/react';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = Readonly<{
  children: React.ReactNode;
  countryCode: string;
  intlMessages: IntlMessages;
  locale: string;
}>;

const queryClient = new QueryClient();

Sentry.init({
  dsn: 'https://460c2fa53b094ff4a66e01209cd4b5c4@o4504898382790656.ingest.sentry.io/4504898384429056',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

export default function GlobalProviders({
  children,
  countryCode,
  intlMessages,
  locale,
}: Props) {
  // eslint-disable-next-line react/hook-use-state
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  );

  return (
    <I18nProvider locale={locale}>
      <IntlProvider
        defaultLocale={nextI18nosticConfig.defaultLocale}
        locale={locale}
        messages={intlMessages}>
        <SessionContextProvider supabaseClient={supabaseClient}>
          <AppContextProvider countryCode={countryCode}>
            <ScrollManagementProvider>
              <UserProfileProvider>
                <QueryClientProvider client={queryClient}>
                  <UserPreferencesProvider>
                    <ToastsProvider>
                      <MDXProvider components={MDXComponents}>
                        {children}
                      </MDXProvider>
                    </ToastsProvider>
                  </UserPreferencesProvider>
                </QueryClientProvider>
              </UserProfileProvider>
            </ScrollManagementProvider>
          </AppContextProvider>
        </SessionContextProvider>
      </IntlProvider>
    </I18nProvider>
  );
}
