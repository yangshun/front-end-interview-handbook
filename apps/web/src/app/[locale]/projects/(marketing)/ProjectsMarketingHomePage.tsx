'use client';

import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';

import AuthGoogleOneTap from '~/components/auth/AuthGoogleOneTap';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsMarketingFeaturedChallengesMarquee from '~/components/projects/marketing/ProjectsMarketingFeaturedChallengesMarquee';
import ProjectsMarketingFeaturesRow from '~/components/projects/marketing/ProjectsMarketingFeaturesRow';
import ProjectsMarketingFutureToolkit from '~/components/projects/marketing/ProjectsMarketingFutureToolkit';
import ProjectsMarketingHero from '~/components/projects/marketing/ProjectsMarketingHero';
import ProjectsMarketingHowItWorks from '~/components/projects/marketing/ProjectsMarketingHowItWorks';
import ProjectsMarketingLearningFeatures from '~/components/projects/marketing/ProjectsMarketingLearningFeatures';
import ProjectsMarketingPortfolioFeatures from '~/components/projects/marketing/ProjectsMarketingPortfolioFeatures';
import Section from '~/components/ui/Heading/HeadingContext';

const ProjectsMarketingHomePageBottom = dynamic(
  () => import('../../projects/(marketing)/ProjectsMarketingHomePageBottom'),
  { ssr: false },
);

type Props = Readonly<{
  featuredChallenges: ReadonlyArray<ProjectsChallengeItem>;
}>;

export default function ProjectsMarketingHomePage({
  featuredChallenges,
}: Props) {
  const loadBottomHalfMarkerRef = useRef(null);
  const showBottomHalf = useInView(loadBottomHalfMarkerRef, {
    amount: 'some',
    once: true,
  });

  return (
    <main className="bg-white pb-24 dark:bg-neutral-900">
      <AuthGoogleOneTap next="/projects" />
      <ProjectsMarketingHero />
      <Section>
        <ProjectsMarketingFeaturedChallengesMarquee
          featuredChallenges={featuredChallenges}
        />
        <ProjectsMarketingFeaturesRow />
        <ProjectsMarketingHowItWorks />
        <ProjectsMarketingLearningFeatures />
        <ProjectsMarketingPortfolioFeatures />
        <ProjectsMarketingFutureToolkit />
        <div ref={loadBottomHalfMarkerRef} />
        {showBottomHalf && <ProjectsMarketingHomePageBottom />}
      </Section>
    </main>
  );
}
