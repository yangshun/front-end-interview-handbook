'use client';

import { useSearchParams } from 'next/navigation';
import { useI18nRouter } from 'next-i18nostic';
import { useEffect } from 'react';

import SupabaseAuth from '~/components/auth/SupabaseAuth';
import Alert from '~/components/ui/Alert';
import EmptyState from '~/components/ui/EmptyState';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import type { AuthViewType } from './SupabaseAuthTypes';

import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  view: AuthViewType;
}>;

export default function AuthPage({ view }: Props) {
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
          {error && <p className="text-rose-500">{error.message}</p>}
          <SupabaseAuth
            preBodyContents={
              nextSearchParam === '/pricing' &&
              sourceSearchParam === 'buy_now' ? (
                <Alert
                  title="An account is required to purchase premium"
                  variant="success">
                  Please create a free account in order to purchase the premium
                  plans.
                </Alert>
              ) : undefined
            }
            providers={['github']}
            redirectTo="/prepare"
            socialLayout="horizontal"
            supabaseClient={supabaseClient}
            view={view}
          />
        </>
      ) : (
        <EmptyState
          subtitle="Logging you in..."
          title={`Hello ${user.email}!`}
          variant="login"
        />
      )}
    </div>
  );
}
