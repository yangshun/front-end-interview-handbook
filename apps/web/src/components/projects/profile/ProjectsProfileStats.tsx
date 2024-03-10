import clsx from 'clsx';

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
        {stats.map(({ title, count, icon: Icon }) => {
          return (
            <Card
              key={title}
              className="group/card relative isolate flex flex-col items-start justify-between gap-3 px-4 py-4 md:px-6"
              padding={false}>
              <div className="flex items-center gap-2">
                <span
                  className={clsx(
                    'size-9 hidden items-center justify-center rounded-md md:inline-flex',
                    themeBackgroundChipColor,
                    themeTextSecondaryColor,
                    'border border-transparent transition',
                    'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
                    'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
                  )}>
                  <Icon aria-hidden={true} className="size-5" />
                </span>
                <Text color="secondary" size="body2" weight="medium">
                  {title}
                </Text>
              </div>
              <Text
                className="text-4xl font-bold md:text-5xl"
                size="inherit"
                weight="inherit">
                {count ? getFormattedNumber(count) : '-'}
              </Text>
            </Card>
          );
        })}
      </CardContainer>
    </Section>
  );
}
