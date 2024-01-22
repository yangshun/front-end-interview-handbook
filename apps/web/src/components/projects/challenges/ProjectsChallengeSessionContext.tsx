import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import Anchor from '~/components/ui/Anchor';

import type { ProjectsChallengeSession } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

const latestSessionQueryKey = getQueryKey(
  trpc.projects.sessions.getLatestInProgress,
);

type ProjectsChallengeSessionContextType = {
  endSession: (slug: string) => Promise<void>;
  isEndSessionLoading: boolean;
  isGetStartedDialogShown: boolean;
  isStartSessionLoading: boolean;
  session: ProjectsChallengeSession | null;
  setIsGetStartedDialogShown: (value: boolean) => void;
  startProject: () => void;
  startSession: (slug: string) => Promise<void>;
};

const ProjectsChallengeSessionContext =
  createContext<ProjectsChallengeSessionContextType>({
    endSession: async () => {},
    isEndSessionLoading: false,
    isGetStartedDialogShown: false,
    isStartSessionLoading: false,
    session: null,
    setIsGetStartedDialogShown: () => {},
    startProject: () => {},
    startSession: async () => {},
  });

export function useProjectsChallengeSessionContext() {
  return useContext(ProjectsChallengeSessionContext);
}

type Props = Readonly<{
  children: React.ReactNode;
  slug: string;
}>;

export default function ProjectsChallengeSessionContextProvider({
  children,
  slug,
}: Props) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data: startedBefore } =
    trpc.projects.sessions.startedBefore.useQuery();

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

  const showErrorToast = useCallback(() => {
    showToast({
      title: (
        <FormattedMessage
          defaultMessage="Something went wrong. Try again later or contact <link>support@greatfrontend.com</link>!"
          description="Error toast for project"
          id="5Gjt4J"
          values={{
            link: (chunks) => (
              <Anchor href="mailto:support@greatfrontend.com">{chunks}</Anchor>
            ),
          }}
        />
      ),
      variant: 'danger',
    });
  }, [showToast]);

  const value = useMemo(() => {
    return {
      endSession: async () => {
        await endSessionMutation.mutateAsync(
          {
            slug,
          },
          {
            onError: () => {
              showErrorToast();
            },
            onSuccess: () => {
              showToast({
                subtitle: (
                  <FormattedMessage
                    defaultMessage="You have ended this project session. Returning you to the project detail page."
                    description="Toast subtitle for project session ended"
                    id="9CjNZn"
                  />
                ),
                title: (
                  <FormattedMessage
                    defaultMessage="Project session ended!"
                    description="Toast title for project session ended"
                    id="f/t2zt"
                  />
                ),
                variant: 'success',
              });
            },
          },
        );
      },
      isEndSessionLoading: endSessionMutation.isLoading,

      isGetStartedDialogShown,
      isStartSessionLoading: startProjectMutation.isLoading,
      session,
      setIsGetStartedDialogShown,
      startProject: () => {
        setIsGetStartedDialogShown(true);
      },
      startSession: async () => {
        await startProjectMutation.mutateAsync(
          { slug },
          {
            onError: () => {
              showErrorToast();
            },
            onSuccess: () => {
              showToast({
                subtitle: startedBefore ? (
                  <FormattedMessage
                    defaultMessage="Project started! Leverage the provided guides and resources and submit a link to your site once ready!"
                    description="Toast subtitle for project session started"
                    id="QvLJda"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="You have started your first project!"
                    description="Toast subtitle for project session started"
                    id="T6+Y/z"
                  />
                ),
                title: startedBefore ? (
                  <FormattedMessage
                    defaultMessage="Woohoo!"
                    description="Toast title for project session started"
                    id="ZFDU0d"
                  />
                ) : (
                  <FormattedMessage
                    defaultMessage="Great start!"
                    description="Toast title for project session started"
                    id="r9Az7V"
                  />
                ),
                variant: 'success',
              });
            },
          },
        );
      },
    };
  }, [
    endSessionMutation,
    isGetStartedDialogShown,
    session,
    slug,
    startProjectMutation,
    showToast,
    startedBefore,
    showErrorToast,
  ]);

  return (
    <ProjectsChallengeSessionContext.Provider value={value}>
      {children}
    </ProjectsChallengeSessionContext.Provider>
  );
}
