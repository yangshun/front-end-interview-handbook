'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import ProjectsAllChallengesTab from './ProjectsAllChallengesTab';
import ProjectsSkillsTab from './ProjectsSkillsTab';
import type { ProjectsMainLayoutTabCategory } from '../useProjectsMainLayoutTabs';
import useProjectsMainLayoutTabs from '../useProjectsMainLayoutTabs';
import ProjectsTrackSection from '../../tracks/ProjectsTrackSection';

type Props = Readonly<{
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userId?: string;
}>;

export default function ProjectsProgressSection({
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

  const { data: profile } = trpc.profile.getProfile.useQuery();

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
        <ProjectsAllChallengesTab userId={userId ?? profile?.id} />
      )}
      {currentProgressTab === 'tracks' && (
        <ProjectsTrackSection
          defaultOpen={true}
          projectTracks={projectTracks}
          userId={userId ?? profile?.id ?? null}
        />
      )}
      {
        currentProgressTab === 'skills' && <ProjectsSkillsTab /> // TODO: pass in id when skills tab data is being called
      }
    </div>
  );
}
