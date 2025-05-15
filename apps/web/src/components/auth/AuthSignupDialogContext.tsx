'use client';

import { useSessionContext } from '@supabase/auth-helpers-react';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { mergeWithCurrentURL } from '~/hooks/user/useAuthFns';

import { useI18nPathname } from '~/next-i18nostic/src';

import AuthDialog from './AuthDialog';

type ContextValue = Readonly<{
  hideAuthSignupDialog: () => void;
  showAuthSignupDialog: (
    opts?: Readonly<{
      hideCloseButton?: boolean;
      next?: string;
    }>,
  ) => void;
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
    | { hideCloseButton?: boolean; isOpen: true; next: string | null }
    | { isOpen: false }
  >({
    isOpen: false,
  });

  const showAuthSignupDialog = useCallback(
    (
      opts?: Readonly<{
        hideCloseButton?: boolean;
        next?: string;
      }>,
    ) => {
      const { hideCloseButton, next } = opts || {};

      if (dialog.isOpen) {
        return;
      }
      setDialog({
        hideCloseButton,
        isOpen: true,
        next: next ?? null,
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
        next={mergeWithCurrentURL(
          ('next' in dialog ? dialog.next : '') ?? pathname ?? '',
        )}
        onClose={
          'hideCloseButton' in dialog && dialog.hideCloseButton
            ? undefined
            : () => hideAuthSignupDialog()
        }
      />
    </AuthSignupDialogContext.Provider>
  );
}

export function useAuthSignupDialogContext() {
  return useContext(AuthSignupDialogContext);
}
