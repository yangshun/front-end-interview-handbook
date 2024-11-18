import clsx from 'clsx';
import { RiArrowRightSLine } from 'react-icons/ri';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { FormattedMessage, useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeTextBrandColor_GroupHover,
} from '~/components/ui/theme';

import InterviewsDashboardContinueLearning from './InterviewsDashboardContinueLearning';

function MockContinueLearningCard() {
  const intl = useIntl();

  // TODO(interviews): Migrate to InterviewsDashboardContinueLearningSection
  // and delete InterviewsDashboardContinueLearning
  return (
    <InterviewsDashboardContinueLearning
      hideHeading={true}
      items={[
        {
          completedCount: 36,
          durationMins: 92,
          href: '#',
          questionsCount: 50,
          reverseGradient: true,
          title: intl.formatMessage({
            defaultMessage: 'Accessibility',
            description: 'Title of study plan',
            id: 'qzlnBr',
          }),
        },
        {
          completedCount: 24,
          durationMins: 92,
          href: '#',
          questionsCount: 47,
          reverseGradient: true,
          title: intl.formatMessage({
            defaultMessage: 'Design system components',
            description: 'Title of study plan',
            id: '/FjDQ0',
          }),
        },
      ]}
    />
  );
}

export default function InterviewsDashboardCreateAccountCard() {
  const { signInUpHref } = useAuthSignInUp();

  return (
    <div
      className={clsx(
        'group relative flex w-full justify-between',
        'border border-neutral-200 dark:border-transparent',
        'overflow-hidden rounded-lg',
        themeBackgroundCardColor,
        themeBackgroundElementEmphasizedStateColor_Hover,
      )}>
      <div
        className={clsx(
          'relative h-20 w-36 shrink-0',
          'overflow-clip',
          'bg-neutral-200/70 dark:bg-neutral-900',
        )}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[650px] origin-top-left scale-[0.4] p-4"
          // So that focus cannot go into the card, which is not meant to be used.
          inert="">
          <MockContinueLearningCard />
        </div>
        <div className="size-full absolute bg-gradient-to-t from-neutral-200/70 dark:from-neutral-900" />
      </div>
      <div className="flex flex-1 items-center justify-between gap-2 p-4">
        <Anchor href={signInUpHref()} variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text className="block" size="body3">
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
