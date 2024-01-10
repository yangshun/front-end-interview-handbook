import clsx from 'clsx';
import { useState } from 'react';
import {
  RiCodeSSlashLine,
  RiFilterLine,
  RiSearchLine,
  RiSortDesc,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsChallengeGridList from '~/components/projects/lists/ProjectsChallengeGridList';
import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Pagination from '~/components/ui/Pagination';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import ProjectsListFilterDropdown from './ProjectsListFilterDropdown';
import ProjectsChallengeFilterContextProvider, {
  useProjectsChallengeFilterContext,
} from './ProjectsChallengeFilterContext';
import ProjectsChallengeFilterSlideOut from './ProjectsChallengeFilterSlideOut';
import type { ProjectsChallengeItem } from '../details/types';

type Props = Readonly<{
  projects: ReadonlyArray<ProjectsChallengeItem>;
}>;

function ProjectsChallengeGridListWithFiltersImpl({ projects }: Props) {
  const intl = useIntl();
  const { filters } = useProjectsChallengeFilterContext();

  const [areFiltersShown, setAreFiltersShown] = useState(false);

  return (
    <>
      <ProjectsChallengeFilterSlideOut
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
              align="end"
              icon={RiSortDesc}
              label={intl.formatMessage({
                defaultMessage: 'Sort by',
                description: 'Label for sorting button',
                id: 'vegaR1',
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
          <ProjectsChallengeGridList projects={projects} />
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
          <Pagination count={10} page={1} onPageChange={() => {}} />
        </div>
      </div>
    </>
  );
}

export default function ProjectsChallengeGridListWithFilters({
  projects,
}: Props) {
  return (
    <ProjectsChallengeFilterContextProvider>
      <ProjectsChallengeGridListWithFiltersImpl projects={projects} />
    </ProjectsChallengeFilterContextProvider>
  );
}
