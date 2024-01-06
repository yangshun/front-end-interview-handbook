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

import ProjectDiscussions from './ProjectDiscussions';
import ReferenceSubmissions from './ReferenceSubmissions';
import { useProjectsProjectSessionContext } from '../ProjectsProjectSessionContext';

import type { User } from '@supabase/supabase-js';

export const exampleDiscussionPosts = [
  {
    author: {
      avatarUrl: 'https://source.unsplash.com/random/48x48',
      bio: null,
      createdAt: new Date(),
      currentStatus: null,
      githubUsername: null,
      id: '123',
      linkedInUsername: null,
      name: 'John Smith',
      plan: null,
      premium: false,
      startWorkDate: null,
      stripeCustomer: null,
      title: 'Front End Engineer',
      updatedAt: new Date(),
      username: 'johnsmith',
      website: null,
    },
    content: 'Sample post content',
    id: '1',
    isQuestion: true,
    likeCount: 0,
    replyCount: 2,
  },
  {
    author: {
      avatarUrl: 'https://source.unsplash.com/random/48x48',
      bio: null,
      createdAt: new Date(),
      currentStatus: null,
      githubUsername: null,
      id: '124',
      linkedInUsername: null,
      name: 'Jane Smith',
      plan: null,
      premium: false,
      startWorkDate: null,
      stripeCustomer: null,
      title: 'Front End Engineer',
      updatedAt: new Date(),
      username: 'janesmith',
      website: null,
    },
    content: 'Sample post content',
    id: '2',
    isQuestion: false,
    likeCount: 0,
    replyCount: 2,
  },
];

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
  project: ProjectsProjectItem;
  user: User | null;
}>;

export default function ProjectsProjectResourcesPage({ project, user }: Props) {
  const intl = useIntl();
  const tipsResourcesDiscussionsTabs = useTipsResourcesDiscussionsTabs();
  const [tipsResourcesDiscussionsTab, setTipsResourcesDiscussionsTab] =
    useState<TipsResourcesDiscussionsTabType>('official-guides-resources');

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
          {tipsResourcesDiscussionsTab === 'reference-submissions' && (
            <ReferenceSubmissions />
          )}
          {tipsResourcesDiscussionsTab === 'project-discussions' && (
            <ProjectDiscussions posts={exampleDiscussionPosts} />
          )}
        </div>
      </div>
    </BlurOverlay>
  );
}
