'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { ProjectsTrack } from '~/components/projects/tracks/ProjectsTracksData';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import ProjectsAllChallengesTab from './ProjectsAllChallengesTab';
import ProjectsComponentTrackTab from './ProjectsComponentTrackTab';
import ProjectsSkillsTab from './ProjectsSkillsTab';
import type { ProjectsMainTabCategory } from './useProjectsCategoryTabs';
import useProjectsCategoryTabs from './useProjectsCategoryTabs';
import type { ProjectsCommunityContributionsTabCategory } from './useProjectsCommunityContributionsTabs';
import useProjectsCommunityContributionsTabs from './useProjectsCommunityContributionsTabs';
import type { ProjectsMainLayoutTabCategory } from './useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from './useProjectsMainLayoutTabs';

type Props = Readonly<{
  projectTracks: ReadonlyArray<ProjectsTrack>;
}>;

export default function ProjectsProgressAndContributionsSection({
  projectTracks,
}: Props) {
  const intl = useIntl();
  const categoryTabs = useProjectsCategoryTabs();
  const mainLayoutTabs = useProjectsMainLayoutTabs();
  const progressTabs: ReadonlyArray<TabItem<ProjectsMainLayoutTabCategory>> =
    mainLayoutTabs.map((tab) => {
      const { href: _href, ...tabWithoutHref } = tab;

      return {
        ...tabWithoutHref,
        value: tab.key,
      };
    });
  const contributionsTabs = useProjectsCommunityContributionsTabs();
  const [currentDashboardTab, setCurrentDashboardTab] =
    useState<ProjectsMainTabCategory>('progress');
  const [currentProgressTab, setCurrentProgressTab] =
    useState<ProjectsMainLayoutTabCategory>('challenges');
  const [currentContributionsTab, setCurrentContributionsTab] =
    useState<ProjectsCommunityContributionsTabCategory>('reviews');

  return (
    <div className="flex flex-col gap-8">
      <Tabs
        label={intl.formatMessage({
          defaultMessage: 'Select dashboard category',
          description: 'Tab label to select another dashboard category',
          id: '1O3xR8',
        })}
        size="md"
        tabs={categoryTabs}
        value={currentDashboardTab}
        onSelect={setCurrentDashboardTab}
      />
      {currentDashboardTab === 'progress' && (
        <Tabs
          hasBorder={false}
          label={intl.formatMessage({
            defaultMessage: 'Select project category',
            description: 'Tab label to select another project category',
            id: 'GcmSpX',
          })}
          size="sm"
          tabs={progressTabs}
          value={currentProgressTab}
          onSelect={setCurrentProgressTab}
        />
      )}
      {currentDashboardTab === 'contributions' && (
        <Tabs
          hasBorder={false}
          label={intl.formatMessage({
            defaultMessage: 'Select community contributions category',
            description:
              'Tab label to select another community contributions category',
            id: 'fDl2Op',
          })}
          size="sm"
          tabs={contributionsTabs}
          value={currentContributionsTab}
          onSelect={setCurrentContributionsTab}
        />
      )}
      {currentDashboardTab === 'progress' &&
        currentProgressTab === 'challenges' && <ProjectsAllChallengesTab />}
      {currentDashboardTab === 'progress' &&
        currentProgressTab === 'tracks' && (
          <ProjectsComponentTrackTab projectTracks={projectTracks} />
        )}
      {currentDashboardTab === 'progress' &&
        currentProgressTab === 'skills' && <ProjectsSkillsTab />}
    </div>
  );
}
