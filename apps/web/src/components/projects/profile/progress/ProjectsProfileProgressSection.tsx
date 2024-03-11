'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import ProjectsProfileProgressAllChallengesTab from './ProjectsProfileProgressAllChallengesTab';
import ProjectsProfileProgressSkillsTab from './ProjectsProfileProgressSkillsTab';
import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';
import type { ProjectsMainLayoutTabCategory } from '../../common/useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from '../../common/useProjectsMainLayoutTabs';
import ProjectsTrackSection from '../../tracks/ProjectsTrackSection';

type Props = Readonly<{
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userId?: string;
}>;

export default function ProjectsProfileProgressSection({
  projectTracks,
  userId,
}: Props) {
  const intl = useIntl();
  const mainLayoutTabs = useProjectsMainLayoutTabs();
  const progressTabs: ReadonlyArray<TabItem<ProjectsMainLayoutTabCategory>> =
    mainLayoutTabs.map((tab) => ({
      key: tab.key,
      label: tab.label,
      type: tab.type,
      value: tab.key,
    }));
  const [currentProgressTab, setCurrentProgressTab] =
    useState<ProjectsMainLayoutTabCategory>('challenges');
  const { profile } = useProfileWithProjectsProfile();

  return (
    <div className="flex flex-col gap-8">
      <Tabs
        hasBorder={false}
        label={intl.formatMessage({
          defaultMessage: 'Select project category',
          description: 'Tab label to select another project category',
          id: 'GcmSpX',
        })}
        scrollToTop={false}
        size="sm"
        tabs={progressTabs}
        value={currentProgressTab}
        onSelect={setCurrentProgressTab}
      />
      {currentProgressTab === 'challenges' && (
        <ProjectsProfileProgressAllChallengesTab
          userId={userId ?? profile?.id}
        />
      )}
      {currentProgressTab === 'tracks' && (
        <ProjectsTrackSection
          defaultOpen={true}
          projectTracks={projectTracks}
          userId={userId ?? profile?.id ?? null}
          viewerIsPremium={profile?.projectsProfile?.premium ?? false}
        />
      )}
      {
        currentProgressTab === 'skills' && <ProjectsProfileProgressSkillsTab /> // TODO(projects): pass in id when skills tab data is being called
      }
    </div>
  );
}
