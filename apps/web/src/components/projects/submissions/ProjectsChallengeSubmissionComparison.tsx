import { useState } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsComparison from '~/components/projects/common/ProjectsComparison';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import type { ProjectsBaseScreenshot } from '~/components/projects/types';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  submissionId: string;
}>;

export default function ProjectsChallengeSubmissionComparison({
  deploymentUrls,
  submissionId,
}: Props) {
  const intl = useIntl();
  // TODO(projects): refetch submission to prevent storing duplicated state
  const [deploymentScreenshots, setDeploymentScreenshots] =
    useState<ProjectsChallengeSubmissionDeploymentUrls>(deploymentUrls);

  const baseScreenshots: Array<ProjectsBaseScreenshot> =
    deploymentScreenshots.map((item) => ({
      label: item.label,
      // TODO(projects): Pick from challenge assets
      screenshots: {
        desktop:
          'https://source.unsplash.com/random/1080x700?random=${page.label}',
        mobile:
          'https://source.unsplash.com/random/1080x700?random=${page.label}',
        tablet:
          'https://source.unsplash.com/random/1080x700?random=${page.label}',
      },
    }));

  const takeScreenshotMutation =
    trpc.projects.submission.takeScreenshot.useMutation();

  return (
    <Section>
      <ProjectsComparison
        baseScreenshots={baseScreenshots}
        deploymentUrls={deploymentScreenshots}
        isTakingScreenshot={takeScreenshotMutation.isLoading}
        mode="compare"
        title={intl.formatMessage({
          defaultMessage: 'Solution vs Design comparison',
          description: 'Solution vs design comparison title',
          id: '3ffp8N',
        })}
        onTakeScreenshot={() =>
          takeScreenshotMutation
            .mutateAsync({ submissionId })
            .then((newDeploymentScreenshots) => {
              setDeploymentScreenshots(newDeploymentScreenshots);
            })
        }
      />
    </Section>
  );
}
