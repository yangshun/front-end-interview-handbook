import clsx from 'clsx';

import MetricCard from '~/components/common/MetricCard';
import Card from '~/components/ui/Card';
import CardContainer from '~/components/ui/Card/CardContainer';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import useProjectsProfileStats from '../hooks/useProjectsProfileStats';
import { getFormattedNumber } from '../misc';

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
  submissionViews,
  upvotes,
  isViewingOwnProfile,
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
        {stats.map(({ title, count, icon: Icon }) => (
          <MetricCard key={title} count={count} icon={Icon} label={title} />
        ))}
      </CardContainer>
    </Section>
  );
}
