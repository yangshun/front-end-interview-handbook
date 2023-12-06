'use client';

import { useState } from 'react';
import {
  RiClipboardFill,
  RiCodeSSlashFill,
  RiQuestionAnswerFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsProject } from '~/components/projects/projects/types';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import ProjectDiscussions from './ProjectDiscussions';
import ReferenceSubmissions from './ReferenceSubmissions';

import type { User } from '@supabase/supabase-js';

export const exampleDiscussionPosts = [
  {
    author: {
      app_metadata: {
        provider: 'auth0',
      },
      aud: '',
      created_at: '',
      email: 'example@abc.com',
      id: 'user2',
      user_metadata: {
        avatar_url: 'https://source.unsplash.com/random/48x48',
        full_name: 'Jane Smith',
      },
    },
    content: 'Sample post content',
    id: '1',
    isQuestion: true,
    likeCount: 0,
    replyCount: 2,
  },
  {
    author: {
      app_metadata: {
        provider: 'auth0',
      },
      aud: '',
      created_at: '',
      email: 'example@abc.com',
      id: 'user2',
      user_metadata: {
        avatar_url: 'https://source.unsplash.com/random/48x48',
        full_name: 'Jane Smith',
      },
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
  project: ProjectsProject;
  user: User | null;
}>;

export default function ProjectsProjectTipsResourcesDiscussionsPage({
  project,
  user,
}: Props) {
  const intl = useIntl();
  const { slug } = project;
  const tipsResourcesDiscussionsTabs = useTipsResourcesDiscussionsTabs();
  const [tipsResourcesDiscussionsTab, setTipsResourcesDiscussionsTab] =
    useState<TipsResourcesDiscussionsTabType>('official-guides-resources');

  // TODO(projects): Replace below with actual logic
  const isUserPremium = false;

  return (
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
          <ProjectDiscussions posts={exampleDiscussionPosts} user={user} />
        )}
      </div>
    </div>
  );
}
