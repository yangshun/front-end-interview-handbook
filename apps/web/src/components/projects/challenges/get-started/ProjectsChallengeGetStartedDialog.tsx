import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Dialog from '~/components/ui/Dialog';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import ProjectsChallengeGetStartedDownloadFigmaDesign from './ProjectsChallengeGetStartedDownloadFigmaDesign';
import ProjectsChallengeGetStartedDownloadStarterFiles from './ProjectsChallengeGetStartedDownloadStarterFiles';
import ProjectsChallengeGetStartedImportantInfoGuide from './ProjectsChallengeGetStartedImportantInfoGuide';
import ProjectsChallengeGetStartedSkillSelection from './ProjectsChallengeGetStartedSkillSelection';
import ProjectsChallengeGetStartedStartCoding from './ProjectsChallengeGetStartedStartCoding';
import type { ProjectsChallengeItem } from '../types';

type DialogStep = Readonly<{
  content: React.ReactNode;
  id: string;
  label: string;
}>;

function useDialogSteps({
  challenge,
  onStartClick,
  userCanAccess,
  isLoading,
}: {
  challenge: ProjectsChallengeItem;
  isLoading: boolean;
  onStartClick: () => void;
  userCanAccess: boolean;
}) {
  const intl = useIntl();
  const dialogSteps: Array<DialogStep> = [
    {
      content: (
        <ProjectsChallengeGetStartedDownloadStarterFiles
          starterFilesHref={challenge.metadata.downloadStarterFilesHref}
        />
      ),
      id: 'download-starter-files',
      label: intl.formatMessage({
        defaultMessage: 'Download starter files',
        description:
          'Label for "Download starter files" step in dialog on Projects project page',
        id: 'e/t5dH',
      }),
    },
    {
      content: (
        <ProjectsChallengeGetStartedDownloadFigmaDesign
          downloadDesignFileHref={challenge.metadata.downloadDesignFileHref}
          userCanAccess={userCanAccess}
        />
      ),
      id: 'download-design-assets',
      label: intl.formatMessage({
        defaultMessage: 'Download design assets',
        description:
          'Label for "Download design assets" step in dialog on Projects project page',
        id: 'B2171J',
      }),
    },
    {
      content: <ProjectsChallengeGetStartedSkillSelection />,
      id: 'select-skills',
      label: intl.formatMessage({
        defaultMessage: 'Tell us about the skills you will be using',
        description:
          'Label for "Tell us about the skills you will be using" step in dialog on Projects project page',
        id: 'yZkY1S',
      }),
    },
    {
      content: <ProjectsChallengeGetStartedImportantInfoGuide />,
      id: 'important-info-guide',
      label: intl.formatMessage({
        defaultMessage: 'Know where to find important info',
        description:
          'Label for "Know where to find important info" step in dialog on Projects project page',
        id: 'qoTBLI',
      }),
    },
    {
      content: (
        <ProjectsChallengeGetStartedStartCoding
          isLoading={isLoading}
          onStartClick={onStartClick}
        />
      ),
      id: 'start-coding',
      label: intl.formatMessage({
        defaultMessage: 'Start coding!',
        description:
          'Label for "Start coding!" step in dialog on Projects project page',
        id: '7Ozzmy',
      }),
    },
  ];

  return dialogSteps;
}

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isLoading?: boolean;
  isShown: boolean;
  onClose: () => void;
  onStart: () => void;
}>;

export default function ProjectsChallengeGetStartedDialog({
  isShown,
  challenge,
  onClose,
  onStart,
  isLoading = false,
}: Props) {
  const intl = useIntl();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const dialogSteps = useDialogSteps({
    challenge,
    isLoading,
    onStartClick: async () => {
      await onStart();
      onClose();
      setCurrentStepIndex(0);
    },
    userCanAccess: true,
  });

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        currentStepIndex < dialogSteps.length - 1 ? (
          <Button
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Next',
              description: 'Next step button label',
              id: 'SWdU2x',
            })}
            variant="secondary"
            onClick={() => {
              setCurrentStepIndex(currentStepIndex + 1);
            }}
          />
        ) : undefined
      }
      title={intl.formatMessage({
        defaultMessage: 'Before you get started',
        description: 'Section title for projects page',
        id: 'KBewzV',
      })}
      width="screen-sm"
      onClose={onClose}>
      <ol className="relative flex flex-col gap-y-6 mt-5">
        <div
          className={clsx(
            'border-l border-dashed absolute h-full start-3',
            themeBorderElementColor,
          )}
        />
        {dialogSteps.map((step, index) => {
          const isStepSelected = index === currentStepIndex;
          const isStepCompleted = index < currentStepIndex;

          return (
            <li
              key={step.id}
              aria-label={step.label}
              className="flex gap-2.5 items-start">
              <div className="flex flex-col self-stretch">
                {isStepCompleted ? (
                  <Chip
                    aria-hidden={true}
                    className="flex-shrink-0"
                    icon={RiCheckLine}
                    isLabelHidden={true}
                    label={(index + 1).toString()}
                    size="sm"
                    variant="success"
                  />
                ) : (
                  <div className={clsx('z-10', themeBackgroundLayerColor)}>
                    <Chip
                      aria-hidden={true}
                      className="flex-shrink-0"
                      label={(index + 1).toString()}
                      size="sm"
                      variant={isStepSelected ? 'active' : 'neutral'}
                    />
                  </div>
                )}
                {index === dialogSteps.length - 1 && (
                  <div
                    className={clsx(
                      'z-10 self-stretch flex-1',
                      themeBackgroundLayerColor,
                    )}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-6">
                <Text
                  className="md:text-base text-sm"
                  color={isStepSelected ? 'active' : 'default'}
                  weight="medium">
                  {step.label}
                </Text>
                {isStepSelected && step.content}
                {isStepSelected && index < dialogSteps.length - 1 && (
                  <Divider />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Dialog>
  );
}
