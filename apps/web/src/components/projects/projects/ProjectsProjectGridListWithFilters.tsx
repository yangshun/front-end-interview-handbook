import clsx from 'clsx';
import { useState } from 'react';
import {
  RiCodeSSlashLine,
  RiFilterLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import ProjectsProjectFilterContextProvider, {
  useProjectsProjectFilterContext,
} from './ProjectsProjectFilterContext';
import ProjectsProjectFilterSlideOut from './ProjectsProjectFilterSlideOut';
import ProjectsProjectGridList from './ProjectsProjectGridList';
import type { ProjectsProject } from './types';
import ProjectsListFilterDropdown from '../lists/ProjectsListFilterDropdown';

type Props = Readonly<{
  projects: Array<ProjectsProject>;
}>;

function ProjectsProjectGridListWithFiltersImpl({ projects }: Props) {
  const intl = useIntl();
  const { filters } = useProjectsProjectFilterContext();

  const [areFiltersShown, setAreFiltersShown] = useState(false);

  return (
    <>
      <ProjectsProjectFilterSlideOut
        isShown={areFiltersShown}
        onClose={() => {
          setAreFiltersShown(false);
        }}
      />
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
            {filters.map((filter) => (
              <ProjectsListFilterDropdown
                key={filter.id}
                label={filter.label}
                tooltip={filter.tooltip}
              />
            ))}
            <Button
              icon={RiFilterLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'All filters',
                description: 'Label for All Filters button for projects list',
                id: 'i9ojv3',
              })}
              size="md"
              tooltip={intl.formatMessage({
                defaultMessage: 'View all filters',
                description: 'Tooltip for All Filters button for projects list',
                id: 'vHNURr',
              })}
              variant="secondary"
              onClick={() => {
                setAreFiltersShown(true);
              }}
            />
            <DropdownMenu
              icon={RiSortDesc}
              label={intl.formatMessage({
                defaultMessage: 'Sort By',
                description: 'Label for Sort By button for projects list',
                id: 'FYHKDB',
              })}>
              <div>Sort by placeholder</div>
            </DropdownMenu>
          </div>
        </div>
        <div
          className={clsx('flex items-center gap-2', themeTextSecondaryColor)}>
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
    </>
  );
}

export default function ProjectsProjectGridListWithFilters({
  projects,
}: Props) {
  return (
    <ProjectsProjectFilterContextProvider>
      <ProjectsProjectGridListWithFiltersImpl projects={projects} />
    </ProjectsProjectFilterContextProvider>
  );
}
