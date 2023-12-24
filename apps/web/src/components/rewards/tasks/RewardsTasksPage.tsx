'use client';

import clsx from 'clsx';
import type { SVGProps } from 'react';
import { type ReactNode, useState } from 'react';
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';
import { useSessionStorage } from 'usehooks-ts';

import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/tasks/RewardsTaskList';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeCardBackgroundWhiteOnLightColor,
  themeLineColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

import type { RewardsHandlesData } from './RewardsSocialHandlesForm';
import RewardsSocialHandlesForm from './RewardsSocialHandlesForm';

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
            clsx('border border-brand', themeCardBackgroundWhiteOnLightColor),
          status === 'completed' && 'bg-success',
          status === 'pending' &&
            clsx(
              'border',
              themeLineColor,
              themeCardBackgroundWhiteOnLightColor,
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
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
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
  const [currentStep, setCurrentStep] = useState(1);
  const [handlesData, setHandlesData] = useSessionStorage<RewardsHandlesData>(
    'gfe:rewards:social-handles',
    {
      gitHubUsername: '',
      linkedInUrl: '',
      twitterUsername: '',
    },
  );
  const firstStepStatus = determineStepStatus(1, currentStep);
  const secondStepStatus = determineStepStatus(2, currentStep);

  return (
    <div className="flex flex-col gap-y-12 items-center max-w-lg w-full mx-auto">
      <RewardsHeader isSignedIn={true} />
      <div className="flex flex-col gap-6 w-full">
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
      <div className="flex flex-col gap-6 w-full">
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
            <RewardsTaskList showActions={true} />
            <div className="flex justify-between">
              <Button
                addonPosition="start"
                icon={RiArrowLeftLine}
                label="Back"
                size="sm"
                variant="secondary"
                onClick={() => {
                  setCurrentStep(1);
                }}
              />
              <Button
                href="/rewards/complete"
                label="Verify"
                size="sm"
                variant="primary"
                onClick={() => {
                  setCurrentStep(2);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
