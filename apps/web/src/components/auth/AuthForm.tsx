import { useSearchParams } from 'next/navigation';

import { FormattedMessage, useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Text from '~/components/ui/Text';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import SupabaseAuth from './SupabaseAuth';
import type { AuthViewType } from './SupabaseAuthTypes';

import { useSessionContext } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  next?: string;
  variant?: 'compact' | 'full';
  view: AuthViewType;
}>;

export default function AuthForm({ view, variant = 'full', next }: Props) {
  const intl = useIntl();
  const { error } = useSessionContext();
  const supabaseClient = useSupabaseClientGFE();
  const searchParams = useSearchParams();
  const nextSearchParam = next || searchParams?.get('next');
  const sourceSearchParam = searchParams?.get('source');

  return (
    <>
      {error && (
        <Text className="block" color="error" size="body1">
          {error.message}
        </Text>
      )}
      <SupabaseAuth
        initialView={view}
        next={nextSearchParam || '/interviews/dashboard'}
        preBodyContents={
          nextSearchParam === '/interviews/pricing' &&
          sourceSearchParam === 'buy_now' ? (
            <Alert
              title={intl.formatMessage({
                defaultMessage: 'An account is required to purchase premium',
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
                defaultMessage: 'An account is required to start a challenge',
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
        providers={['google', 'github']}
        supabaseClient={supabaseClient}
        variant={variant}
      />
    </>
  );
}
