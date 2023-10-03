import type { ReactNode } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

import { trpc } from '~/hooks/trpc';

import type { QuestionUserInterfaceSave } from '@prisma/client';

type UserInterfaceCodingWorkspaceSavesContextType = Readonly<{
  save: QuestionUserInterfaceSave | null;
}>;

const UserInterfaceCodingWorkspaceSavesContext =
  createContext<UserInterfaceCodingWorkspaceSavesContextType>({
    save: null,
  });

UserInterfaceCodingWorkspaceSavesContext.displayName =
  'UserInterfaceCodingWorkspaceSavesContext';

type Props = Readonly<{
  children: ReactNode;
  saveId: string;
}>;

export function UserInterfaceCodingWorkspaceSavesContextProvider({
  children,
  saveId,
}: Props) {
  const { data: saveData } = trpc.questionSave.userInterfaceGet.useQuery({
    saveId,
  });

  return (
    <UserInterfaceCodingWorkspaceSavesContext.Provider
      value={{
        save: saveData
          ? {
              ...saveData,
              createdAt: new Date(saveData.createdAt),
              updatedAt: new Date(saveData.updatedAt),
            }
          : null,
      }}>
      {children}
    </UserInterfaceCodingWorkspaceSavesContext.Provider>
  );
}

export function useUserInterfaceCodingWorkspaceSavesContext() {
  return useContext(UserInterfaceCodingWorkspaceSavesContext);
}
