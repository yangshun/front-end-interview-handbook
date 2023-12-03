'use client';

import { useState } from 'react';
import {
  RiClipboardFill,
  RiCodeSSlashFill,
  RiQuestionAnswerFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsProjectBreakdownTabsImpl from '~/components/projects/layout/ProjectsProjectBreakdownTabsImpl';
import ProjectsProjectHeader from '~/components/projects/projects/ProjectsProjectHeader';
import type { ProjectsProject } from '~/components/projects/projects/types';
import Container from '~/components/ui/Container';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import ReferenceSubmissions from './ReferenceSubmissions';

type TipsResourcesDiscussionsTabType =
  | 'official-guides-resources'
  | 'project-discussions'
  | 'reference-submissions';

function useTipsResourcesDiscussionsTabs() {
  const tabs: Array<TabItem<TipsResourcesDiscussionsTabType>> = [
    {
      icon: RiClipboardFill,
      label: 'Official guides & resources',
      value: 'official-guides-resources',
    },
    {
      icon: RiCodeSSlashFill,
      label: 'Reference submissions',
      value: 'reference-submissions',
    },
    {
      icon: RiQuestionAnswerFill,
      label: 'Project discussions',
      value: 'project-discussions',
    },
  ];

  return tabs;
}

type Props = Readonly<{
  project: ProjectsProject;
}>;

export default function ProjectsProjectTipsResourcesDiscussionsPage({
  project,
}: Props) {
  const intl = useIntl();
  const { slug } = project;
  const tipsResourcesDiscussionsTabs = useTipsResourcesDiscussionsTabs();
  const [tipsResourcesDiscussionsTab, setTipsResourcesDiscussionsTab] =
    useState<TipsResourcesDiscussionsTabType>('official-guides-resources');

  // TODO(projects): Replace below with actual logic
  const isUserPremium = false;

  return (
    <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16">
      <ProjectsProjectHeader project={project} />
      <ProjectsProjectBreakdownTabsImpl
        className="mt-16"
        slug={slug}
        value="tips-resources-discussions"
      />
      <div className="mt-16 flex flex-col gap-y-8">
        <Tabs
          label={intl.formatMessage({
            defaultMessage: 'Select tip type',
            description: 'Label for tabs to select tip type',
            id: 'LNxxS2',
          })}
          size="sm"
          tabs={tipsResourcesDiscussionsTabs}
          value={tipsResourcesDiscussionsTab}
          onSelect={setTipsResourcesDiscussionsTab}
        />
        {tipsResourcesDiscussionsTab === 'reference-submissions' && (
          <ReferenceSubmissions />
        )}
      </div>
    </Container>
  );
}
