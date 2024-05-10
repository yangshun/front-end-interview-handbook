import { useIntl } from 'react-intl';

import ProjectsImageComparison from '~/components/projects/common/ProjectsImageComparison';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import useProjectsChallengeSubmissionTakeScreenshotMutation from './useProjectsChallengeSubmissionTakeScreenshotMutation';
import type { ProjectsChallengeVariantImages } from '../../challenges/types';

import type { ProjectsChallengeSubmissionScreenshotStatus } from '@prisma/client';

type Props = Readonly<{
  allowRetakeScreenshot?: boolean;
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  screenshotStatus: ProjectsChallengeSubmissionScreenshotStatus;
  specImagesForVariant: ProjectsChallengeVariantImages;
  specLabels: Record<string, string>;
  specShowGridLayoutButton: React.ComponentProps<
    typeof ProjectsImageComparison
  >['specShowGridLayoutButton'];
  submissionId: string;
}>;

export default function ProjectsChallengeSubmissionComparison({
  allowRetakeScreenshot,
  specImagesForVariant,
  specLabels,
  deploymentUrls,
  specShowGridLayoutButton,
  submissionId,
  screenshotStatus,
}: Props) {
  const intl = useIntl();
  const router = useI18nRouter();

  const takeScreenshotMutation =
    useProjectsChallengeSubmissionTakeScreenshotMutation('comparison');

  return (
    <Section>
      <ProjectsImageComparison
        allowRetakeScreenshot={allowRetakeScreenshot}
        deploymentUrls={deploymentUrls}
        isRetakingScreenshot={takeScreenshotMutation.isLoading}
        screenshotStatus={screenshotStatus}
        specImagesForVariant={specImagesForVariant}
        specLabels={specLabels}
        specShowGridLayoutButton={specShowGridLayoutButton}
        title={intl.formatMessage({
          defaultMessage: 'Submission vs Design',
          description: 'Solution vs design comparison title',
          id: 'WxYlE0',
        })}
        onTakeScreenshot={() =>
          takeScreenshotMutation.mutateAsync({ submissionId }).then(() => {
            router.refresh();
          })
        }
      />
    </Section>
  );
}
