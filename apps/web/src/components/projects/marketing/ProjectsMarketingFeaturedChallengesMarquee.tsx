import Marquee from '~/components/ui/Marquee';

import ProjectsChallengeCard from '../challenges/lists/ProjectsChallengeCard';
import type { ProjectsChallengeItem } from '../challenges/types';
import useUserProfileWithProjectsProfile from '../common/useUserProfileWithProjectsProfile';

type Props = Readonly<{
  featuredChallenges: ReadonlyArray<ProjectsChallengeItem>;
}>;

export default function ProjectsMarketingFeaturedChallengesMarquee({
  featuredChallenges,
}: Props) {
  const { userProfile } = useUserProfileWithProjectsProfile();
  const isViewerPremium = userProfile?.projectsProfile?.premium ?? false;

  return (
    <div className="-mt-20 h-auto">
      <Marquee
        maskEdges={false}
        periodSeconds={featuredChallenges.length * 10}
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
