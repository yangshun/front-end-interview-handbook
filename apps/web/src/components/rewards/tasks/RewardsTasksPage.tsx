'use client';

import clsx from 'clsx';
import { type ReactNode, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from 'react-icons/ri';
import { useSessionStorage } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { useToast } from '~/components/global/toasts/useToast';
import { FormattedMessage, useIntl } from '~/components/intl';
import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/tasks/RewardsTaskList';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderBrandColor,
  themeBorderColor,
  themeIconColor,
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
          'size-6 inline-flex items-center justify-center rounded-full',
          status === 'active' &&
            clsx(
              'border',
              themeBorderBrandColor,
              themeBackgroundCardWhiteOnLightColor,
            ),
          status === 'completed' && 'bg-success',
          status === 'pending' &&
            clsx(
              'border',
              themeBorderColor,
              themeBackgroundCardWhiteOnLightColor,
            ),
        )}>
        {status === 'completed' ? (
          <FaCheck className={clsx('size-4', themeTextInvertColor)} />
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
        className="flex"
        color={status === 'active' ? 'active' : 'default'}
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
    field: 'linkedInUsername',
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
  const trpcUtils = trpc.useUtils();
  const router = useI18nRouter();
  const { showToast } = useToast();

  const { data: completedTasks } = trpc.promotions.getTasksCompleted.useQuery();
  const checkGitHubStarMutation =
    trpc.promotions.checkGitHubStarred.useMutation();
  const checkGitHubFollowMutation =
    trpc.promotions.checkGitHubFollowing.useMutation();
  const checkLinkedInFollowMutation =
    trpc.promotions.checkLinkedInFollowing.useMutation();
  const checkTwitterFollowMutation =
    trpc.promotions.checkTwitterFollowing.useMutation();
  const generateSocialTasksPromoCodeMutation =
    trpc.promotions.generateSocialTasksPromoCode.useMutation({
      onSuccess: () => {
        trpcUtils.promotions.userPromoCodes.invalidate();
      },
    });

  const [currentStep, setCurrentStep] = useState(1);
  const [handlesData, setHandlesData] = useSessionStorage<RewardsHandlesData>(
    'gfe:rewards:social-handles',
    {
      gitHubUsername: '',
      linkedInUsername: '',
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

      return;
    }

    const verifyCallback = (actionName: RewardsTasksActionName) => ({
      onError: () => {
        setTaskWithError(actionName);
        setCurrentVerifyingTask(null);
      },
      onSuccess: () => {
        trpcUtils.promotions.getTasksCompleted.invalidate();
        findNextTaskToVerify();
      },
    });

    switch (task.actionName) {
      case 'GITHUB_STAR.JS_INTERVIEWS': {
        setCurrentVerifyingTask('GITHUB_STAR.JS_INTERVIEWS');
        checkGitHubStarMutation.mutate(
          {
            action: 'GITHUB_STAR.JS_INTERVIEWS',
            username: handlesData.gitHubUsername,
          },
          verifyCallback('GITHUB_STAR.JS_INTERVIEWS'),
        );
        break;
      }
      case 'GITHUB_STAR.SYSTEM_DESIGN': {
        setCurrentVerifyingTask('GITHUB_STAR.SYSTEM_DESIGN');
        checkGitHubStarMutation.mutate(
          {
            action: 'GITHUB_STAR.SYSTEM_DESIGN',
            username: handlesData.gitHubUsername,
          },
          verifyCallback('GITHUB_STAR.SYSTEM_DESIGN'),
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
            username: handlesData.linkedInUsername,
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

  const isLastStep = currentStep === 2;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-y-10">
      <RewardsHeader />
      <div className="flex w-full flex-col gap-4">
        <RewardsStepLabel
          label={
            <FormattedMessage
              defaultMessage="Enter your social media handles"
              description="Rewards step label"
              id="nTw2HR"
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
                <div key={type} className="flex items-center gap-2">
                  <Icon className={clsx('size-5 shrink-0', themeIconColor)} />
                  <Text size="body2">{handlesData?.[field]}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Step 2 */}
      <div className="flex w-full flex-col gap-4">
        <RewardsStepLabel
          label={
            <FormattedMessage
              defaultMessage="Complete tasks"
              description="Rewards step label"
              id="mb1n+/"
            />
          }
          status={secondStepStatus}
          step={2}
        />
        <div className="flex w-full flex-col gap-4 pl-8">
          <RewardsTaskList isDisabled={!isLastStep} tasks={tasksWithStatus} />
          <div
            className={clsx(
              'flex',
              isLastStep ? 'justify-between' : 'justify-end',
            )}>
            {isLastStep && (
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
            )}
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
                        description: error.message,
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
                isDisabled={currentVerifyingTask != null || !isLastStep}
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
      </div>
    </div>
  );
}
