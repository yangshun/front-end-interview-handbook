import { useIntl } from 'react-intl';

import type {
  ProjectStepsTabItem,
  Props as ProjectsProjectStepsTabsProps,
} from './ProjectsProjectStepsTabs';
import ProjectsProjectStepsTabs from './ProjectsProjectStepsTabs';
import type { ProjectsProjectMetadata } from './types';

type TabType = 'assets' | 'completion' | 'project-brief' | 'resources';

function useProjectDetailsStepsTabs(project: ProjectsProjectMetadata) {
  const intl = useIntl();

  const tabs: Array<ProjectStepsTabItem<TabType>> = [
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description:
          'Hint for "Project Brief" and "Assets" tab on Projects project page',
        id: '01jNoZ',
      }),
      href: project.href,
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
      href: project.assetsHref,
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
      href: project.resourcesHref,
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
      href: project.completionHref,
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

type Props = Omit<ProjectsProjectStepsTabsProps<TabType>, 'label' | 'tabs'> & {
  project: ProjectsProjectMetadata;
};

export default function ProjectsProjectStepsTabsImpl({
  project,
  ...props
}: Props) {
  const intl = useIntl();
  const tabs = useProjectDetailsStepsTabs(project);

  return (
    <ProjectsProjectStepsTabs
      label={intl.formatMessage({
        defaultMessage: 'Project Breakdown',
        description:
          'Label for Project Breakdown tabs on Projects project page',
        id: 'H5GY66',
      })}
      tabs={tabs}
      {...props}
    />
  );
}
