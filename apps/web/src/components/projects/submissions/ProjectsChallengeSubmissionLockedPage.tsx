'use client';

import clsx from 'clsx';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsChallengeSubmissionHero from '~/components/projects/submissions/hero/ProjectsChallengeSubmissionHero';
import ProjectsChallengeSubmissionAuthorProfile from '~/components/projects/submissions/ProjectsChallengeSubmissionAuthorProfile';
import type { ProjectsChallengeSubmissionAugmented } from '~/components/projects/submissions/types';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeBorderColor } from '~/components/ui/theme';

import ProjectsChallengeSubmissionPaywall from '../challenges/premium/ProjectsChallengeSubmissionPaywall';
import type { ProjectsPremiumAccessControlFields } from '../challenges/premium/ProjectsPremiumAccessControl';
import type { ProjectsViewerProjectsProfile } from '../types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  submission: ProjectsChallengeSubmissionAugmented;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerId: string | null;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeSubmissionLockedPage({
  challenge,
  submission,
  viewerAccess,
  viewerId,
  viewerProjectsProfile,
}: Props) {
  const parentRef = useRef(null);
  const isParentInView = useInView(parentRef);
  const isViewingOwnSubmission =
    viewerId === submission.projectsProfile?.userProfile?.id;
  const isViewerPremium = viewerProjectsProfile?.premium;

  return (
    <div ref={parentRef} className="-mt-4 flex flex-col lg:-mt-16">
      <ProjectsChallengeSubmissionHero
        challenge={challenge}
        isParentInView={isParentInView}
        isViewerPremium={isViewerPremium ?? false}
        isViewingOwnSubmission={isViewingOwnSubmission}
        submission={submission}
      />
      <Section>
        <div className={clsx('flex flex-col gap-12', 'mt-10 lg:mt-16')}>
          {submission.projectsProfile?.userProfile && (
            <ProjectsChallengeSubmissionAuthorProfile
              points={submission.projectsProfile.points}
              premium={submission.projectsProfile.premium}
              userProfile={submission.projectsProfile.userProfile}
            />
          )}
          <div
            className={clsx(
              'flex items-center justify-center',
              'min-h-96 rounded-lg',
              ['border', themeBorderColor],
            )}>
            <ProjectsChallengeSubmissionPaywall
              slug={challenge.metadata.slug}
              viewerContentAccess={viewerAccess.viewSubmission}
              viewerProjectsProfile={viewerProjectsProfile}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
