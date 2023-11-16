import clsx from 'clsx';
import {
  RiCodeSSlashLine,
  RiFilterLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import ProjectsProjectGridList from './ProjectsProjectGridList';
import type { ProjectsProject } from './types';
import ProjectsListFilterDropdown from '../lists/ProjectsListFilterDropdown';

type Props = Readonly<{
  projects: Array<ProjectsProject>;
}>;

export default function ProjectsProjectGridListWithFilters({
  projects,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3 flex-wrap lg:flex-row flex-col">
        <div className="flex-1 w-full lg:w-auto">
          <TextInput
            isLabelHidden={true}
            label="Search"
            placeholder="Search"
            startIcon={RiSearchLine}
            type="text"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          <ProjectsListFilterDropdown
            label={intl.formatMessage({
              defaultMessage: 'Component track',
              description: 'Label for "Component track" filter for projects list',
              id: 'V4WC0s',
            })}
          />
          <ProjectsListFilterDropdown
            label={intl.formatMessage({
              defaultMessage: 'Skills',
              description: 'Label for "Skills" filter for projects list',
              id: 'BSw3M8',
            })}
          />
          <ProjectsListFilterDropdown
            label={intl.formatMessage({
              defaultMessage: 'Difficulty',
              description: 'Label for "Difficulty" filter for projects list',
              id: '8LBjGN',
            })}
          />
          <ProjectsListFilterDropdown
            label={intl.formatMessage({
              defaultMessage: 'Status',
              description: 'Label for "Status" filter for projects list',
              id: 'DVZ1fN',
            })}
          />
          <ProjectsListFilterDropdown
            icon={RiFilterLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Filter',
              description: 'Label for "Filter" button for projects list',
              id: 'lGYkx/',
            })}
            showChevron={false}
          />
          <ProjectsListFilterDropdown
            icon={RiSortDesc}
            label={intl.formatMessage({
              defaultMessage: 'Sort by',
              description: 'Label for "Sort by" button for projects list',
              id: 'usqC5b',
            })}
          />
        </div>
      </div>
      <div className={clsx('flex items-center gap-2', themeTextSecondaryColor)}>
        <RiCodeSSlashLine className="h-4 w-4" />
        <Text color="inherit" size="body3">
          <FormattedMessage
            defaultMessage="{projectCount} projects"
            description="Label for total number of projects in Projects marketing page"
            id="b+bj2C"
            values={{
              projectCount: 200,
            }}
          />
        </Text>
      </div>
      <ProjectsProjectGridList projects={projects} />
    </div>
  );
}
