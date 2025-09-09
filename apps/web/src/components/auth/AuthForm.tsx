import { useSessionContext } from '@supabase/auth-helpers-react';
import { useSearchParams } from 'next/navigation';

import { FormattedMessage, useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Text from '~/components/ui/Text';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import SupabaseAuth from './SupabaseAuth';
import type { AuthViewType } from './SupabaseAuthTypes';

type Props = Readonly<{
  variant?: 'compact' | 'full';
  view: AuthViewType;
}>;

export default function AuthForm({ variant = 'full', view }: Props) {
  const intl = useIntl();
  const { error } = useSessionContext();
  const supabaseClient = useSupabaseClientGFE();
  const searchParams = useSearchParams();
  const nextSearchParam = searchParams?.get('next');
  const sourceSearchParam = searchParams?.get('source');

  const alertContent = {
    bookmark_now: {
      content: (
        <FormattedMessage
          defaultMessage="Please log in before bookmarking questions."
          description="Prompting the user to create an account before bookmarking questions"
          id="jABwfZ"
        />
      ),
      title: intl.formatMessage({
        defaultMessage: 'An account is required to bookmark questions',
        description:
          'Title for user to create an account before bookmarking questions',
        id: 'r5PQJU',
      }),
    },
    buy_now: {
      content: (
        <FormattedMessage
          defaultMessage="Please create a free account in order to purchase the premium plans."
          description="Content of alert requesting user to create an account to purchase premium plans"
          id="C+WlY+"
        />
      ),
      title: intl.formatMessage({
        defaultMessage: 'An account is required to purchase premium',
        description:
          'Title of alert requesting user to create an account to purchase premium plans',
        id: 'RnHcaK',
      }),
    },
    start_project: {
      content: (
        <FormattedMessage
          defaultMessage="Please create a free account in order to start on project challenges."
          description="Prompting the user to create an account before starting a project challenge"
          id="PHuc2+"
        />
      ),
      title: intl.formatMessage({
        defaultMessage: 'An account is required to start a challenge',
        description:
          'Title for user to create an account before starting a project challenge',
        id: '+aMCjd',
      }),
    },
  };

  const { content: alertBody, title: alertTitle } =
    alertContent[sourceSearchParam as keyof typeof alertContent] || {};

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
          (nextSearchParam === '/interviews/pricing' &&
            sourceSearchParam === 'buy_now') ||
          sourceSearchParam === 'start_project' ||
          sourceSearchParam === 'bookmark_now' ? (
            <Alert title={alertTitle} variant="info">
              {alertBody}
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
