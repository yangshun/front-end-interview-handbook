'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import { useI18nPathname } from '~/next-i18nostic/src';

import AuthOneClickSignupCard from './AuthOneClickSignupCard';

import { useSessionContext } from '@supabase/auth-helpers-react';

export default function AuthOneClickSignup() {
  const { pathname } = useI18nPathname();

  const { isLoading: isUserLoading, session } = useSessionContext();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedSignUpPrompt, setDismissedSignUpPrompt] =
    useSessionStorage<boolean>('gfe:auth:sign-up-prompt', false);

  useEffect(() => {
    if (session || isUserLoading || dismissedSignUpPrompt) {
      return;
    }

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [session, isUserLoading, dismissedSignUpPrompt]);

  // Don't show it on homepage
  const isHomepage = pathname === '/' || pathname === '/projects';

  if (!isVisible || session || isUserLoading || isHomepage) {
    return null;
  }

  function handleClose() {
    setIsVisible(false);
    setDismissedSignUpPrompt(true);
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="z-popover fixed bottom-6 right-6 shadow-lg"
      exit={{ opacity: 0, y: 100 }}
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}>
      <AuthOneClickSignupCard onClose={handleClose} />
    </motion.div>
  );
}
