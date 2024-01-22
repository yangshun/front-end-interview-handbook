'use client';

import clsx from 'clsx';
import { type ReactNode, useRef, useState } from 'react';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/ToastsProvider';
import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/tasks/RewardsTaskList';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import { useI18nRouter } from '~/next-i18nostic/src';

import type { RewardsHandlesData } from './RewardsSocialHandlesForm';
import RewardsSocialHandlesForm from './RewardsSocialHandlesForm';
import type { Props as RewardsTaskProps } from './RewardsTaskItem';
import type { RewardsTasksActionName } from './RewardsTaskItem';
import { useRewardsTasks } from './useRewardsTasks';

function RewardsStepLabel({
  label,
  step,
  status,
}: Readonly<{
  label: ReactNode;
  status: 'active' | 'completed' | 'pending';
  step: number;
}>) {
  return (
    <div className="flex gap-x-2.5">
      <span
        className={clsx(
          'w-6 h-6 inline-flex items-center justify-center rounded-full',
          status === 'active' &&
            clsx('border border-brand', themeBackgroundCardWhiteOnLightColor),
          status === 'completed' && 'bg-success',
          status === 'pending' &&
            clsx(
              'border',
              themeBorderColor,
              themeBackgroundCardWhiteOnLightColor,
            ),
        )}>
        {status === 'completed' ? (
          <RiCheckLine className={clsx('h-4 w-4', themeTextInvertColor)} />
        ) : (
          <Text
            color={status === 'active' ? 'active' : 'default'}
            size="body2"
            weight="bold">
            {step}
          </Text>
        )}
      </span>{' '}
      <Text
        color={status === 'active' ? 'active' : 'default'}
        display="flex"
        size="body1"
        weight="medium">
        {label}
      </Text>
    </div>
  );
}

function determineStepStatus(step: number, currentStep: number) {
  if (currentStep === step) {
    return 'active';
  }

  if (currentStep < step) {
    return 'pending';
  }

  return 'completed';
}

const handles: ReadonlyArray<{
  field: keyof RewardsHandlesData;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  type: string;
}> = [
  {
    field: 'gitHubUsername',
    icon: RiGithubFill,
    type: 'github',
  },
  {
    field: 'linkedInUrl',
    icon: RiLinkedinFill,
    type: 'linkedin',
  },
  {
    field: 'twitterUsername',
    icon: RiTwitterXFill,
    type: 'twitter',
  },
];

