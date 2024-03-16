'use client';

import type { ProjectsChallengeBrief } from 'contentlayer/generated';
import { FormattedMessage } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
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
import ProjectsChallengeMdxContent from '../../common/ProjectsChallengeMdxContent';
import type { ProjectsViewerProjectsProfile } from '../../types';

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
  const showPaywall = viewerAccess.viewChallenge !== 'YES';

  // TODO(projects): Add real images url
  const images = [
    `https://source.unsplash.com/random/640x360?random=${Math.random()}`,
    `https://source.unsplash.com/random/640x560?random=${Math.random()}`,
    `https://source.unsplash.com/random/340x260?random=${Math.random()}`,
    `https://source.unsplash.com/random/140x360?random=${Math.random()}`,
    `https://source.unsplash.com/random/940x360?random=${Math.random()}`,
    `https://source.unsplash.com/random/240x160?random=${Math.random()}`,
  ];

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
        <div className="grid grid-cols-1 gap-6 gap-y-12 lg:grid-cols-2">
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
                  <ProjectsChallengeMdxContent
                    mdxCode={challengeBrief.body.code}
                  />
                </Prose>
              </Section>
            </div>
          )}
          <div className="flex flex-col gap-6">
            <ProjectsChallengeBriefImageCarousel images={images} />
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Resources provided"
                description="Title for Assets Provided section on Projects project page"
                id="R+pt9h"
              />
            </Heading>
            <Section>
              <ProjectsChallengeBriefProvidedResources />
            </Section>
          </div>
        </div>
        <ProjectsChallengeBriefSupportSection />
        <ProjectsChallengeBriefFAQSection />
      </div>
    </BlurOverlay>
  );
}
