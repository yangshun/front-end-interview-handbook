import clsx from 'clsx';
import { useState } from 'react';
import {
  RiCodeSSlashLine,
  RiFilterLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsProjectGridList from '~/components/projects/lists/ProjectsProjectGridList';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import ProjectsListFilterDropdown from './ProjectsListFilterDropdown';
import ProjectsListPagination from './ProjectsListPagination';
import ProjectsProjectFilterContextProvider, {
  useProjectsProjectFilterContext,
} from './ProjectsProjectFilterContext';
import ProjectsProjectFilterSlideOut from './ProjectsProjectFilterSlideOut';
import type { ProjectsProjectItem } from '../details/types';

type Props = Readonly<{
  projects: ReadonlyArray<ProjectsProjectItem>;
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
              placeholder="Search by name/project brief"
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
        <div className="flex flex-col gap-y-4">
          <div
            className={clsx(
              'flex items-center gap-2',
              themeTextSecondaryColor,
            )}>
            <RiCodeSSlashLine className="h-4 w-4" />
            <Text color="secondary" size="body3">
              <FormattedMessage
                defaultMessage="{projectCount} projects"
                description="Label for total number of projects in Projects marketing page"
                id="b+bj2C"
                values={{
                  projectCount: projects.length,
                }}
              />
            </Text>
          </div>
          <ProjectsProjectGridList projects={projects} />
        </div>
        <div className="flex justify-between items-center">
          <Text color="secondary" size="body3">
            <FormattedMessage
              defaultMessage="Showing {pageCount} out of {totalCount} projects"
              description="Projects listing label"
              id="Zuck2D"
              values={{
                pageCount: projects.length, // TODO(projects): fix when pagination done.
                totalCount: projects.length,
              }}
            />
          </Text>
          <ProjectsListPagination
            currentPage={1}
            totalPageCount={10}
            onPageChange={() => {}}
          />
        </div>
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