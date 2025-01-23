'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import Text from '~/components/ui/Text';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import useUserProfileWithProjectsProfile from '../common/useUserProfileWithProjectsProfile';
import ConfirmationDialog from '../../common/ConfirmationDialog';

type ProjectsOnboardingContextType = Readonly<{
  handleActionRequiringProjectsProfile: (
    fn?: () => void,
    signUpSource?: string,
  ) => void;
}>;

const ProjectsOnboardingContext = createContext<ProjectsOnboardingContextType>({
  handleActionRequiringProjectsProfile: () => {},
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
  const [showOnboardingDialog, setShowOnboardingDialog] = useState(false);

  const { userProfile } = useUserProfileWithProjectsProfile();
  const { navigateToSignInUpPage } = useAuthSignInUp();

  function navigateToOnboarding() {
    router.push({
      pathname: '/projects/onboarding',
      query: {
        next: pathname,
      },
    });
  }

  function handleActionRequiringProjectsProfile(
    fn?: () => void,
    signUpSource?: string,
  ) {
    if (userProfile == null) {
      navigateToSignInUpPage({ query: { source: signUpSource } });

      return;
    }

    if (userProfile?.projectsProfile == null) {
      setShowOnboardingDialog(true);

      return;
    }

    fn?.();
  }

  return (
    <ProjectsOnboardingContext.Provider
      value={{ handleActionRequiringProjectsProfile }}>
      {children}
      <ConfirmationDialog
        confirmButtonLabel="Get started"
        isShown={showOnboardingDialog}
        showCancelButton={false}
        title="Create a projects profile first"
        onCancel={() => {
          setShowOnboardingDialog(false);
        }}
        onConfirm={() => {
          setShowOnboardingDialog(false);
          navigateToOnboarding();
        }}>
        <div className="flex flex-col gap-y-4">
          <Text className="block" color="subtitle">
            Welcome to GreatFrontEnd Projects! Set up your profile to improve
            your experience on the platform.
          </Text>
          <Text className="block" color="subtitle">
            Psst: This profile is only used for Projects, it does not affect the
            Interviews product.
          </Text>
        </div>
      </ConfirmationDialog>
    </ProjectsOnboardingContext.Provider>
  );
}
