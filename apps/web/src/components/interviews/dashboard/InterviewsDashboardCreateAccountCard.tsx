import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';
import { RiArrowRightSLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderColor,
  themeTextBrandColor_GroupHover,
} from '~/components/ui/theme';

import InterviewsDashboardContinueLearningSection from './InterviewsDashboardContinueLearningSection';

function MockContinueLearningCard({ studyListsMap }: Props) {
  return (
    <InterviewsDashboardContinueLearningSection
      hideHeading={true}
      playbookProgress={[]}
      questionListSessions={[
        {
          _count: {
            progress: 8,
          },
          createdAt: new Date(),
          id: 'id1',
          key: 'design-system-components',
          status: 'IN_PROGRESS',
          stoppedAt: null,
          updatedAt: new Date(),
          userId: 'user1',
        },
        {
          _count: {
            progress: 4,
          },
          createdAt: new Date(),
          id: 'id2',
          key: 'async-operations',
          status: 'IN_PROGRESS',
          stoppedAt: null,
          updatedAt: new Date(),
          userId: 'user1',
        },
      ]}
      studyListsMap={studyListsMap}
      variant="combined"
    />
  );
}

type Props = Readonly<{
  studyListsMap: Record<string, InterviewsStudyList>;
}>;

export default function InterviewsDashboardCreateAccountCard({
  studyListsMap,
}: Props) {
  const { signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'group relative flex w-full justify-between',
        'overflow-hidden rounded-lg',
        'h-16',
        'shadow-md',
        themeBackgroundColor,
        ['border', themeBorderColor],
      )}>
      <div className={clsx('relative h-16 w-36 shrink-0', 'overflow-clip')}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[650px] origin-top-left scale-[0.4] p-4"
          // So that focus cannot go into the card, which is not meant to be used.
          inert="">
          <MockContinueLearningCard studyListsMap={studyListsMap} />
        </div>
        <div
          className={clsx(
            'size-full absolute',
            'bg-[linear-gradient(90deg,_#D9D9D900_45.68%,#fff_93.88%)] dark:bg-[linear-gradient(90deg,_#18181B00_45.68%,_#18181B_93.88%)]',
          )}
        />
        <div
          className={clsx(
            'size-full absolute',
            'bg-[linear-gradient(177.01deg,_#D9D9D900_38.82%,#fff_92.48%)] dark:bg-[linear-gradient(177deg,_#18181B00_45.68%,_#18181B_93.88%)]',
          )}
        />
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 p-4">
        <Anchor href={signInUpHref()} variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text className="block" color="subtitle" size="body3" weight="medium">
            <FormattedMessage
              defaultMessage="Create a free account to track your progress"
              description="CTA to create a free account for non-logged in users"
              id="Lh00HQ"
            />
          </Text>
        </Anchor>
        <RiArrowRightSLine
          aria-hidden={true}
          className={clsx(
            'size-5 shrink-0 text-neutral-500 dark:text-neutral-400',
            themeTextBrandColor_GroupHover,
          )}
        />
      </div>
    </div>
  );
}
