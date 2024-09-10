import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  getQuestionListThemes,
  useQuestionLists,
} from '~/data/question-lists/QuestionListsHooks';

import Button from '~/components/ui/Button';
import GradientProgressBar from '~/components/ui/GradientProgressBar/GradientProgressBar';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderElementColor, themeTextColor } from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import QuestionCountLabel from '../questions/metadata/QuestionCountLabel';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
}>;

export default function InterviewsDashboardContinueLearningSection({
  questionListSessions,
}: Props) {
  const intl = useIntl();
  const questionLists = useQuestionLists();
  const themes = getQuestionListThemes();

  const items = questionListSessions
    // TODO(interviews): filter out company lists for now because company list
    // rendering is not yet supported on the dashboard.
    .filter(({ key }) => questionLists[key] != null)
    .map(({ key, _count }) => ({
      completedCount: _count.progress,
      gradient: themes[key].gradient,
      href: questionLists[key]?.href,
      questionsCount: countNumberOfQuestionsInList(
        questionLists[key].questions,
      ),
      title: questionLists[key].longName,
    }));

  return (
    <Section>
      <div className="hidden flex-col gap-6 md:flex">
        <Heading className={themeTextColor} color="custom" level="heading6">
          <FormattedMessage
            defaultMessage="Continue learning"
            description="Title for continue learning section"
            id="wvGU2J"
          />
        </Heading>

        <div className={clsx('grid gap-4 lg:grid-cols-2')}>
          {items.map(
            ({ completedCount, gradient, href, title, questionsCount }) => {
              const progressPercentage =
                (completedCount / questionsCount) * 100;

              return (
                <div
                  key={href}
                  className={clsx(
                    'flex items-center justify-between gap-4 p-6',
                    'rounded-lg',
                    'bg-neutral-200/40 dark:bg-neutral-800/40',
                    ['border', themeBorderElementColor],
                  )}>
                  <div className="flex items-center gap-4">
                    <GradientProgressBar
                      className="size-12"
                      gradient={gradient}
                      progressPercentage={progressPercentage}
                      reverseGradient={false}
                    />
                    <div className="flex flex-col gap-1.5">
                      <Text size="body1" weight="medium">
                        {title}
                      </Text>
                      {questionsCount && (
                        <QuestionCountLabel
                          count={questionsCount}
                          showIcon={true}
                        />
                      )}
                    </div>
                  </div>
                  <Button
                    href={href}
                    label={intl.formatMessage({
                      defaultMessage: 'Resume',
                      description: 'Button label for resume',
                      id: 'jIpLwU',
                    })}
                    variant="primary"
                  />
                </div>
              );
            },
          )}
        </div>
      </div>
    </Section>
  );
}
