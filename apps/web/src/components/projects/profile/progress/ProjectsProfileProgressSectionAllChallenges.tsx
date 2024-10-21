'use client';

import { useState } from 'react';
import { RiRocketLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import useProjectsAllChallengesFilterOptions from '~/components/projects/profile/progress/useProjectsAllChallengesFilterOptions';
import CheckboxInput from '~/components/ui/CheckboxInput';
import EmptyState from '~/components/ui/EmptyState';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import { themeTextColor } from '~/components/ui/theme';

import ProjectsProfileProgressChallengeList from './ProjectsProfileProgressChallengeList';
import ProjectsProfileProgressSubmissionList from './ProjectsProfileProgressSubmissionList';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  targetUserId: string;
}>;

export default function ProjectsProfileProgressSectionAllChallenges({
  isViewingOwnProfile,
  isViewerPremium,
  targetUserId,
}: Props) {
  const intl = useIntl();
  const [showAsSubmissions, setShowAsSubmissions] = useState(true);
  const [challengeStatusFilter, setChallengeStatusFilter] =
    useState<ProjectsChallengeSessionStatus>(
      // Show completed challenges first if viewing someone else's profile.
      isViewingOwnProfile ? 'IN_PROGRESS' : 'COMPLETED',
    );
  const { name: filterName, options: filterOptions } =
    useProjectsAllChallengesFilterOptions();

  const showSubmissionList =
    challengeStatusFilter === 'COMPLETED' && showAsSubmissions;

  const emptyState = (
    <EmptyState
      icon={RiRocketLine}
      iconClassName={themeTextColor}
      subtitle={
        isViewingOwnProfile
          ? intl.formatMessage({
              defaultMessage:
                'You have not started any projects matching those filters.',
              description:
                'Subtitle for no projects yet on projects progress tab',
              id: 'vvPx/k',
            })
          : intl.formatMessage({
              defaultMessage:
                'This user has not started any projects matching those filters.',
              description:
                'Subtitle for no projects yet on projects progress tab',
              id: 'Dt0MpD',
            })
      }
      title={intl.formatMessage({
        defaultMessage: 'No projects matching those filters',
        description: 'Title for no projects yet on projects progress tab',
        id: '+uw4/h',
      })}
    />
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row flex-wrap items-center gap-4">
        <fieldset>
          <legend className="sr-only">{filterName}</legend>
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map(({ icon: Icon, ...option }) => (
              <FilterButton
                key={option.value}
                icon={Icon}
                label={String(option.label)}
                selected={challengeStatusFilter === option.value}
                tooltip={option.tooltip}
                onClick={() => {
                  setChallengeStatusFilter(option.value);
                }}
              />
            ))}
          </div>
        </fieldset>
        {challengeStatusFilter === 'COMPLETED' && (
          <CheckboxInput
            label={intl.formatMessage({
              defaultMessage: 'Show as submissions',
              description: 'Checkbox label for showing as submissions',
              id: '6O2Mng',
            })}
            size="sm"
            value={showAsSubmissions}
            onChange={(value) => {
              setShowAsSubmissions(value);
            }}
          />
        )}
      </div>
      {showSubmissionList ? (
        <ProjectsProfileProgressSubmissionList
          emptyState={emptyState}
          targetUserId={targetUserId}
        />
      ) : (
        <ProjectsProfileProgressChallengeList
          challengeStatus={challengeStatusFilter}
          emptyState={emptyState}
          isViewerPremium={isViewerPremium}
          targetUserId={targetUserId}
        />
      )}
    </div>
  );
}
