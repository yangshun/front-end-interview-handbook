import Marquee from '~/components/ui/Marquee';

import ProjectsChallengeCard from '../challenges/lists/ProjectsChallengeCard';
import type { ProjectsChallengeItem } from '../challenges/types';
import useProfileWithProjectsProfile from '../common/useProfileWithProjectsProfile';

type Props = Readonly<{
  featuredChallenges: ReadonlyArray<ProjectsChallengeItem>;
}>;

export default function ProjectsMarketingFeaturedChallengesMarquee({
  featuredChallenges,
}: Props) {
  const { profile } = useProfileWithProjectsProfile();
  const isViewerPremium = profile?.projectsProfile?.premium ?? false;

  return (
    <div className="-mt-14 mb-16 h-auto lg:mb-32">
      <Marquee
        maskEdges={false}
        periodSeconds={featuredChallenges.length * 5}
        startEndGap={24}>
        <div className="flex gap-x-6 [&_>_*]:w-[352px]">
          {featuredChallenges.map((challenge) => (
            <ProjectsChallengeCard
              key={challenge.metadata.slug}
              challenge={challenge}
              isViewerPremium={isViewerPremium}
              variant="card"
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
}
