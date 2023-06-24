import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  RiArrowRightLine,
  RiLoopLeftLine,
  RiStopCircleFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import QuestionDifficultySummary from '~/components/questions/common/QuestionDifficultySummary';
import QuestionsProgressPanel from '~/components/questions/listings/stats/QuestionsProgressPanel';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import QuestionCountLabel from '../../common/QuestionCountLabel';
import QuestionDurationLabel from '../../common/QuestionDurationLabel';
import type { QuestionDifficulty } from '../../common/QuestionsTypes';

type Props = Readonly<{
  description?: ReactNode;
  difficultySummary?: Record<QuestionDifficulty, number>;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  questionCount: number;
  questionListKey: string;
  themeBackgroundClass: string;
  title: string;
  totalDurationMins: number;
}>;

export default function QuestionListTitleSection({
  description,
  difficultySummary,
  questionListKey,
  questionCount,
  totalDurationMins,
  icon: Icon,
  themeBackgroundClass,
  title,
}: Props) {
  const intl = useIntl();
  const { data: questionListSession, isLoading: isQuestionListSessionLoading } =
    trpc.questionLists.getActiveSession.useQuery({
      listKey: questionListKey,
    });

  const startSessionMutation = trpc.questionLists.startSession.useMutation();
  const stopSessionMutation = trpc.questionLists.stopSession.useMutation();

  return (
    <div className="flex flex-col justify-between gap-y-4 gap-x-8 md:flex-row">
      <div className="flex flex-col gap-4">
        <div className="flex gap-x-6">
          <div
            className={clsx(
              'inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-white',
              themeBackgroundClass,
            )}>
            <Icon aria-hidden={true} className="h-10 w-10" />
          </div>
          <div className="flex flex-col gap-y-2">
            <Heading level="heading5">{title}</Heading>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <QuestionCountLabel count={questionCount} showIcon={true} />
              <QuestionDurationLabel mins={totalDurationMins} showIcon={true} />
              {difficultySummary && (
                <QuestionDifficultySummary
                  easy={difficultySummary.easy}
                  hard={difficultySummary.hard}
                  medium={difficultySummary.medium}
                  showIcon={true}
                />
              )}
            </div>
          </div>
        </div>
        {description && (
          <Text
            className="max-w-3xl"
            color="secondary"
            display="block"
            size="body2">
            {description}
          </Text>
        )}
      </div>
      <div>
        {(() => {
          if (isQuestionListSessionLoading) {
            return null;
          }

          if (questionListSession == null) {
            return (
              <Button
                icon={RiArrowRightLine}
                isDisabled={startSessionMutation.isLoading}
                isLoading={startSessionMutation.isLoading}
                label={intl.formatMessage({
                  defaultMessage: 'Start study plan',
                  description: 'Button label to start study plan',
                  id: 'lUuh6Q',
                })}
                variant="primary"
                onClick={() => {
                  startSessionMutation.mutate(
                    {
                      listKey: questionListKey,
                    },
                    {
                      onSuccess: () => {
                        // TODO(redesign): Add toast.
                        alert('Started session');
                      },
                    },
                  );
                }}
              />
            );
          }

          return (
            <div className="flex min-w-[350px] flex-col gap-y-2">
              <Card
                className="px-4 py-3"
                disableSpotlight={true}
                padding={false}
                pattern={false}>
                <QuestionsProgressPanel
                  completedQuestions={
                    questionListSession?.progress?.length ?? 0
                  }
                  progressBarClassName={themeBackgroundClass}
                  title={intl.formatMessage({
                    defaultMessage: 'Progress',
                    description: 'Question progress',
                    id: 'JQ6swd',
                  })}
                  totalQuestions={questionCount}
                  variant="compact"
                />
              </Card>
              <div className="flex justify-end gap-x-2">
                <Button
                  addonPosition="start"
                  icon={RiLoopLeftLine}
                  isDisabled={false}
                  isLoading={false}
                  label={intl.formatMessage({
                    defaultMessage: 'Reset progress',
                    description: 'Button label to reset study plan progress',
                    id: '1+/4gB',
                  })}
                  size="sm"
                  variant="tertiary"
                />
                <Button
                  addonPosition="start"
                  className="md:-mr-3"
                  icon={RiStopCircleFill}
                  isDisabled={stopSessionMutation.isLoading}
                  isLoading={stopSessionMutation.isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'Stop study plan',
                    description: 'Button label to stop study plan',
                    id: 'EK/Uac',
                  })}
                  size="sm"
                  variant="tertiary"
                  onClick={() => {
                    if (questionListSession == null) {
                      return;
                    }

                    stopSessionMutation.mutate(
                      {
                        sessionId: questionListSession.id,
                      },
                      {
                        onSuccess: () => {
                          // TODO(redesign): Add toast.
                          alert('Stopped session');
                        },
                      },
                    );
                  }}
                />
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
