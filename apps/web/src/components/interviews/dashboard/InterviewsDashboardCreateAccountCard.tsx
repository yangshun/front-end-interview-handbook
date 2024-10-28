import clsx from 'clsx';
import { RiArrowRightSLine } from 'react-icons/ri';

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

  return (
    <InterviewsDashboardContinueLearning
      hideHeading={true}
      items={[
        {
          completedCount: 24,
          durationMins: 92,
          href: '/dsa',
          questionsCount: 47,
          reverseGradient: true,
          title: intl.formatMessage({
            defaultMessage: 'Data structures and algorithms',
            description: 'Title of study plan',
            id: 'OOYktU',
          }),
        },
        {
          completedCount: 24,
          durationMins: 92,
          href: '/a11y',
          questionsCount: 50,
          reverseGradient: true,
          title: intl.formatMessage({
            defaultMessage: 'Accessibility',
            description: 'Title of study plan',
            id: 'qzlnBr',
          }),
        },
      ]}
    />
  );
}

export default function InterviewsDashboardCreateAccountCard() {
  return (
    <div
      className={clsx(
        'group relative flex justify-between',
        'border border-neutral-200 dark:border-transparent',
        'overflow-hidden rounded-lg',
        themeBackgroundCardColor,
        themeBackgroundElementEmphasizedStateColor_Hover,
      )}>
      <div
        className={clsx(
          'relative h-full w-36 overflow-clip',
          'bg-neutral-200/70 dark:bg-neutral-900',
        )}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[650px] origin-top-left scale-[0.4] p-2"
          // So that focus cannot go into the card, which is not meant to be used.
          {...{ inert: '' }}>
          <MockContinueLearningCard />
        </div>
        <div className="size-full absolute bg-gradient-to-t from-neutral-200/70 dark:from-neutral-900" />
      </div>
      <div className="flex items-center p-4">
        <Anchor href="/sign-up" variant="unstyled">
          <span aria-hidden={true} className="absolute inset-0" />
          <Text className="block sm:max-w-[158px]" size="body3">
            <FormattedMessage
              defaultMessage="Create a free account to track your progress"
              description="CTA to create a free account for non-logged in users"
              id="Lh00HQ"
            />
          </Text>
        </Anchor>
        <RiArrowRightSLine
          className={clsx(
            'size-5 shrink-0 text-neutral-500 dark:text-neutral-400',
            themeTextBrandColor_GroupHover,
          )}
        />
      </div>
    </div>
  );
}
