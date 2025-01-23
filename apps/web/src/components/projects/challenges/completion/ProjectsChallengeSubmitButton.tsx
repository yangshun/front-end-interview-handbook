import { RiArrowRightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { useI18nRouter } from '~/next-i18nostic/src';

import { useProjectsOnboardingContext } from '../../onboarding/ProjectsOnboardingContext';

type Props = Partial<React.ComponentProps<typeof Button>> &
  Readonly<{
    submitHref: string;
  }>;

export default function ProjectsChallengeSubmitButton({
  submitHref,
  ...props
}: Props) {
  const intl = useIntl();

  const { handleActionRequiringCompletedProjectsProfile } =
    useProjectsOnboardingContext();
  const router = useI18nRouter();

  return (
    <Button
      icon={RiArrowRightLine}
      label={intl.formatMessage({
        defaultMessage: 'Submit project',
        description: 'Submit project button label',
        id: 'KC9zNV',
      })}
      variant="primary"
      onClick={() =>
        handleActionRequiringCompletedProjectsProfile({
          fn: () => {
            router.push(submitHref);
          },
          onboardingNextHref: submitHref,
        })
      }
      {...props}
    />
  );
}
