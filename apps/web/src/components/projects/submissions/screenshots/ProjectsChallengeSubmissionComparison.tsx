import { useIntl } from 'react-intl';

import ProjectsComparison from '~/components/projects/common/ProjectsComparison';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import type { ProjectsBaseScreenshot } from '~/components/projects/types';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

import useProjectsChallengeSubmissionTakeScreenshotMutation from './useProjectsChallengeSubmissionTakeScreenshotMutation';

type Props = Readonly<{
  allowRetakeScreenshot?: boolean;
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  submissionId: string;
}>;

export default function ProjectsChallengeSubmissionComparison({
  allowRetakeScreenshot,
  deploymentUrls,
  submissionId,
}: Props) {
  const intl = useIntl();
  const router = useI18nRouter();

  const baseScreenshots: Array<ProjectsBaseScreenshot> = deploymentUrls.map(
    (item) => ({
      label: item.label,
      // TODO(projects): Pick from challenge assets
      screenshots: {
        desktop: '/img/projects/desktop.png',
        mobile: '/img/projects/mobile.png',
        tablet: '/img/projects/tablet.png',
      },
    }),
  );

  const takeScreenshotMutation =
    useProjectsChallengeSubmissionTakeScreenshotMutation('comparison');

  return (
    <Section>
      <ProjectsComparison
        allowRetakeScreenshot={allowRetakeScreenshot}
        baseScreenshots={baseScreenshots}
        deploymentUrls={deploymentUrls}
        isTakingScreenshot={takeScreenshotMutation.isLoading}
        mode="compare"
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
