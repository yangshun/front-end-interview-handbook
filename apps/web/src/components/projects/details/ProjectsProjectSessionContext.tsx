import { createContext, useContext, useMemo, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import type { ProjectsProjectSession } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

const latestSessionQueryKey = getQueryKey(
  trpc.projects.sessions.getLatestInProgress,
);

type ProjectsProjectSessionContextType = {
  endSession: (slug: string) => Promise<void>;
  isGetStartedDialogShown: boolean;
  session: ProjectsProjectSession | null;
  setIsGetStartedDialogShown: (value: boolean) => void;
  startProject: () => void;
  startSession: (slug: string) => Promise<void>;
};

const ProjectsProjectSessionContext =
  createContext<ProjectsProjectSessionContextType>({
    endSession: async () => {},
    isGetStartedDialogShown: false,
    session: null,
    setIsGetStartedDialogShown: () => {},
    startProject: () => {},
    startSession: async () => {},
  });

export function useProjectsProjectSessionContext() {
  return useContext(ProjectsProjectSessionContext);
}

type Props = Readonly<{
  children: React.ReactNode;
  slug: string;
}>;

export default function ProjectsProjectSessionContextProvider({
  children,
  slug,
}: Props) {
  const queryClient = useQueryClient();

  const { data: session } = trpc.projects.sessions.getLatestInProgress.useQuery(
    {
      slug,
    },
    {
      initialData: null,
    },
  );

  const startProjectMutation = trpc.projects.sessions.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(latestSessionQueryKey);
    },
  });
  const endSessionMutation = trpc.projects.sessions.end.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(latestSessionQueryKey);
    },
  });

  const [isGetStartedDialogShown, setIsGetStartedDialogShown] = useState(false);

  const value = useMemo(() => {
    return {
      endSession: async () => {
        await endSessionMutation.mutateAsync({
          slug,
        });
      },
      isGetStartedDialogShown,
      // TODO(projects): Replace when/if superjson is added to trpc
      session: session
        ? {
            ...session,
            createdAt: new Date(session.createdAt),
            stoppedAt: session.stoppedAt ? new Date(session.stoppedAt) : null,
          }
        : session,
      setIsGetStartedDialogShown,
      startProject: () => {
        setIsGetStartedDialogShown(true);
      },
      startSession: async () => {
        await startProjectMutation.mutateAsync({ slug });
      },
    };
  }, [
    endSessionMutation,
    isGetStartedDialogShown,
    session,
    slug,
    startProjectMutation,
  ]);

  return (
    <ProjectsProjectSessionContext.Provider value={value}>
      {children}
    </ProjectsProjectSessionContext.Provider>
  );
}
