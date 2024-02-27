import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useProfile from '~/hooks/user/useProfile';

import { useToast } from '~/components/global/toasts/useToast';
import Anchor from '~/components/ui/Anchor';

import type { ProjectsChallengeSessionSkillsFormValues } from '../types';

import type { ProjectsChallengeSession } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

const latestSessionQueryKey = getQueryKey(
  trpc.projects.sessions.latestInProgress,
);

type ProjectsChallengeSessionContextType = {
  accessAllSteps: boolean;
  endSession: (slug: string) => Promise<void>;
  isEndSessionLoading: boolean;
  isGetLatestSessionFetched: boolean;
  isGetStartedDialogShown: boolean;
  isStartSessionLoading: boolean;
  session: ProjectsChallengeSession | null;
  setIsGetStartedDialogShown: (value: boolean) => void;
  startProject: () => void;
  startSession: (
    skills: ProjectsChallengeSessionSkillsFormValues,
  ) => Promise<void>;
};

const ProjectsChallengeSessionContext =
  createContext<ProjectsChallengeSessionContextType>({
    accessAllSteps: false,
    endSession: async () => {},
    isEndSessionLoading: false,
    isGetLatestSessionFetched: false,
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
  const { profile } = useProfile();
  const { navigateToSignInUpPage } = useAuthSignInUp();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { data: canAccessAllSteps } =
    trpc.projects.challenges.canAccessAllSteps.useQuery({ slug });
  const { data: startedBefore } =
    trpc.projects.sessions.startedBefore.useQuery();
  const { data: session, isFetched: isGetLatestSessionFetched } =
    trpc.projects.sessions.latestInProgress.useQuery(
      {
        slug,
      },
      // TODO(projects): remove this initialData.
      {
        initialData: null,
      },
    );

  const startProjectMutation = trpc.projects.sessions.start.useMutation({
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
      accessAllSteps: canAccessAllSteps ?? false,
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
                description: (
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
      isGetLatestSessionFetched,
      isGetStartedDialogShown,
      isStartSessionLoading: startProjectMutation.isLoading,
      session,
      setIsGetStartedDialogShown,
      startProject: () => {
        if (profile == null) {
          navigateToSignInUpPage({ query: { source: 'start_project' } });

          return;
        }

        setIsGetStartedDialogShown(true);
      },
      startSession: async (
        skills: ProjectsChallengeSessionSkillsFormValues,
      ) => {
        await startProjectMutation.mutateAsync(
          { slug, ...skills },
          {
            onError: () => {
              showErrorToast();
            },
            onSuccess: () => {
              showToast({
                description: startedBefore ? (
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
    canAccessAllSteps,
    endSessionMutation,
    isGetStartedDialogShown,
    isGetLatestSessionFetched,
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
