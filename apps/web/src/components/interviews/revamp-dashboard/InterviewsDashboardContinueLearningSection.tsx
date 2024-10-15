import clsx from 'clsx';

import {
  getQuestionListThemes,
  useQuestionLists,
} from '~/data/question-lists/QuestionListsHooks';

import getProgressBarGradient from '~/components/interviews/common/utils';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import GradientProgressBar from '~/components/ui/GradientProgressBar/GradientProgressBar';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderElementColor,
  themeTextColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

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
          {items.map(({ completedCount, href, title, questionsCount }) => {
            const progressPercentage = (completedCount / questionsCount) * 100;

            return (
              <div
                key={href}
                className={clsx(
                  'flex items-center justify-between gap-4 p-6',
                  'rounded-lg',
                  themeBackgroundCardWhiteOnLightColor,
                  ['border', themeBorderElementColor],
                )}>
                <div className="flex items-center gap-4">
                  <GradientProgressBar
                    className="size-12"
                    gradient={getProgressBarGradient({
                      total: questionsCount,
                      value: completedCount,
                    })}
                    progressPercentage={progressPercentage}
                    reverseGradient={false}>
                    <Tooltip
                      asChild={true}
                      label={
                        <FormattedMessage
                          defaultMessage="You have completed {percent}% of this study list."
                          description="Tooltip for learning list progress percent"
                          id="L36Hrm"
                          values={{
                            percent: intl.formatNumber(progressPercentage, {
                              maximumFractionDigits: 0,
                              style: 'decimal',
                            }),
                          }}
                        />
                      }>
                      <Text color="inherit" size="body3">
                        <FormattedMessage
                          defaultMessage="<percent>{percentage}</percent>%"
                          description="Progress percentage in Continue Learning section in preparation dashboard"
                          id="lDlJyX"
                          values={{
                            percent: (chunks) => (
                              <Text
                                className="font-bold"
                                color="inherit"
                                size="body1"
                                weight="inherit">
                                {chunks}
                              </Text>
                            ),
                            percentage: intl.formatNumber(progressPercentage, {
                              maximumFractionDigits: 0,
                              style: 'decimal',
                            }),
                          }}
                        />
                      </Text>
                    </Tooltip>
                  </GradientProgressBar>
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
          })}
        </div>
      </div>
    </Section>
  );
}
