import { useState } from 'react';
import {
  RiArrowRightLine,
  RiLoopLeftLine,
  RiStopCircleFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import QuestionsProgressPanel from '~/components/interviews/questions/listings/stats/QuestionsProgressPanel';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  progressTrackingAvailableToNonPremiumUsers?: boolean;
  questionCount: number;
  questionListKey: string;
  themeBackgroundClass: string;
}>;

export default function QuestionsListSession({
  questionListKey,
  progressTrackingAvailableToNonPremiumUsers,
  questionCount,
  themeBackgroundClass,
}: Props) {
  const intl = useIntl();
  const trpcUtils = trpc.useUtils();
  const { userProfile } = useUserProfile();
  const user = useUser();

  const { data: questionListSession, isLoading: isQuestionListSessionLoading } =
    trpc.questionLists.getActiveSession.useQuery(
      {
        listKey: questionListKey,
      },
      {
        enabled: !!user,
      },
    );

  const startSessionMutation = trpc.questionLists.startSession.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
    },
  });
  const stopSessionMutation = trpc.questionLists.stopSession.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
    },
  });
  const resetSessionProgressMutation =
    trpc.questionLists.resetSessionProgress.useMutation({
      onSuccess() {
        trpcUtils.questionLists.invalidate();
      },
    });

  const completedQuestions = questionListSession?.progress?.length ?? 0;
  const [showStopStudyPlanConfirmation, setShowStopStudyPlanConfirmation] =
    useState(false);
  const [showResetProgressConfirmation, setShowResetProgressConfirmation] =
    useState(false);
  const { showToast } = useToast();

  return (
    <div>
      {(() => {
        if (userProfile == null) {
          return null;
        }

        if (isQuestionListSessionLoading) {
          return null;
        }

        if (
          !progressTrackingAvailableToNonPremiumUsers &&
          !userProfile?.isInterviewsPremium
        ) {
          return null;
        }

        if (questionListSession == null) {
          return (
            <Button
              icon={RiArrowRightLine}
              isDisabled={startSessionMutation.isLoading}
              isLoading={startSessionMutation.isLoading}
              label={intl.formatMessage({
                defaultMessage: 'Start learning',
                description: 'Button label to start study plan / focus area',
                id: 'rmYPMV',
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
                          defaultMessage: 'Started tracking progress',
                          description:
                            'Success message for starting a study plan',
                          id: 'm0cej4',
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
                  defaultMessage: 'Stop session',
                  description: 'Label to stop study plan',
                  id: 'ECkWMR',
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
              isDisabled={stopSessionMutation.isLoading}
              isLoading={stopSessionMutation.isLoading}
              isShown={showStopStudyPlanConfirmation}
              title={intl.formatMessage({
                defaultMessage: 'Stop session',
                description: 'Label to stop study plan',
                id: 'ECkWMR',
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
                          defaultMessage: 'Study list session stopped',
                          description:
                            'Success message for stopping a study plan',
                          id: '0xSU4h',
                        }),
                        variant: 'info',
                      });
                    },
                  },
                );
              }}>
              <FormattedMessage
                defaultMessage="This is an irreversible action. You will not be able to resume the study list and all progress will be erased. Are you sure?"
                description="Confirmation text for stopping a study plan"
                id="NO9tAQ"
              />
            </ConfirmationDialog>
            <ConfirmationDialog
              isDisabled={resetSessionProgressMutation.isLoading}
              isLoading={resetSessionProgressMutation.isLoading}
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
                          defaultMessage: 'Learning progress cleared',
                          description:
                            'Success message for clearing study plan progress',
                          id: 'kQgKV1',
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
  );
}
