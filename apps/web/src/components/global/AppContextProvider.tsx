'use client';

import { createContext, useContext, useMemo } from 'react';

import { trpc } from '~/hooks/trpc';

type AppContextType = Readonly<{
  // Server SHA and client SHA differ.
  serverMismatch: boolean;
}>;

const clientCommit: string =
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? '';

const defaultContextValue: AppContextType = Object.freeze({
  serverMismatch: false,
});

const AppContext = createContext<AppContextType>(defaultContextValue);

export function useAppContext() {
  return useContext(AppContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function AppContextProvider({ children }: Props) {
  const { data: serverCommit } = trpc.dev.serverCommit.useQuery(undefined, {
    refetchOnWindowFocus: process.env.NODE_ENV === 'production',
  });

  const contextValue = useMemo(
    () => ({
      serverMismatch:
        // Only check in prod.
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' &&
        clientCommit !== serverCommit,
    }),
    [serverCommit],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
