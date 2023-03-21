'use client';

import { createContext, useContext } from 'react';

type AppContextType = Readonly<{
  countryCode: string;
}>;

const AppContext = createContext<AppContextType>({
  countryCode: 'US',
});

export function useAppContext() {
  return useContext(AppContext);
}

type Props = Readonly<{
  children: React.ReactNode;
  countryCode: string;
}>;

export default function AppContextProvider({ children, countryCode }: Props) {
  return (
    <AppContext.Provider
      value={{
        countryCode,
      }}>
      {children}
    </AppContext.Provider>
  );
}