export default function RewardsTasksPage() {
  const intl = useIntl();
  const router = useI18nRouter();
  const { showToast } = useToast();

  const { data: completedTasks } = trpc.rewards.getTasksCompleted.useQuery();
  const checkGitHubStarMutation = trpc.rewards.checkGitHubStarred.useMutation();
  const checkGitHubFollowMutation =
    trpc.rewards.checkGitHubFollowing.useMutation();
  const checkLinkedInFollowMutation =
    trpc.rewards.checkLinkedInFollowing.useMutation();
  const checkTwitterFollowMutation =
    trpc.rewards.checkTwitterFollowing.useMutation();
  const generateSocialTasksPromoCodeMutation =
    trpc.rewards.generateSocialTasksPromoCode.useMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [handlesData, setHandlesData] = useSessionStorage<RewardsHandlesData>(
    'gfe:rewards:social-handles',
    {
      gitHubUsername: '',
      linkedInUrl: '',
      twitterUsername: '',
    },
  );

  const latestTasks = useRef<ReadonlyArray<RewardsTaskProps>>([]);
  const [currentVerifyingTask, setCurrentVerifyingTask] =
    useState<RewardsTasksActionName | null>(null);
  const [taskWithError, setTaskWithError] =
    useState<RewardsTasksActionName | null>(null);

  const tasks = useRewardsTasks();
  const tasksWithStatus = tasks.map((task) => ({
    ...task,
    status: (() => {
      if (currentVerifyingTask === task.actionName) {
        return 'verifying' as const;
      }

      if (completedTasks?.some(({ action }) => action === task.actionName)) {
        return 'completed' as const;
      }

      if (taskWithError === task.actionName) {
        return 'error' as const;
      }

      return 'pending' as const;
    })(),
  }));

  latestTasks.current = tasksWithStatus;

  const firstStepStatus = determineStepStatus(1, currentStep);
  const secondStepStatus = determineStepStatus(2, currentStep);

  function findNextTaskToVerify() {
    setTaskWithError(null);

    const task = latestTasks.current.find(
      ({ status }) => status === 'pending' || status === 'error',
    );

    if (task == null) {
      setCurrentVerifyingTask(null);

      // TODO: Generate promo code.
      return;
    }

    const verifyCallback = (actionName: RewardsTasksActionName) => ({
      onError: () => {
        setTaskWithError(actionName);
        setCurrentVerifyingTask(null);
      },
      onSuccess: () => {
        findNextTaskToVerify();
      },
    });

    switch (task.actionName) {
      case 'GITHUB_STAR': {
        setCurrentVerifyingTask('GITHUB_STAR');
        checkGitHubStarMutation.mutate(
          {
            username: handlesData.gitHubUsername,
          },
          verifyCallback('GITHUB_STAR'),
        );
        break;
      }
      case 'GITHUB_FOLLOW': {
        setCurrentVerifyingTask('GITHUB_FOLLOW');
        checkGitHubFollowMutation.mutate(
          {
            username: handlesData.gitHubUsername,
          },
          verifyCallback('GITHUB_FOLLOW'),
        );
        break;
      }
      case 'LINKEDIN_FOLLOW': {
        setCurrentVerifyingTask('LINKEDIN_FOLLOW');
        checkLinkedInFollowMutation.mutate(
          {
            linkedInUrl: handlesData.linkedInUrl,
          },
          verifyCallback('LINKEDIN_FOLLOW'),
        );
        break;
      }
      case 'TWITTER_FOLLOW': {
        setCurrentVerifyingTask('TWITTER_FOLLOW');
        checkTwitterFollowMutation.mutate(
          {
            username: handlesData.twitterUsername,
          },
          verifyCallback('TWITTER_FOLLOW'),
        );
        break;
      }
    }
  }

  const completedAllTasks = tasksWithStatus.every(
    ({ status }) => status === 'completed',
  );

  return (
    <div className="flex flex-col gap-y-10 items-center max-w-lg w-full mx-auto">
      <RewardsHeader />
      <div className="flex flex-col gap-4 w-full">
        <RewardsStepLabel
          label={
            <FormattedMessage
              defaultMessage="Verify your social accounts"
              description="Rewards step label"
              id="3bTpP/"
            />
          }
          status={firstStepStatus}
          step={1}
        />
        <div className="w-full pl-8">
          {firstStepStatus === 'active' ? (
            <RewardsSocialHandlesForm
              handlesData={handlesData}
              onHandlesDataChange={setHandlesData}
              onNextStage={(data) => {
                setHandlesData(data);
                setCurrentStep(2);
              }}
            />
          ) : (
            <div className="flex flex-wrap gap-4">
              {handles.map(({ type, field, icon: Icon }) => (
                <div key={type} className="flex gap-2 items-center">
                  <Icon
                    className={clsx(
                      'h-5 w-5 shrink-0',
                      'text-neutral-400 dark:text-neutral-500',
                    )}
                  />
                  <Text size="body2">{handlesData?.[field]}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <RewardsStepLabel
          label={
            <FormattedMessage
              defaultMessage="Complete the tasks"
              description="Rewards step label"
              id="4aoTWp"
            />
          }
          status={secondStepStatus}
          step={2}
        />
        {currentStep === 2 && (
          <div className="flex flex-col gap-4 w-full pl-8">
            <RewardsTaskList tasks={tasksWithStatus} />
            <div className="flex justify-between">
              <Button
                addonPosition="start"
                icon={RiArrowLeftLine}
                isDisabled={currentVerifyingTask != null}
                label="Back"
                size="sm"
                variant="secondary"
                onClick={() => {
                  setCurrentStep(1);
                }}
              />
              {completedAllTasks ? (
                <Button
                  icon={RiArrowRightLine}
                  isDisabled={generateSocialTasksPromoCodeMutation.isLoading}
                  isLoading={generateSocialTasksPromoCodeMutation.isLoading}
                  label="Claim promo code"
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    generateSocialTasksPromoCodeMutation.mutate(undefined, {
                      onError: (error) => {
                        showToast({
                          subtitle: error.message,
                          title: intl.formatMessage({
                            defaultMessage: 'Error generating promo code',
                            description: 'Error message',
                            id: 'tPMvxG',
                          }),
                          variant: 'danger',
                        });
                      },
                      onSuccess: () => {
                        router.push('/rewards/social/complete');
                      },
                    });
                  }}
                />
              ) : (
                <Button
                  isDisabled={currentVerifyingTask != null}
                  label="Verify"
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    findNextTaskToVerify();
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
