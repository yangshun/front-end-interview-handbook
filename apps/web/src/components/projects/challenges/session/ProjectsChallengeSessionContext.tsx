import { createContext, useCallback, useContext, useState } from 'react';
import { RiFireFill } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import useUserProfile from '~/hooks/user/useUserProfile';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

import logEvent from '~/logging/logEvent';

import type { ProjectsChallengeSessionSkillsFormValues } from '../types';
import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';

import type { ProjectsChallengeSession } from '@prisma/client';

type ProjectsChallengeSessionContextType = Readonly<{
  accessAllSteps: boolean;
  endSession: (slug: string) => Promise<void>;
  fetchingCanAccessAllSteps: boolean;
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
}>;

const ProjectsChallengeSessionContext =
  createContext<ProjectsChallengeSessionContextType>({
    accessAllSteps: false,
    endSession: async () => {},
    fetchingCanAccessAllSteps: false,
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
  const { userProfile } = useUserProfile();
  const { navigateToSignInUpPage } = useAuthSignInUp();
  const trpcUtils = trpc.useUtils();
  const { showToast } = useToast();
  const { data: canAccessAllSteps, isLoading: fetchingCanAccessAllSteps } =
    trpc.projects.challenge.canAccessAllSteps.useQuery({ slug });
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
    onMutate: () => {
      logEvent('projects.challenge.start', {
        element: 'Project Challenge start Button',
        label: 'Start Challenge',
        namespace: 'projects',
      });
    },
    onSuccess: () => {
      trpcUtils.projects.sessions.invalidate();
      // So that the lock screen will be updated with latest state.
      trpcUtils.projects.challenge.canAccessAllSteps.invalidate();
    },
  });
  const endSessionMutation = trpc.projects.sessions.end.useMutation({
    onSuccess: () => {
      trpcUtils.projects.sessions.invalidate();
      // So that the lock screen will be updated with latest state.
      trpcUtils.projects.challenge.canAccessAllSteps.invalidate();
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

  const value = {
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
    fetchingCanAccessAllSteps,
    isEndSessionLoading: endSessionMutation.isLoading,
    isGetLatestSessionFetched,
    isGetStartedDialogShown,
    isStartSessionLoading: startProjectMutation.isLoading,
    session,
    setIsGetStartedDialogShown,
    startProject: () => {
      if (userProfile == null) {
        navigateToSignInUpPage({ query: { source: 'start_project' } });

        return;
      }

      setIsGetStartedDialogShown(true);
    },
    startSession: async (skills: ProjectsChallengeSessionSkillsFormValues) => {
      await startProjectMutation.mutateAsync(
        { slug, ...skills },
        {
          onError: () => {
            showErrorToast();
          },
          onSuccess: () => {
            showToast(
              startedBefore
                ? {
                    description: (
                      <FormattedMessage
                        defaultMessage="Project started! Leverage the provided resources and submit a link to your site once ready!"
                        description="Toast subtitle for project session started"
                        id="Et7nC7"
                      />
                    ),
                    title: (
                      <FormattedMessage
                        defaultMessage="Woohoo!"
                        description="Toast title for project session started"
                        id="ZFDU0d"
                      />
                    ),
                    variant: 'success',
                  }
                : {
                    addOnIcon: RiFireFill,
                    addOnLabel: `+${ProjectsReputationPointsConfig.SESSION_FIRST}`,
                    description: (
                      <FormattedMessage
                        defaultMessage="You have started your first project!"
                        description="Toast subtitle for project session started"
                        id="T6+Y/z"
                      />
                    ),
                    title: (
                      <FormattedMessage
                        defaultMessage="Great start!"
                        description="Toast title for project session started"
                        id="r9Az7V"
                      />
                    ),
                    variant: 'success',
                  },
            );
          },
        },
      );
    },
  };

  return (
    <ProjectsChallengeSessionContext.Provider value={value}>
      {children}
    </ProjectsChallengeSessionContext.Provider>
  );
}
