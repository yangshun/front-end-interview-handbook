'use client';

import { createContext, useContext } from 'react';

type AppContextType = null;

const AppContext = createContext<AppContextType>(null);

export function useAppContext() {
  return useContext(AppContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function AppContextProvider({ children }: Props) {
  return <AppContext.Provider value={null}>{children}</AppContext.Provider>;
}
