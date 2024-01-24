'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import ProjectsAllChallengesTab from './ProjectsAllChallengesTab';
import ProjectsContributionListWithFilters from './ProjectsContributionListWithFilters';
import ProjectsSkillsTab from './ProjectsSkillsTab';
import type { ProjectsMainTabCategory } from './useProjectsCategoryTabs';
import useProjectsCategoryTabs from './useProjectsCategoryTabs';
import type { ProjectsMainLayoutTabCategory } from './useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from './useProjectsMainLayoutTabs';
import ProjectsTrackSection from '../tracks/ProjectsTrackSection';

import type {
  DiscussionComment,
  DiscussionCommentDomain,
} from '@prisma/client';

export type ContributionComment = DiscussionComment & {
  author: {
    avatarUrl: string | null;
    name: string | null;
    username: string;
  };
} & {
  entity?: {
    href: string;
    title: string;
  } | null;
} & {
  parentComment: {
    author: {
      avatarUrl: string | null;
      name: string | null;
      username: string;
    };
  } | null;
};

type Props = Readonly<{
  currentTab: ProjectsMainTabCategory;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsProgressAndContributionsSection({
  currentTab,
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
  const [currentDashboardTab, setCurrentDashboardTab] =
    useState<ProjectsMainTabCategory>(currentTab);
  const [currentProgressTab, setCurrentProgressTab] =
    useState<ProjectsMainLayoutTabCategory>('challenges');

  const domainList: Array<DiscussionCommentDomain> = [
    'PROJECTS_SUBMISSION',
    'PROJECTS_CHALLENGE',
  ];
  const { data: comments } = trpc.comments.listUserComments.useQuery({
    domainList,
  });

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
        <ProjectsContributionListWithFilters comments={comments ?? []} />
      )}
      {currentDashboardTab === 'progress' &&
        currentProgressTab === 'challenges' && <ProjectsAllChallengesTab />}
      {currentDashboardTab === 'progress' &&
        currentProgressTab === 'tracks' && (
          <ProjectsTrackSection
            defaultOpen={true}
            projectTracks={projectTracks}
          />
        )}
      {currentDashboardTab === 'progress' &&
        currentProgressTab === 'skills' && <ProjectsSkillsTab />}
    </div>
  );
}
