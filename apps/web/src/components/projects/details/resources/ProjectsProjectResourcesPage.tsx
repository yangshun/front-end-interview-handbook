'use client';

import { useState } from 'react';
import {
  RiClipboardFill,
  RiCodeSSlashFill,
  RiQuestionAnswerFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import type { ProjectsProjectItem } from '~/components/projects/details/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import ReferenceSubmissions from './ReferenceSubmissions';
import ProjectsProjectDiscussions from '../discussions/ProjectsProjectDiscussions';
import { useProjectsProjectSessionContext } from '../ProjectsProjectSessionContext';

import type { User } from '@supabase/supabase-js';

type TipsResourcesDiscussionsTabType = 'discussions' | 'guides' | 'references';

function useTipsResourcesDiscussionsTabs() {
  const tabs: Array<TabItem<TipsResourcesDiscussionsTabType>> = [
    {
      icon: RiQuestionAnswerFill,
      label: 'Project discussions',
      value: 'discussions',
    },
    {
      icon: RiClipboardFill,
      label: 'Guides',
      value: 'guides',
    },
    {
      icon: RiCodeSSlashFill,
      label: 'Reference code',
      value: 'references',
    },
  ];

  return tabs;
}

type Props = Readonly<{
  project: ProjectsProjectItem;
  user: User | null;
}>;

export default function ProjectsProjectResourcesPage({ project, user }: Props) {
  const intl = useIntl();
  const tipsResourcesDiscussionsTabs = useTipsResourcesDiscussionsTabs();
  const [tipsResourcesDiscussionsTab, setTipsResourcesDiscussionsTab] =
    useState<TipsResourcesDiscussionsTabType>('discussions');

  // TODO(projects): Replace below with actual logic
  const isUserPremium = false;

  const { startProject, session } = useProjectsProjectSessionContext();
  const hasSession = session != null;

  return (
    <BlurOverlay
      align="center"
      disableOverlay={hasSession}
      overlay={
        <div className="flex flex-col gap-y-6 items-center max-w-lg mx-auto text-center">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Start the project to access guides, discussions and reference code"
              description="Title for project overlay on projects details page"
              id="5ozhak"
            />
          </Heading>
          <Button
            label={intl.formatMessage({
              defaultMessage: 'Start project',
              description: 'Start Project button label',
              id: 'Se4xmG',
            })}
            size="lg"
            variant="primary"
            onClick={startProject}
          />
        </div>
      }>
      <div className="flex flex-col items-stretch">
        <div className="flex flex-col gap-y-8">
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
          {tipsResourcesDiscussionsTab === 'references' && (
            <ReferenceSubmissions />
          )}
          {tipsResourcesDiscussionsTab === 'discussions' && (
            <ProjectsProjectDiscussions project={project} />
          )}
        </div>
      </div>
    </BlurOverlay>
  );
}
