import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsComparison from '~/components/projects/common/ProjectsComparison';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import type { ProjectsBaseScreenshot } from '~/components/projects/types';
import Section from '~/components/ui/Heading/HeadingContext';

import { useI18nRouter } from '~/next-i18nostic/src';

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
        desktop:
          'https://source.unsplash.com/random/1080x700?random=${page.label}',
        mobile:
          'https://source.unsplash.com/random/1080x700?random=${page.label}',
        tablet:
          'https://source.unsplash.com/random/1080x700?random=${page.label}',
      },
    }),
  );

  const takeScreenshotMutation =
    trpc.projects.submission.retakeScreenshot.useMutation();

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
