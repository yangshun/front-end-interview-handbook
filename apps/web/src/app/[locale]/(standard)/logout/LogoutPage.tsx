'use client';

import { useSearchParams } from 'next/navigation';
import { useI18nRouter } from 'next-i18nostic';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import EmptyState from '~/components/ui/EmptyState';

import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

export default function LogoutPage() {
  const supabaseClient = useSupabaseClientGFE();
  const intl = useIntl();
  const router = useI18nRouter();
  const searchParams = useSearchParams();
  const nextSearchParam = searchParams?.get('next');

  useEffect(() => {
    async function logout() {
      await supabaseClient.auth.signOut();

      // Redirect user to the previous page if defined and the
      // previous page is not the logout page.
      const redirectPath =
        !!nextSearchParam && nextSearchParam !== window.location.pathname
          ? nextSearchParam
          : '/prepare';

      // Effects are fired twice in development and will result
      // in double redirection and the second redirection will end up
      // bringing the user to the default page. Do this check so that
      // this only runs if we're on the logout page.
      if (window.location.pathname.includes('/logout')) {
        router.push(redirectPath);
      }
    }

    logout();
  }, [nextSearchParam, router, supabaseClient.auth]);

  return (
    <Container className="flex h-96 items-center justify-center">
      <EmptyState
        title={intl.formatMessage({
          defaultMessage: 'Signing out. See you again!',
          description: 'Main content of Sign Out page',
          id: 'R1ji0N',
        })}
        variant="exit"
      />
    </Container>
  );
}
