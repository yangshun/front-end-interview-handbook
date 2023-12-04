import { useIntl } from 'react-intl';

import type {
  ProjectBreakdownTabItem,
  Props as ProjectsProjectBreakdownTabsProps,
} from './ProjectsProjectBreakdownTabs';
import ProjectsProjectBreakdownTabs from './ProjectsProjectBreakdownTabs';

type TabType =
  | 'assets'
  | 'project-brief'
  | 'project-deployment-completion'
  | 'tips-resources-discussions';

function useTabs(slug: string) {
  const intl = useIntl();

  const tabs: Array<ProjectBreakdownTabItem<TabType>> = [
    {
      hint: intl.formatMessage({
        defaultMessage: 'Get started',
        description:
          'Hint for "Project Brief" and "Assets" tab on Projects project page',
        id: '01jNoZ',
      }),
      href: `/projects/p/${slug}/project-brief`,
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
      href: `/projects/p/${slug}/assets`,
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
      href: `/projects/p/${slug}/tips-resources-discussions`,
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
      value: 'tips-resources-discussions',
    },
    {
      hint: intl.formatMessage({
        defaultMessage: 'After completion',
        description:
          'Hint for "Project Deployment & Completion" tab on Projects project page',
        id: 'QkImfr',
      }),
      href: `/projects/p/${slug}/project-deployment-completion`,
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
      value: 'project-deployment-completion',
    },
  ];

  return tabs;
}

type Props = Omit<
  ProjectsProjectBreakdownTabsProps<TabType>,
  'label' | 'tabs'
> & {
  slug: string;
};

export default function ProjectsProjectBreakdownTabsImpl({
  slug,
  ...props
}: Props) {
  const intl = useIntl();
  const tabs = useTabs(slug);

  return (
    <ProjectsProjectBreakdownTabs
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