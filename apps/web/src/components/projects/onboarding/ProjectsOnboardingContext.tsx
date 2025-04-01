'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import useUserProfileWithProjectsProfile from '../common/useUserProfileWithProjectsProfile';
import ConfirmationDialog from '../../common/ConfirmationDialog';

type ProjectsOnboardingContextType = Readonly<{
  handleActionRequiringCompletedProjectsProfile: (opts?: {
    fn?: () => void;
    onboardingNextHref?: string;
    signUpSource?: string;
  }) => void;
  handleActionRequiringLogin: (opts?: {
    fn?: () => void;
    nextHref?: string;
    signUpSource?: string;
  }) => void;
}>;

const ProjectsOnboardingContext = createContext<ProjectsOnboardingContextType>({
  handleActionRequiringCompletedProjectsProfile: () => {},
  handleActionRequiringLogin: () => {},
});

type Props = Readonly<{
  children: ReactNode;
}>;

export function useProjectsOnboardingContext() {
  return useContext(ProjectsOnboardingContext);
}

export default function ProjectsOnboardingContextProvider({ children }: Props) {
  const intl = useIntl();
  const router = useI18nRouter();
  const { pathname } = useI18nPathname();
  const [showOnboardingDialog, setShowOnboardingDialog] = useState<{
    onboardingNextHref: string | null;
    shown: boolean;
  }>({ onboardingNextHref: null, shown: false });

  const { userProfile } = useUserProfileWithProjectsProfile();
  const { navigateToSignInUpPage } = useAuthSignInUp();

  function navigateToOnboarding(nextPathname: string | null) {
    router.push({
      pathname: '/projects/onboarding',
      query: {
        next: nextPathname || pathname,
      },
    });
  }

  function handleActionRequiringLogin({
    fn,
    nextHref,
    signUpSource,
  }: Readonly<{
    fn?: () => void;
    nextHref?: string;
    signUpSource?: string;
  }> = {}) {
    if (userProfile == null) {
      navigateToSignInUpPage({
        next: nextHref,
        query: { source: signUpSource },
      });

      return;
    }

    fn?.();
  }

  function handleActionRequiringCompletedProjectsProfile({
    fn,
    onboardingNextHref,
    signUpSource,
  }: Readonly<{
    fn?: () => void;
    onboardingNextHref?: string;
    signUpSource?: string;
  }> = {}) {
    if (userProfile == null) {
      navigateToSignInUpPage({
        next: onboardingNextHref,
        query: { source: signUpSource },
      });

      return;
    }

    if (!userProfile?.projectsProfile?.completed) {
      setShowOnboardingDialog({
        onboardingNextHref: onboardingNextHref ?? null,
        shown: true,
      });

      return;
    }

    fn?.();
  }

  return (
    <ProjectsOnboardingContext.Provider
      value={{
        handleActionRequiringCompletedProjectsProfile,
        handleActionRequiringLogin,
      }}>
      {children}
      <ConfirmationDialog
        confirmButtonLabel={intl.formatMessage({
          defaultMessage: 'Get started',
          description: 'Get started label',
          id: 'yawjvQ',
        })}
        isShown={showOnboardingDialog.shown}
        showCancelButton={false}
        title={intl.formatMessage({
          defaultMessage: "Set up your profile first (it's quick!)",
          description: 'Projects onboarding dialog title',
          id: 'W7K4ko',
        })}
        onCancel={() => {
          setShowOnboardingDialog({
            onboardingNextHref: null,
            shown: false,
          });
        }}
        onConfirm={() => {
          const href = showOnboardingDialog.onboardingNextHref;

          setShowOnboardingDialog({ onboardingNextHref: null, shown: false });
          navigateToOnboarding(href);
        }}>
        <div className="flex flex-col gap-y-4">
          <Text className="block" color="subtitle">
            {intl.formatMessage({
              defaultMessage:
                'Before proceeding, fill out your name and YOE. This helps the community provide more relevant support.',
              description: 'Projects onboarding dialog description',
              id: 'cfvE2F',
            })}
          </Text>
          <Text className="block" color="subtitle">
            {intl.formatMessage({
              defaultMessage:
                "PS: This profile is only for Projects - it won't be linked to your Interviews account.",
              description: 'Projects onboarding dialog description',
              id: 'tk49aL',
            })}
          </Text>
        </div>
      </ConfirmationDialog>
    </ProjectsOnboardingContext.Provider>
  );
}
