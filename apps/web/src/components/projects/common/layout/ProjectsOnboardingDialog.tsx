import { trpc } from '~/hooks/trpc';

import Text from '~/components/ui/Text';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

import ConfirmationDialog from '../../../common/ConfirmationDialog';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
}>;

export default function ProjectsOnboardingDialog({ isShown, onClose }: Props) {
  const router = useI18nRouter();
  const { pathname } = useI18nPathname();

  const { data: userProfile } = trpc.projects.profile.viewer.useQuery();

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

  return (
    <ConfirmationDialog
      confirmButtonLabel="Get started"
      isShown={isShown}
      showCancelButton={false}
      title="Create a projects profile first"
      onCancel={onClose}
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
