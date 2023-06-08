'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SupabaseAuth from '~/components/auth/SupabaseAuth';
import Alert from '~/components/ui/Alert';
import EmptyState from '~/components/ui/EmptyState';

import { useI18nRouter } from '~/next-i18nostic/src';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type { AuthViewType } from './SupabaseAuthTypes';
import Text from '../ui/Text';

import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  view: AuthViewType;
}>;

export default function AuthPage({ view }: Props) {
  const intl = useIntl();
  const { error } = useSessionContext();
  const supabaseClient = useSupabaseClientGFE();
  const user = useUser();

  const router = useI18nRouter();
  const searchParams = useSearchParams();
  const nextSearchParam = searchParams?.get('next');
  const sourceSearchParam = searchParams?.get('source');

  useEffect(() => {
    // Only run query once user is logged in.
    if (user) {
      // Redirect user to the previous page if defined and the
      // previous page is not the login page.
      const redirectPath =
        !!nextSearchParam && nextSearchParam !== window.location.pathname
          ? nextSearchParam
          : '/prepare';

      router.push(redirectPath);
    }
  }, [nextSearchParam, router, user]);

  return (
    <div className="mx-auto max-w-lg space-y-6 bg-white px-4 py-8 sm:px-6 md:px-8 lg:py-16">
      {!user ? (
        <>
          {error && (
            <Text color="error" display="block">
              {error.message}
            </Text>
          )}
          <SupabaseAuth
            preBodyContents={
              nextSearchParam === '/pricing' &&
              sourceSearchParam === 'buy_now' ? (
                <Alert
                  title={intl.formatMessage({
                    defaultMessage:
                      'An account is required to purchase premium',
                    description:
                      'Title of alert requesting user to create an account to purchase premium plans',
                    id: 'RnHcaK',
                  })}
                  variant="success">
                  <FormattedMessage
                    defaultMessage="Please create a free account in order to purchase the premium plans."
                    description="Content of alert requesting user to create an account to purchase premium plans"
                    id="C+WlY+"
                  />
                </Alert>
              ) : undefined
            }
            providers={['github']}
            redirectTo={nextSearchParam ?? '/prepare'}
            socialLayout="horizontal"
            supabaseClient={supabaseClient}
            view={view}
          />
        </>
      ) : (
        <EmptyState
          subtitle={intl.formatMessage({
            defaultMessage: 'Logging you in...',
            description: 'Subtitle of AuthPage when logged in',
            id: 'UotwsL',
          })}
          title={intl.formatMessage(
            {
              defaultMessage: 'Hello {userEmail}!',
              description: 'Title of AuthPage when logged in',
              id: '0IALGm',
            },
            {
              userEmail: user.email,
            },
          )}
          variant="login"
        />
      )}
    </div>
  );
}
