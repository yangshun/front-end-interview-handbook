'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

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
        confirmButtonLabel="Get started"
        isShown={showOnboardingDialog.shown}
        showCancelButton={false}
        title="Set up your profile first (it's quick!)"
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
            Before proceeding, take a moment to fill out some basic details like
            your name and YOE. This helps the community provide more relevant
            support.
          </Text>
          <Text className="block" color="subtitle">
            Psst: This profile is exclusively for Projects and won't impact the
            Interviews product.
          </Text>
        </div>
      </ConfirmationDialog>
    </ProjectsOnboardingContext.Provider>
  );
}
