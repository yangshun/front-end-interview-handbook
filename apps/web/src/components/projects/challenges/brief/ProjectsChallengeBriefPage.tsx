'use client';

import type { ProjectsChallengeBrief } from 'contentlayer/generated';

import BlurOverlay from '~/components/common/BlurOverlay';
import { FormattedMessage } from '~/components/intl';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';

import ProjectsChallengeBriefFAQSection from './ProjectsChallengeBriefFAQSection';
import ProjectsChallengeBriefImageCarousel from './ProjectsChallengeBriefImageCarousel';
import ProjectsChallengeBriefProvidedResources from './ProjectsChallengeBriefProvidedResources';
import ProjectsChallengeBriefSupportSection from './ProjectsChallengeBriefSupportSection';
import ProjectsChallengeContentPaywall from '../premium/ProjectsChallengeContentPaywall';
import type { ProjectsPremiumAccessControlFields } from '../premium/ProjectsPremiumAccessControl';
import type { ProjectsViewerProjectsProfile } from '../../types';
import MDXContent from '../../../mdx/MDXContent';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  challengeBrief: ProjectsChallengeBrief | undefined;
  viewerAccess: ProjectsPremiumAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeBriefPage({
  challenge,
  challengeBrief,
  viewerProjectsProfile,
  viewerAccess,
}: Props) {
  const showPaywall =
    viewerAccess.viewChallenge !== 'UNLOCKED' &&
    viewerAccess.viewChallenge !== 'ACCESSIBLE_TO_EVERYONE';

  return (
    <BlurOverlay
      align="center"
      overlay={
        <ProjectsChallengeContentPaywall
          slug={challenge.metadata.slug}
          viewerContentAccess={viewerAccess.viewChallenge}
          viewerProjectsProfile={viewerProjectsProfile}
        />
      }
      showOverlay={showPaywall}>
      <div className="flex flex-col items-stretch gap-20 pb-40">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="lg:hidden">
              <ProjectsChallengeBriefImageCarousel
                images={challenge.metadata.galleryImages}
              />
            </div>
            {challengeBrief && (
              <div className="flex flex-col gap-6">
                <Heading level="heading6">
                  <FormattedMessage
                    defaultMessage="Project brief"
                    description="Title for Project Brief section on Projects project page"
                    id="S98EuF"
                  />
                </Heading>
                <Section>
                  <Prose textSize="sm">
                    <MDXContent mdxCode={challengeBrief.body.code} />
                  </Prose>
                </Section>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="hidden lg:block">
              <ProjectsChallengeBriefImageCarousel
                images={challenge.metadata.galleryImages}
              />
            </div>
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Resources provided"
                description="Title for Assets Provided section on Projects project page"
                id="R+pt9h"
              />
            </Heading>
            <Section>
              <ProjectsChallengeBriefProvidedResources
                resources={challenge.metadata.resources}
              />
            </Section>
          </div>
        </div>
        <ProjectsChallengeBriefSupportSection />
        <ProjectsChallengeBriefFAQSection />
      </div>
    </BlurOverlay>
  );
}
