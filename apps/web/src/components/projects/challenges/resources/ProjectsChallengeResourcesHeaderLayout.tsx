'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import {
  RiClipboardFill,
  RiCodeSSlashFill,
  RiQuestionAnswerFill,
  RiVerifiedBadgeFill,
} from 'react-icons/ri';

import BlurOverlay from '~/components/common/BlurOverlay';
import { FormattedMessage, useIntl } from '~/components/intl';
import type { ProjectsPremiumAccessControlFields } from '~/components/projects/challenges/premium/ProjectsPremiumAccessControl';
import { useProjectsChallengeSessionContext } from '~/components/projects/challenges/session/ProjectsChallengeSessionContext';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import type { ProjectsViewerProjectsProfile } from '~/components/projects/types';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Spinner from '~/components/ui/Spinner';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeContentPaywall from '../premium/ProjectsChallengeContentPaywall';
import ProjectsStartButton from '../../common/ProjectsStartButton';

type ProjectsChallengeResourcesDiscussionsTabType =
  | 'discussions'
  | 'guides'
  | 'solutions'
  | 'submissions';

function useTipsResourcesDiscussionsTabs(challenge: ProjectsChallengeItem) {
  const intl = useIntl();
  const { metadata } = challenge;
  const tabs: Array<TabItem<ProjectsChallengeResourcesDiscussionsTabType>> = [
    {
      href: metadata.resourcesGuidesHref,
      icon: RiClipboardFill,
      label: intl.formatMessage({
        defaultMessage: 'Guides',
        description: 'Projects guides',
        id: 'QwEkIl',
      }),
      value: 'guides',
    },
    {
      href: metadata.resourcesDiscussionsHref,
      icon: RiQuestionAnswerFill,
      label: intl.formatMessage({
        defaultMessage: 'Discussions',
        description: 'Projects forum',
        id: '9D27sg',
      }),
      value: 'discussions',
    },
    {
      href: metadata.resourcesSubmissionsHref,
      icon: RiCodeSSlashFill,
      label: intl.formatMessage({
        defaultMessage: 'Reference submissions',
        description: 'Reference code for projects',
        id: 'Q+qNTr',
      }),
      value: 'submissions',
    },
  ];

  if (metadata.solutionFrameworks?.[0]) {
    tabs.push({
      href: metadata.resourcesSolutionsHref,
      icon: RiVerifiedBadgeFill,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions',
        description: 'Reference code for projects',
        id: '+9bM81',
      }),
      value: 'solutions',
    });
  }

  return tabs;
}

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  children: React.ReactNode;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

const DEFAULT_TAB: ProjectsChallengeResourcesDiscussionsTabType = 'guides';

export default function ProjectsChallengeResourcesHeaderLayout({
  children,
  challenge,
  viewerAccess,
  viewerProjectsProfile,
}: Props) {
  const intl = useIntl();
  const pathname = usePathname();
  const tipsResourcesDiscussionsTabs =
    useTipsResourcesDiscussionsTabs(challenge);

  const currentTabValue: ProjectsChallengeResourcesDiscussionsTabType =
    useMemo(() => {
      const tab = tipsResourcesDiscussionsTabs.find((tabItem) =>
        pathname?.startsWith(tabItem.href ?? ''),
      );

      return tab?.value ?? DEFAULT_TAB;
    }, [pathname, tipsResourcesDiscussionsTabs]);

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
            value={currentTabValue}
          />
          {accessAllSteps ? (
            children
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
