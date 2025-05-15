'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';

import useAuthFullPageRedirectAfterLogin from '~/hooks/user/useAuthFullPageRedirectAfterLogIn';

import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';

import ScrollArea from '../ui/ScrollArea';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundDarkColor,
  themeBorderColor,
} from '../ui/theme';
import AuthForm from './AuthForm';
import AuthTestimonialSlider from './AuthTestimonialSlider';
import type { AuthViewType } from './SupabaseAuthTypes';

type Props = Readonly<{
  view: AuthViewType;
}>;

export default function AuthPage({ view }: Props) {
  const intl = useIntl();
  const user = useUser();

  const searchParams = useSearchParams();
  const nextSearchParam = searchParams?.get('next');

  useAuthFullPageRedirectAfterLogin(nextSearchParam);

  return (
    <div
      className={clsx(
        'flex w-full',
        '-mt-[var(--global-sticky-height)] min-h-screen',
        themeBackgroundDarkColor,
      )}>
      <div
        className={clsx(
          'w-full xl:max-w-none',
          'max-lg:px-6 xl:w-[586px]',
          'flex justify-center',
          ['xl:border-r', themeBorderColor],
          themeBackgroundCardWhiteOnLightColor,
        )}>
        <div
          className={clsx(
            'mx-auto w-full',
            'flex max-w-sm flex-col gap-y-6 xl:justify-center',
            'pb-12 pt-[calc(64px_+_var(--global-sticky-height))] lg:pt-[calc(64px_+_var(--global-sticky-height))] xl:py-12',
          )}>
          {!user ? (
            <AuthForm view={view} />
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
      </div>
      <ScrollArea
        className="hidden flex-1 pt-[var(--global-sticky-height)] xl:block"
        viewportClass={clsx(
          'h-[calc(100vh_-_var(--global-sticky-height))]',
          'flex',
        )}>
        <div
          className={clsx(
            'min-h-[calc(100vh_-_var(--global-sticky-height))] w-full',
            'flex items-center justify-center',
            'pb-[var(--global-sticky-height)]',
          )}>
          <AuthTestimonialSlider />
        </div>
      </ScrollArea>
    </div>
  );
}
