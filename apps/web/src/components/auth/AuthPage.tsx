'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { FormattedMessage, useIntl } from 'react-intl';

import useAuthFullPageRedirectAfterLogin from '~/hooks/user/useAuthFullPageRedirectAfterLogIn';

import { INTERVIEWS_AUTH_CHANGES_AVAILABLE } from '~/data/FeatureFlags';

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

  useAuthFullPageRedirectAfterLogin(nextSearchParam);

  return (
    <Container
      className={clsx('flex flex-col gap-y-6', 'py-8 md:py-12 lg:py-16')}
      variant="xl">
      {!user ? (
        <>
          {error && (
            <Text className="block" color="error" size="body1">
              {error.message}
            </Text>
          )}
          <SupabaseAuth
            initialView={view}
            next={nextSearchParam || '/prepare'}
            preBodyContents={
              nextSearchParam === '/interviews/pricing' &&
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
              ) : sourceSearchParam === 'start_project' ? (
                <Alert
                  title={intl.formatMessage({
                    defaultMessage:
                      'An account is required to start a challenge',
                    description:
                      'Title for user to create an account before starting a project challenge',
                    id: '+aMCjd',
                  })}
                  variant="info">
                  <FormattedMessage
                    defaultMessage="Please create a free account in order to start on project challenges."
                    description="Prompting the user to create an account before starting a project challenge"
                    id="PHuc2+"
                  />
                </Alert>
              ) : undefined
            }
            providers={
              INTERVIEWS_AUTH_CHANGES_AVAILABLE
                ? ['github', 'google']
                : ['github']
            }
            socialLayout="vertical"
            supabaseClient={supabaseClient}
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
