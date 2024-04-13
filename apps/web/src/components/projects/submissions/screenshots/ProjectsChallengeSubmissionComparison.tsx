import { useIntl } from 'react-intl';

import ProjectsImageComparison from '~/components/projects/common/ProjectsImageComparison';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import useProjectsChallengeSubmissionTakeScreenshotMutation from './useProjectsChallengeSubmissionTakeScreenshotMutation';
import type { ProjectsChallengeVariantImages } from '../../challenges/types';

type Props = Readonly<{
  allowRetakeScreenshot?: boolean;
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  specImagesForVariant: ProjectsChallengeVariantImages;
  submissionId: string;
}>;

export default function ProjectsChallengeSubmissionComparison({
  allowRetakeScreenshot,
  specImagesForVariant,
  deploymentUrls,
  submissionId,
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
        isTakingScreenshot={takeScreenshotMutation.isLoading}
        specImagesForVariant={specImagesForVariant}
        title={intl.formatMessage({
          defaultMessage: 'Solution vs Design comparison',
          description: 'Solution vs design comparison title',
          id: '3ffp8N',
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
