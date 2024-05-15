import { useEffect, useState } from 'react';

import { trpc } from '~/hooks/trpc';

import Text from '~/components/ui/Text';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import ConfirmationDialog from '../../../common/ConfirmationDialog';

const EXCLUSIONS = [
  '/projects',
  '/projects/onboarding',
  '/projects/onboarding/profile',
];

export default function ProjectsRedirectToOnboardingIfNecessary() {
  const router = useI18nRouter();
  const { pathname } = useI18nPathname();
  const [showDialog, setShowDialog] = useState(false);

  const { data: userProfile } = trpc.projects.profile.viewer.useQuery();

  useEffect(() => {
    if (EXCLUSIONS.includes(pathname ?? '')) {
      setShowDialog(false);

      return;
    }

    if (userProfile != null) {
      if (
        // Redirect to onboarding page if projectsProfile has not been set up.
        userProfile?.projectsProfile == null
      ) {
        setShowDialog(true);
      }

      if (
        // Redirect to profile setup page if projectsProfile not fully set up.
        !userProfile?.name ||
        !userProfile?.title
      ) {
        setShowDialog(true);
      }
    }
  }, [router, userProfile, pathname]);

  function navigateToOnboarding() {
    if (userProfile == null) {
      return;
    }

    router.push({
      pathname:
        userProfile?.projectsProfile == null
          ? '/projects/onboarding'
          : '/projects/onboarding/profile',
      query: {
        next: pathname,
      },
    });
  }

  if (!showDialog) {
    return null;
  }

  return (
    <ConfirmationDialog
      confirmButtonLabel="Get started"
      isShown={showDialog}
      showCancelButton={false}
      title="Create your projects profile"
      onCancel={navigateToOnboarding}
      onConfirm={navigateToOnboarding}>
      <div className="flex flex-col gap-y-4">
        <Text className="block" color="subtitle">
          Welcome to GreatFrontEnd Projects! Set up your profile to improve your
          experience on the platform.
        </Text>
        <Text className="block" color="subtitle">
          Psst: This profile is only used for Projects, it does not affect the
          Interviews product.
        </Text>
      </div>
    </ConfirmationDialog>
  );
}
