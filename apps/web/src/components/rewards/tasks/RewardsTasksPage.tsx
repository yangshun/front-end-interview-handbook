'use client';

import clsx from 'clsx';
import { type ReactNode, useState } from 'react';
import { RiCheckLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import RewardsHeader from '~/components/rewards/RewardsHeader';
import RewardsTaskList from '~/components/rewards/tasks/RewardsTaskList';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeCardBackgroundWhiteOnLightColor,
  themeLineColor,
  themeTextInvertColor,
} from '~/components/ui/theme';

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

export default function RewardsTasksPage() {
  const [currentStep, setCurrentStep] = useState(1);

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
          status={determineStepStatus(1, currentStep)}
          step={1}
        />
        {currentStep === 1 && (
          <div className="flex flex-col gap-4 w-full pl-8">
            <Text color="secondary" display="block" size="body2">
              <FormattedMessage
                defaultMessage="Please enter your social media handles for us to verify."
                description="Rewards campaign help text"
                id="ZYXIkT"
              />
            </Text>
            <RewardsSocialHandlesForm />
            <div className="flex justify-end">
              <Button
                label="Next"
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
      <div className="flex flex-col gap-6 w-full">
        <RewardsStepLabel
          label={
            <FormattedMessage
              defaultMessage="Start the tasks"
              description="Rewards step label"
              id="YVoNkr"
            />
          }
          status={determineStepStatus(2, currentStep)}
          step={2}
        />
        {currentStep === 2 && (
          <div className="flex flex-col gap-4 w-full pl-8">
            <RewardsTaskList showActions={true} />
            <div className="flex justify-end">
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
