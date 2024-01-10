import { useIntl } from 'react-intl';

import type {
  ProjectStepsTabItem,
  Props as ProjectsChallengeStepsTabsProps,
} from './ProjectsChallengeStepsTabs';
import ProjectsChallengeStepsTabs from './ProjectsChallengeStepsTabs';
import type { ProjectsChallengeItem } from './types';

type TabType = 'assets' | 'completion' | 'project-brief' | 'resources';

function useProjectDetailsStepsTabs(project: ProjectsChallengeItem) {
  const intl = useIntl();
  const { metadata } = project;

  const tabs: Array<ProjectStepsTabItem<TabType>> = [
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description:
          'Hint for "Project Brief" and "Assets" tab on Projects project page',
        id: '01jNoZ',
      }),
      href: metadata.href,
      subtitle: intl.formatMessage({
        defaultMessage: 'Project Brief',
        description:
          'Subtitle for "Project Brief" tab on Projects project page',
        id: 'vdhmX1',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 1',
        description: 'Title for "Step 1" tab on Projects project page',
        id: 'Ty7LFA',
      }),
      value: 'project-brief',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description:
          'Hint for "Project Brief" and "Assets" tab on Projects project page',
        id: '01jNoZ',
      }),
      href: metadata.assetsHref,
      subtitle: intl.formatMessage({
        defaultMessage: 'Assets',
        description: 'Subtitle for "Assets" tab on Projects project page',
        id: 'qR0ILp',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 2',
        description: 'Title for "Step 2" tab on Projects project page',
        id: 'mjEvFf',
      }),
      value: 'assets',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'While working on project',
        description:
          'Hint for "Tips, Resources and Discussions" tab on Projects project page',
        id: 'KBBRmA',
      }),
      href: metadata.resourcesHref,
      subtitle: intl.formatMessage({
        defaultMessage: 'Tips, Resources and Discussions',
        description:
          'Subtitle for "Tips, Resources and Discussions" tab on Projects project page',
        id: 'U10C4D',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 3',
        description: 'Title for "Step 3" tab on Projects project page',
        id: '+Yk101',
      }),
      value: 'resources',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'After completion',
        description:
          'Hint for "Project Deployment & Completion" tab on Projects project page',
        id: 'QkImfr',
      }),
      href: metadata.completionHref,
      subtitle: intl.formatMessage({
        defaultMessage: 'Project Deployment & Completion',
        description:
          'Subtitle for "Project Deployment & Completion" tab on Projects project page',
        id: '/dWN/a',
      }),
      title: intl.formatMessage({
        defaultMessage: 'Step 4',
        description: 'Title for "Step 4" tab on Projects project page',
        id: 'G5tU8P',
      }),
      value: 'completion',
    },
  ];

  return tabs;
}

type Props = Omit<
  ProjectsChallengeStepsTabsProps<TabType>,
  'label' | 'tabs'
> & {
  project: ProjectsChallengeItem;
};

export default function ProjectsChallengeStepsTabsImpl({
  project,
  ...props
}: Props) {
  const intl = useIntl();
  const tabs = useProjectDetailsStepsTabs(project);

  return (
    <ProjectsChallengeStepsTabs
      label={intl.formatMessage({
        defaultMessage: 'Project steps',
        description: 'Label for Project steps tabs',
        id: 'TJD+8A',
      })}
      tabs={tabs}
      {...props}
    />
  );
}
