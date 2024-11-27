import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  RiDownloadLine,
  RiLoopLeftLine,
  RiStopCircleLine,
} from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useQueryParamAction from '~/hooks/useQueryParamAction';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import ConfirmationDialog from '~/components/common/ConfirmationDialog';
import { useToast } from '~/components/global/toasts/useToast';
import { useUserProfile } from '~/components/global/UserProfileProvider';
import getProgressBarGradient from '~/components/interviews/common/utils';
import InterviewsPricingTableDialog from '~/components/interviews/purchase/InterviewsPricingTableDialog';
import type {
  QuestionFeatureType,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';

import type { QuestionProgress } from '~/db/QuestionsProgressTypes';
import { questionsForImportProgress } from '~/db/QuestionsUtils';

import InterviewsStudyListImportProgressDialog from './InterviewsStudyListImportProgressDialog';
import { useStartLearningSessionMutation } from './InterviewsStudyListSessionUtils';
import QuestionsProgressFraction from '../../common/QuestionsProgressFraction';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  feature?: QuestionFeatureType;
  overallProgress: ReadonlyArray<QuestionProgress>;
  progressTrackingAvailableToNonPremiumUsers?: boolean;
  questionCount: number;
  questions: ReadonlyArray<QuestionMetadata>;
  studyListKey: string;
}>;

