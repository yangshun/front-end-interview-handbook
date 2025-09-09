import { useNavigationGuard } from 'next-navigation-guard';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { useCodingWorkspaceSelector } from './store/hooks';

type Props = Readonly<{
  children: ReactNode;
}>;

type UnsavedChangesDialogType =
  | {
      onAction: () => void;
      onCancel?: () => void;
      show: true;
    }
  | {
      show: false;
    };

export type SetUnsavedChangesDialogType = Dispatch<
  SetStateAction<UnsavedChangesDialogType>
>;
type ContextValue = Readonly<{
  setUnsavedChangesDialog: SetUnsavedChangesDialogType;
  unsavedChangesDialog: UnsavedChangesDialogType;
}>;

const CodingWorkspaceUnsavedSolutionContext = createContext<ContextValue>({
  setUnsavedChangesDialog: () => {},
  unsavedChangesDialog: {
    show: false,
  },
});

CodingWorkspaceUnsavedSolutionContext.displayName =
  'CodingWorkspaceUnsavedSolutionContext';

export function CodingWorkspaceUnsavedSolutionProvider({ children }: Props) {
  const isAboveMobile = useMediaQuery('(min-width: 641px)');
  const hasUnsavedSolutionChanges = useCodingWorkspaceSelector(
    (state) => state.solution.hasUnsavedSolutionChanges,
  );
  const [unsavedChangesDialog, setUnsavedChangesDialog] =
    useState<UnsavedChangesDialogType>({
      show: false,
    });

  // Remove navigation guard if it on mobile screen
  const navGuard = useNavigationGuard({
    enabled: isAboveMobile ? hasUnsavedSolutionChanges : false,
  });

  useEffect(() => {
    if (!navGuard.active) {
      return;
    }

    setUnsavedChangesDialog({
      onAction: () => {
        setUnsavedChangesDialog({
          show: false,
        });
        navGuard.accept();
      },
      onCancel: navGuard.reject,
      show: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navGuard.active]);

  return (
    <CodingWorkspaceUnsavedSolutionContext.Provider
      value={{
        setUnsavedChangesDialog,
        unsavedChangesDialog,
      }}>
      {children}
    </CodingWorkspaceUnsavedSolutionContext.Provider>
  );
}

export function useCodingWorkspaceUnsavedSolutionContext() {
  try {
    return useContext(CodingWorkspaceUnsavedSolutionContext);
  } catch (error) {
    return {} as ContextValue;
  }
}
