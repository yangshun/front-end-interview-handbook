'use client';

import { useSessionContext } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useRef } from 'react';
import { useSessionStorage } from 'usehooks-ts';
import { useMediaQuery } from 'usehooks-ts';

import { useToast } from '~/components/global/toasts/useToast';

import { useI18nPathname } from '~/next-i18nostic/src';

import AuthOneClickSignupCard from './AuthOneClickSignupCard';

const POPUP_DURATION = 15_000;
const TOAST_DURATION = 60 * 60 * 1000; // 1 hour

export default function AuthOneClickSignup() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { pathname } = useI18nPathname();
  const lastToastId = useRef<string | null>(null);
  const { showToast, dismissToast } = useToast();

  const { isLoading: isUserLoading, session } = useSessionContext();
  const [dismissedSignUpPrompt, setDismissedSignUpPrompt] =
    useSessionStorage<boolean>('gfe:auth:sign-up-prompt', false);

  // Don't show it on homepage
  const isHomepage = pathname === '/' || pathname === '/projects';

  const handleClose = useCallback(() => {
    setDismissedSignUpPrompt(true);
  }, [setDismissedSignUpPrompt]);

  useEffect(() => {
    if (
      session ||
      isUserLoading ||
      dismissedSignUpPrompt ||
      isHomepage ||
      isMobile
    ) {
      if (lastToastId.current) {
        dismissToast(lastToastId.current);
      }

      return;
    }

    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      const { id } = showToast({
        animateFrom: 'bottom',
        customComponent: () => <AuthOneClickSignupCard onClose={handleClose} />,
        duration: TOAST_DURATION,
        side: 'end',
        variant: 'custom',
      });

      lastToastId.current = id;
    }, POPUP_DURATION);

    return () => {
      if (lastToastId.current) {
        dismissToast(lastToastId.current);
      }
      clearTimeout(timer);
    };
  }, [
    session,
    isUserLoading,
    dismissedSignUpPrompt,
    isHomepage,
    showToast,
    handleClose,
    dismissToast,
    isMobile,
  ]);

  return null;
}