export default function InterviewsStudyListSession({
  progressTrackingAvailableToNonPremiumUsers,
  questionCount,
  questions,
  overallProgress,
  feature,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const pathname = usePathname();

  const trpcUtils = trpc.useUtils();
  const { userProfile, isUserProfileLoading } = useUserProfile();
  const user = useUser();
  const { signInUpHref } = useAuthSignInUp();

  const { data: questionListSession, isLoading: isQuestionListSessionLoading } =
    trpc.questionSessions.get.useQuery(
      {
        studyListKey,
      },
      {
        enabled: user != null,
      },
    );

  const previousSessionQuestionProgress = questionsForImportProgress(
    questions,
    overallProgress,
    questionListSession?.progress ?? [],
  );

  const startSessionMutation = useStartLearningSessionMutation();
  const stopSessionMutation = trpc.questionSessions.stop.useMutation({
    onSuccess() {
      trpcUtils.questionLists.invalidate();
    },
  });
  const resetSessionProgressMutation =
    trpc.questionSessions.resetProgress.useMutation({
      onSuccess() {
        trpcUtils.questionLists.invalidate();
      },
    });

  const completedQuestions = questionListSession?.progress?.length ?? 0;
  const [showStopStudyPlanConfirmation, setShowStopStudyPlanConfirmation] =
    useState(false);
  const [showResetProgressConfirmation, setShowResetProgressConfirmation] =
    useState(false);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [showImportProgressModal, setShowImportProgressModal] = useState(false);
  const { showToast } = useToast();
  const [automaticallyStartLearning, setAutomaticallyStartLearning] =
    useState(false);
  const addQueryParamToPath = useQueryParamAction('start-session', () => {
    setAutomaticallyStartLearning(true);
  });

  const onStartLearning = useCallback(() => {
    if (
      !progressTrackingAvailableToNonPremiumUsers &&
      !userProfile?.isInterviewsPremium
    ) {
      setShowPricingDialog(true);

      return;
    }

    startSessionMutation.mutate(
      {
        studyListKey,
      },
      {
        onSuccess: () => {
          if (previousSessionQuestionProgress.length > 0) {
            setShowImportProgressModal(true);
          }
        },
      },
    );
  }, [
    previousSessionQuestionProgress.length,
    progressTrackingAvailableToNonPremiumUsers,
    studyListKey,
    startSessionMutation,
    userProfile?.isInterviewsPremium,
  ]);

  useEffect(() => {
    if (user == null || isUserProfileLoading) {
      return;
    }

    if (!automaticallyStartLearning) {
      return;
    }

    setAutomaticallyStartLearning(false);
    onStartLearning();
  }, [automaticallyStartLearning, isUserProfileLoading, onStartLearning, user]);

  return (
    <div className="w-full lg:w-auto lg:max-w-[292px] xl:max-w-[363px]">
      {(() => {
        if (isQuestionListSessionLoading && !!user) {
          return null;
        }

        if (questionListSession == null) {
          return (
            <div className="flex w-fit flex-col gap-3 lg:items-end">
              <Button
                href={
                  user == null
                    ? signInUpHref({
                        next: addQueryParamToPath(pathname || ''),
                      })
                    : undefined
                }
                isDisabled={
                  startSessionMutation.isLoading || isUserProfileLoading
                }
                isLoading={startSessionMutation.isLoading}
                label={intl.formatMessage({
                  defaultMessage: 'Start learning',
                  description: 'Button label to start study plan / focus area',
                  id: 'rmYPMV',
                })}
                size="md"
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'We will begin tracking your progress on this study list.',
                  description: 'Tooltip for start learning session button',
                  id: 'Lc/pH5',
                })}
                tooltipSide="bottom"
                variant={
                  userProfile?.isInterviewsPremium ? 'primary' : 'secondary'
                }
                onClick={() => {
                  if (userProfile == null) {
                    return;
                  }

                  onStartLearning();
                }}
              />
              <Text color="secondary" size="body3" weight="medium">
                <FormattedMessage
                  defaultMessage="Track your progress"
                  description="Subtitle for start learning"
                  id="iGkYh3"
                />
              </Text>
            </div>
          );
        }

        return (
          <div
            className={clsx(
              'flex flex-col items-end gap-y-2',
              'w-full lg:min-w-[292px] xl:min-w-[363px]',
            )}>
            <Card
              className="flex justify-between gap-4 px-4 py-3"
              classNameOuter="w-full"
              disableSpotlight={true}
              padding={false}
              pattern={false}>
              <div className="flex flex-col gap-0.5">
                <Text size="body3" weight="bold">
                  <FormattedMessage
                    defaultMessage="Progress"
                    description="Title for learning progress card"
                    id="q+ZK0L"
                  />
                </Text>
                <div className="flex items-center gap-3">
                  <div className="w-[112px] lg:w-20 xl:w-[112px]">
                    <ProgressBar
                      heightClass="h-1.5"
                      label={intl.formatMessage({
                        defaultMessage: 'Progress',
                        description:
                          'Label for progress bar for learning progress',
                        id: 'zQFib0',
                      })}
                      progressClass={
                        getProgressBarGradient({
                          total: completedQuestions,
                          value: questionCount,
                        }).className
                      }
                      total={questionCount}
                      value={completedQuestions}
                    />
                  </div>
                  <QuestionsProgressFraction
                    completed={completedQuestions}
                    total={questionCount}
                  />
                </div>
              </div>
              <div className="flex w-[68px] shrink-0 items-center gap-3">
                <Button
                  icon={RiLoopLeftLine}
                  isDisabled={
                    resetSessionProgressMutation.isLoading ||
                    completedQuestions === 0
                  }
                  isLabelHidden={true}
                  isLoading={resetSessionProgressMutation.isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'Reset progress',
                    description: 'Label to reset study plan progress',
                    id: '4FirvF',
                  })}
                  size="xs"
                  tooltip={
                    completedQuestions === 0
                      ? intl.formatMessage({
                          defaultMessage: 'No progress to reset',
                          description: 'Label for no progress to reset',
                          id: 'ZqUgX5',
                        })
                      : intl.formatMessage({
                          defaultMessage: 'Reset progress',
                          description: 'Label to reset study plan progress',
                          id: '4FirvF',
                        })
                  }
                  variant="secondary"
                  onClick={() => {
                    if (questionListSession == null) {
                      return;
                    }

                    setShowResetProgressConfirmation(true);
                  }}
                />
                <Button
                  className="text-danger dark:text-danger hover:text-danger dark:hover:text-danger md:-mr-3"
                  icon={RiStopCircleLine}
                  isDisabled={stopSessionMutation.isLoading}
                  isLabelHidden={true}
                  isLoading={stopSessionMutation.isLoading}
                  label={intl.formatMessage({
                    defaultMessage: 'Stop session',
                    description: 'Label to stop study plan',
                    id: 'ECkWMR',
                  })}
                  size="xs"
                  tooltip={intl.formatMessage({
                    defaultMessage: 'Stop session',
                    description: 'Label to stop study plan',
                    id: 'ECkWMR',
                  })}
                  variant="secondary"
                  onClick={() => {
                    if (questionListSession == null) {
                      return;
                    }

                    setShowStopStudyPlanConfirmation(true);
                  }}
                />
              </div>
            </Card>
            {questionListSession != null &&
              previousSessionQuestionProgress.length > 0 && (
                <div>
                  <Button
                    addonPosition="start"
                    icon={RiDownloadLine}
                    label={intl.formatMessage(
                      {
                        defaultMessage: 'Import progress ({questionCount})',
                        description: 'Label for import progress button',
                        id: 'CTQ5qO',
                      },
                      {
                        questionCount: previousSessionQuestionProgress.length,
                      },
                    )}
                    size="xs"
                    tooltip={
                      <FormattedMessage
                        defaultMessage="Import the progress of <bold>{questionCount}</bold> previously completed {questionCount, plural, one {question} other {questions}}"
                        description="Tooltip for import button on import progress dialog"
                        id="O0WPJA"
                        values={{
                          bold: (chunks) => (
                            <Text color="inherit" size="inherit" weight="bold">
                              {chunks}
                            </Text>
                          ),
                          questionCount: previousSessionQuestionProgress.length,
                        }}
                      />
                    }
                    variant="tertiary"
                    onClick={() => setShowImportProgressModal(true)}
                  />
                </div>
              )}
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
                          defaultMessage: 'Learning session stopped',
                          description:
                            'Success message for stopping a study plan',
                          id: 'IcGeXF',
                        }),
                        variant: 'info',
                      });
                    },
                  },
                );
              }}>
              <FormattedMessage
                defaultMessage="This is an irreversible action. You will not be able to resume the list and all progress will be erased. Are you sure?"
                description="Confirmation text for stopping a study list"
                id="kJjxxA"
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
      {/* Conditional rendering to clear states of the modal when reopen */}
      {showImportProgressModal && (
        <InterviewsStudyListImportProgressDialog
          isShown={showImportProgressModal}
          questions={previousSessionQuestionProgress}
          studyListKey={studyListKey}
          onClose={() => setShowImportProgressModal(false)}
        />
      )}
      <InterviewsPricingTableDialog
        feature={feature}
        isShown={showPricingDialog}
        onClose={() => setShowPricingDialog(false)}
      />
    </div>
  );
}
