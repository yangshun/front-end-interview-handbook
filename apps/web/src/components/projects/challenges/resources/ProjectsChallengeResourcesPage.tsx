'use client';

import clsx from 'clsx';
import type {
  ProjectsChallengeGuide,
  ProjectsCommonGuide,
} from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiClipboardFill,
  RiCodeSSlashFill,
  RiQuestionAnswerFill,
  RiVerifiedBadgeFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { PROJECTS_OFFICIAL_SOLUTIONS_IS_LIVE } from '~/data/FeatureFlags';

import BlurOverlay from '~/components/common/BlurOverlay';
import ProjectsChallengeDiscussionsSection from '~/components/projects/challenges/discussions/ProjectsChallengeDiscussionsSection';
import ProjectsChallengeReferenceSubmissions from '~/components/projects/challenges/resources/ProjectsChallengeReferenceSubmissions';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeOfficialSolutionSection from './ProjectsChallengeOfficialSolutionSection';
import ProjectsChallengeGuideSection from '../guides/ProjectsChallengeGuideSection';
import ProjectsChallengeContentPaywall from '../premium/ProjectsChallengeContentPaywall';
import type { ProjectsPremiumAccessControlFields } from '../premium/ProjectsPremiumAccessControl';
import ProjectsStartButton from '../../common/ProjectsStartButton';
import type { ProjectsViewerProjectsProfile } from '../../types';

type ProjectsChallengeResourcesDiscussionsTabType =
  | 'discussions'
  | 'guides'
  | 'official_solutions'
  | 'reference_submissions';

function useTipsResourcesDiscussionsTabs() {
  const intl = useIntl();

  const tabs: Array<TabItem<ProjectsChallengeResourcesDiscussionsTabType>> = [
    {
      icon: RiClipboardFill,
      label: intl.formatMessage({
        defaultMessage: 'Guides',
        description: 'Projects guides',
        id: 'QwEkIl',
      }),
      value: 'guides',
    },
    {
      icon: RiQuestionAnswerFill,
      label: intl.formatMessage({
        defaultMessage: 'Discussions',
        description: 'Projects forum',
        id: '9D27sg',
      }),
      value: 'discussions',
    },
    {
      icon: RiCodeSSlashFill,
      label: intl.formatMessage({
        defaultMessage: 'Reference submissions',
        description: 'Reference code for projects',
        id: 'Q+qNTr',
      }),
      value: 'reference_submissions',
    },
  ];

  if (PROJECTS_OFFICIAL_SOLUTIONS_IS_LIVE) {
    tabs.push({
      icon: RiVerifiedBadgeFill,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions',
        description: 'Reference code for projects',
        id: '+9bM81',
      }),
      value: 'official_solutions',
    });
  }

  return tabs;
}

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  challengeGuide: ProjectsChallengeGuide | null;
  commonGuides: ReadonlyArray<ProjectsCommonGuide>;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeResourcesPage({
  challenge,
  challengeGuide,
  commonGuides,
  viewerProjectsProfile,
  viewerAccess,
}: Props) {
  const intl = useIntl();
  const tipsResourcesDiscussionsTabs = useTipsResourcesDiscussionsTabs();
  const [tipsResourcesDiscussionsTab, setTipsResourcesDiscussionsTab] =
    useState<ProjectsChallengeResourcesDiscussionsTabType>('guides');

  const { accessAllSteps, fetchingCanAccessAllSteps } =
    useProjectsChallengeSessionContext();

  const showPaywall =
    viewerAccess.viewChallenge !== 'UNLOCKED' &&
    viewerAccess.viewChallenge !== 'ACCESSIBLE_TO_EVERYONE';
  const overlay = showPaywall ? (
    <ProjectsChallengeContentPaywall
      slug={challenge.metadata.slug}
      viewerContentAccess={viewerAccess.viewChallenge}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  ) : (
    <div
      className={clsx(
        'flex flex-col items-center gap-y-6',
        'mx-auto max-w-lg',
        'text-center',
      )}>
      {fetchingCanAccessAllSteps ? (
        <div className="py-10">
          <Spinner display="block" />
        </div>
      ) : (
        <>
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Start the project to access guides, discussions and reference code"
              description="Title for project overlay on projects details page"
              id="5ozhak"
            />
          </Heading>
          <div>
            <ProjectsStartButton
              slug={challenge.metadata.slug}
              viewerContentAccess={viewerAccess.viewChallenge}
              viewerProjectsProfile={viewerProjectsProfile}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <BlurOverlay
      align="center"
      overlay={overlay}
      showOverlay={showPaywall || !accessAllSteps}>
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
          {accessAllSteps ? (
            tipsResourcesDiscussionsTab === 'discussions' ? (
              <ProjectsChallengeDiscussionsSection challenge={challenge} />
            ) : tipsResourcesDiscussionsTab === 'guides' ? (
              <ProjectsChallengeGuideSection
                challengeGuide={challengeGuide}
                commonGuides={commonGuides}
                relevantGuides={challenge.metadata.guides}
                slug={challenge.metadata.slug}
                viewerGuidesAccess={viewerAccess.viewGuides}
                viewerProjectsProfile={viewerProjectsProfile}
              />
            ) : tipsResourcesDiscussionsTab === 'reference_submissions' ? (
              <ProjectsChallengeReferenceSubmissions challenge={challenge} />
            ) : (
              tipsResourcesDiscussionsTab === 'official_solutions' && (
                <ProjectsChallengeOfficialSolutionSection />
              )
            )
          ) : (
            <div
              className={clsx(
                'w-full rounded-lg py-10',
                'border',
                themeBorderColor,
              )}>
              <EmptyState
                subtitle="Be the first to leave a comment"
                title="No comments yet"
              />
            </div>
          )}
        </div>
      </div>
    </BlurOverlay>
  );
}
