import clsx from 'clsx';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsChallengeGetStartedDownloadStarterFiles from '~/components/projects/challenges/get-started/ProjectsChallengeGetStartedDownloadStarterFiles';
import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Divider from '~/components/ui/Divider';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

export default function ProjectsChallengeHowItWorksAssetCard() {
  const intl = useIntl();
  const steps = [
    {
      content: (
        <ProjectsChallengeGetStartedDownloadStarterFiles starterFilesHref="https://figma.com" />
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
        <ProjectsChallengeGetStartedDownloadStarterFiles starterFilesHref="https://figma.com" />
      ),
      id: 'key',
      label: intl.formatMessage({
        defaultMessage: 'Download starter files',
        description:
          'Label for "Download starter files" step in dialog on Projects project page',
        id: 'e/t5dH',
      }),
    },
  ];

  return (
    <ProjectsChallengeHowItWorksCard>
      <div>
        <ol className="relative flex flex-col gap-y-6">
          <div
            className={clsx(
              'absolute start-3 h-full border-l border-dashed',
              themeBorderElementColor,
            )}
          />
          {steps.map((step, index) => {
            return (
              <li
                key={step.id}
                aria-label={step.label}
                className="flex items-start gap-2.5">
                <div className="flex flex-col self-stretch">
                  <div className={clsx('z-10', themeBackgroundLayerColor)}>
                    <Chip
                      aria-hidden={true}
                      className="shrink-0"
                      label={(index + 1).toString()}
                      size="xs"
                      variant="active"
                    />
                  </div>
                  {index === steps.length - 1 && (
                    <div
                      className={clsx(
                        'z-10 flex-1 self-stretch',
                        themeBackgroundLayerColor,
                      )}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <Text className="text-sm" color="active" weight="medium">
                    {step.label}
                  </Text>
                  <div className="flex flex-col items-start gap-4">
                    <Text className="text-xs" color="secondary">
                      <FormattedMessage
                        defaultMessage="Includes assets, JPG images of the design files, and a basic style guide. There's also a README to help you get started."
                        description="Description for Download Starter Files content section on Before You Get Started dialog"
                        id="ynLgE+"
                      />
                    </Text>
                    <Button
                      addonPosition="start"
                      href="https://figma.com"
                      icon={RiCodeSSlashLine}
                      label={intl.formatMessage({
                        defaultMessage: 'Download starter code + image assets',
                        description:
                          'Label for "Download starter code + image assets" button on Projects project page',
                        id: 'VElW3O',
                      })}
                      size="xs"
                      variant="primary"
                    />
                  </div>
                  <Divider />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
