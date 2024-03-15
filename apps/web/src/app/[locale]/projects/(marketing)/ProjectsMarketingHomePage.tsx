'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsMarketingFeatures from '~/components/projects/marketing/ProjectsMarketingFeatures';
import ProjectsMarketingHero from '~/components/projects/marketing/ProjectsMarketingHero';
import ProjectsMarketingHomepageFeaturesRow from '~/components/projects/marketing/ProjectsMarketingHomepageFeaturesRow';
import ProjectsMarketingHowItWorks from '~/components/projects/marketing/ProjectsMarketingHowItWorks';
import ProjectsMarketingSkillsTracksProjects from '~/components/projects/marketing/ProjectsMarketingSkillsTracksProjects';
import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import Section from '~/components/ui/Heading/HeadingContext';

const MarketingHomePageBottom = dynamic(
  () => import('../../(standard)/(marketing)/MarketingHomePageBottom'),
  { ssr: false },
);

type Props = Readonly<{
  featuredChallenges: ReadonlyArray<ProjectsChallengeItem>;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsMarketingHomePage({
  featuredChallenges,
  projectTracks,
}: Props) {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <main className="bg-white pb-24 dark:bg-[#070708]">
      <ProjectsMarketingHero />
      <Section>
        <ProjectsMarketingHomepageFeaturesRow />
        <ProjectsMarketingHowItWorks />
        <ProjectsMarketingSkillsTracksProjects
          featuredChallenges={featuredChallenges}
          hiddenTracks={projectTracks}
          projectTracks={projectTracks}
        />
        <ProjectsMarketingFeatures />
        <div ref={loadBottomHalfMarkerRef} />
        {showBottomHalf && <MarketingHomePageBottom />}
      </Section>
    </main>
  );
}
