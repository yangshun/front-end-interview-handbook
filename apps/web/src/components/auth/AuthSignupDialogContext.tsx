'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { useI18nPathname } from '~/next-i18nostic/src';

import AuthDialog from './AuthDialog';

import { useSessionContext } from '@supabase/auth-helpers-react';

type ContextValue = Readonly<{
  hideAuthSignupDialog: () => void;
  showAuthSignupDialog: (nextParam?: string) => void;
}>;

const AuthSignupDialogContext = createContext<ContextValue>({
  hideAuthSignupDialog: () => {},
  showAuthSignupDialog: () => {},
});

export default function AuthSignupDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading: isUserLoading, session } = useSessionContext();
  const { pathname } = useI18nPathname();
  const [dialog, setDialog] = useState<
    { isOpen: false } | { isOpen: true; next: string | null }
  >({
    isOpen: false,
  });

  const showAuthSignupDialog = useCallback(
    (nextParam?: string) => {
      if (dialog.isOpen) {
        return;
      }
      setDialog({
        isOpen: true,
        next: nextParam ?? null,
      });
    },
    [dialog.isOpen],
  );

  const hideAuthSignupDialog = useCallback(() => {
    setDialog({
      isOpen: false,
    });
  }, []);

  const value = useMemo(() => {
    return {
      hideAuthSignupDialog,
      showAuthSignupDialog,
    };
  }, [hideAuthSignupDialog, showAuthSignupDialog]);

  return (
    <AuthSignupDialogContext.Provider value={value}>
      {children}
      <AuthDialog
        isShown={session || isUserLoading ? false : dialog.isOpen}
        next={('next' in dialog ? dialog.next : '') ?? pathname ?? ''}
        onClose={() => {
          hideAuthSignupDialog();
        }}
      />
    </AuthSignupDialogContext.Provider>
  );
}

export function useAuthSignupDialogContext() {
  return useContext(AuthSignupDialogContext);
}
