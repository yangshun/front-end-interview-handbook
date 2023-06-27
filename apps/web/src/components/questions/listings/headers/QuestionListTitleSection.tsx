import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiLoopLeftLine,
  RiStopCircleFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import type { PreparationPlanSchedule } from '~/data/plans/PreparationPlans';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/ToastsProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionsProgressPanel from '~/components/questions/listings/stats/QuestionsProgressPanel';
import QuestionDifficultySummary from '~/components/questions/metadata/QuestionDifficultySummary';
import QuestionStudyAllocationLabel from '~/components/questions/metadata/QuestionStudyAllocationLabel';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import type { QuestionDifficulty } from '../../common/QuestionsTypes';
import QuestionCountLabel from '../../metadata/QuestionCountLabel';
import QuestionDurationLabel from '../../metadata/QuestionDurationLabel';

type Props = Readonly<{
  description?: ReactNode;
  difficultySummary?: Record<QuestionDifficulty, number>;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  questionCount: number;
  questionListKey: string;
  schedule?: PreparationPlanSchedule;
  themeBackgroundClass: string;
  title: string;
  totalDurationMins: number;
}>;

export default function QuestionListTitleSection({
  description,
  difficultySummary,
  questionListKey,
  questionCount,
  schedule,
  totalDurationMins,
  icon: Icon,
  themeBackgroundClass,
  title,
}: Props) {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const { data: questionListSession, isLoading: isQuestionListSessionLoading } =
    trpc.questionLists.getActiveSession.useQuery({
      listKey: questionListKey,
    });

  const startSessionMutation = trpc.questionLists.startSession.useMutation();
  const stopSessionMutation = trpc.questionLists.stopSession.useMutation();
  const resetSessionProgressMutation =
    trpc.questionLists.resetSessionProgress.useMutation();

  const completedQuestions = questionListSession?.progress?.length ?? 0;
  const [showStopStudyPlanConfirmation, setShowStopStudyPlanConfirmation] =
    useState(false);
  const [showResetProgressConfirmation, setShowResetProgressConfirmation] =
    useState(false);
  const { showToast } = useToast();

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
              {schedule != null ? (
                <QuestionStudyAllocationLabel
                  frequency={schedule.frequency}
                  hours={schedule.hours}
                  showIcon={true}
                />
              ) : (
                <QuestionDurationLabel
                  mins={totalDurationMins}
                  showIcon={true}
                />
              )}
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
          if (userProfile == null || !userProfile?.isPremium) {
            return null;
          }

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
                        showToast({
                          title: intl.formatMessage({
                            defaultMessage: 'Study plan started',
                            description:
                              'Success message for starting a study plan',
                            id: '79rtZd',
                          }),
                          variant: 'success',
                        });
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
                  completedQuestions={completedQuestions}
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
              <div className="flex w-full flex-row-reverse justify-between gap-x-2">
                <Button
                  addonPosition="start"
                  className="text-danger dark:text-danger hover:text-danger dark:hover:text-danger md:-mr-3"
                  icon={RiStopCircleFill}
                  isDisabled={stopSessionMutation.isLoading}
                  isLoading={stopSessionMutation.isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'Stop study plan',
                    description: 'Label to stop study plan',
                    id: '+5SO+E',
                  })}
                  size="sm"
                  variant="tertiary"
                  onClick={() => {
                    if (questionListSession == null) {
                      return;
                    }

                    setShowStopStudyPlanConfirmation(true);
                  }}
                />
                {completedQuestions > 0 && (
                  <Button
                    addonPosition="start"
                    icon={RiLoopLeftLine}
                    isDisabled={resetSessionProgressMutation.isLoading}
                    isLoading={resetSessionProgressMutation.isLoading}
                    label={intl.formatMessage({
                      defaultMessage: 'Reset progress',
                      description: 'Label to reset study plan progress',
                      id: '4FirvF',
                    })}
                    size="sm"
                    variant="tertiary"
                    onClick={() => {
                      if (questionListSession == null) {
                        return;
                      }

                      setShowResetProgressConfirmation(true);
                    }}
                  />
                )}
              </div>
              <ConfirmationDialog
                confirmButtonVariant="danger"
                isConfirming={stopSessionMutation.isLoading}
                isShown={showStopStudyPlanConfirmation}
                title={intl.formatMessage({
                  defaultMessage: 'Stop study plan',
                  description: 'Label to stop study plan',
                  id: '+5SO+E',
                })}
                onCancel={() => {
                  setShowStopStudyPlanConfirmation(false);
                }}
                onConfirm={() => {
                  stopSessionMutation.mutate(
                    {
                      sessionId: questionListSession.id,
                    },
                    {
                      onSuccess: () => {
                        setShowStopStudyPlanConfirmation(false);
                        showToast({
                          title: intl.formatMessage({
                            defaultMessage: 'Study plan session stopped',
                            description:
                              'Success message for stopping a study plan',
                            id: 'TYoAs+',
                          }),
                          variant: 'info',
                        });
                      },
                    },
                  );
                }}>
                <FormattedMessage
                  defaultMessage="This is an irreversible action. You will not be able to resume the study plan and all progress will be erased. Are you sure?"
                  description="Confirmation text for stopping a study plan"
                  id="dActPn"
                />
              </ConfirmationDialog>
              <ConfirmationDialog
                isConfirming={resetSessionProgressMutation.isLoading}
                isShown={showResetProgressConfirmation}
                title={intl.formatMessage({
                  defaultMessage: 'Reset progress',
                  description: 'Label to reset study plan progress',
                  id: '4FirvF',
                })}
                onCancel={() => {
                  setShowResetProgressConfirmation(false);
                }}
                onConfirm={() => {
                  resetSessionProgressMutation.mutate(
                    {
                      sessionId: questionListSession.id,
                    },
                    {
                      onSuccess: () => {
                        setShowResetProgressConfirmation(false);
                        showToast({
                          title: intl.formatMessage({
                            defaultMessage: 'Study plan progress cleared',
                            description:
                              'Success message for clearing study plan progress',
                            id: '+7egiW',
                          }),
                          variant: 'info',
                        });
                      },
                    },
                  );
                }}>
                <FormattedMessage
                  defaultMessage="This is an irreversible action. You will lose all progress. Are you sure?"
                  description="Confirmation text for reseting study plan progress"
                  id="Jn7AHE"
                />
              </ConfirmationDialog>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
