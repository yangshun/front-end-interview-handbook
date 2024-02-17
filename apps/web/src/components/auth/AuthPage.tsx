'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import SupabaseAuth from '~/components/auth/SupabaseAuth';
import Alert from '~/components/ui/Alert';
import EmptyState from '~/components/ui/EmptyState';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type { AuthViewType } from './SupabaseAuthTypes';
import Container from '../ui/Container';
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

  const searchParams = useSearchParams();
  const nextSearchParam = searchParams?.get('next');
  const sourceSearchParam = searchParams?.get('source');

  useEffect(() => {
    // TODO(auth): dedupe with AuthLoginSuccessPage.
    // Only run effect when user is logged in.
    if (user == null) {
      return;
    }

    // Redirect user to the previous page if defined and the
    // previous page is not the login page.
    const redirectPath =
      !!nextSearchParam && nextSearchParam !== window.location.pathname
        ? nextSearchParam
        : '/prepare';

    // The cookie is set on the client side, so race conditions can happen
    // where we redirect to a new page that checks for signed in status
    // on the server side but the cookie is not written yet.
    // Do a hard redirect to prevent race conditions.
    window.location.href = redirectPath;
  }, [nextSearchParam, user]);

  return (
    <Container
      className={clsx('flex flex-col gap-y-6 py-8 md:py-12 lg:py-16')}
      variant="xl">
      {!user ? (
        <>
          {error && (
            <Text color="error" display="block">
              {error.message}
            </Text>
          )}
          <SupabaseAuth
            next={nextSearchParam ?? '/prepare'}
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
                  variant="info">
                  <FormattedMessage
                    defaultMessage="Please create a free account in order to purchase the premium plans."
                    description="Content of alert requesting user to create an account to purchase premium plans"
                    id="C+WlY+"
                  />
                </Alert>
              ) : undefined
            }
            providers={['github']}
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
    </Container>
  );
}
