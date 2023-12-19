'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import ProjectsMarketingFeatures from '~/components/projects/marketing/ProjectsMarketingFeatures';
import ProjectsMarketingHero from '~/components/projects/marketing/ProjectsMarketingHero';
import ProjectsMarketingHomepageFeaturesRow from '~/components/projects/marketing/ProjectsMarketingHomepageFeaturesRow';
import ProjectsMarketingSkillsTracksProjects from '~/components/projects/marketing/ProjectsMarketingSkillsTracksProjects';
import type { ProjectsProjectMetadata } from '~/components/projects/projects/types';
import Section from '~/components/ui/Heading/HeadingContext';

const MarketingHomePageBottom = dynamic(
  () => import('../../(standard)/(marketing)/MarketingHomePageBottom'),
  { ssr: false },
);

type Props = Readonly<{
  featuredProjects: ReadonlyArray<ProjectsProjectMetadata>;
}>;

export default function ProjectsMarketingHomePage({ featuredProjects }: Props) {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <main className="bg-[#070708] pb-24" data-mode="dark">
      <ProjectsMarketingHero />
      <Section>
        <ProjectsMarketingHomepageFeaturesRow />
        <ProjectsMarketingSkillsTracksProjects
          featuredProjects={featuredProjects}
        />
        <ProjectsMarketingFeatures />
        <div ref={loadBottomHalfMarkerRef} />
        {showBottomHalf && <MarketingHomePageBottom />}
      </Section>
    </main>
  );
}
