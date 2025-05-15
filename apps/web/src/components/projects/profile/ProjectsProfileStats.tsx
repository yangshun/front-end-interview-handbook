import MetricCard from '~/components/common/MetricCard';
import CardContainer from '~/components/ui/Card/CardContainer';
import Section from '~/components/ui/Heading/HeadingContext';

import useProjectsProfileStats from '../hooks/useProjectsProfileStats';

type Props = Readonly<{
  codeReviews: number | undefined;
  completedChallenges: number | undefined;
  isViewingOwnProfile: boolean;
  submissionViews: number | undefined;
  upvotes: number | undefined;
}>;

export default function ProjectsProfileStats({
  codeReviews,
  completedChallenges,
  isViewingOwnProfile,
  submissionViews,
  upvotes,
}: Props) {
  const stats = useProjectsProfileStats({
    codeReviews,
    completedChallenges,
    isViewingOwnProfile,
    submissionViews,
    upvotes,
  });

  return (
    <Section>
      <CardContainer className="grid grid-cols-2 gap-4 lg:gap-6 xl:grid-cols-4">
        {stats.map(({ count, icon: Icon, title }) => (
          <MetricCard key={title} count={count} icon={Icon} label={title} />
        ))}
      </CardContainer>
    </Section>
  );
}
