import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import ProjectsChallengeGetStartedDownloadStarterFiles from '~/components/projects/challenges/get-started/ProjectsChallengeGetStartedDownloadStarterFiles';
import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';
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
      id: 'download-starter-files',
      label: intl.formatMessage({
        defaultMessage: 'Download starter files',
        description:
          'Label for "Download starter files" step in dialog on Projects project page',
        id: 'e/t5dH',
      }),
    },
    {
      id: 'dummy',
      label: 'Dummy just for height',
    },
  ];

  return (
    <ProjectsChallengeHowItWorksCard>
      <div>
        <ol className="relative flex flex-col gap-y-6">
          <div
            className={clsx('absolute start-2.5', 'h-full', [
              'border-l border-dashed',
              themeBorderElementColor,
            ])}
          />
          {steps.map((step, index) => (
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
                      'z-[1] flex-1 self-stretch',
                      themeBackgroundLayerColor,
                    )}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <Text
                  className="text-sm"
                  color="active"
                  size="body1"
                  weight="medium">
                  {step.label}
                </Text>
                <div className="origin-top-left scale-75">
                  <ProjectsChallengeGetStartedDownloadStarterFiles slug="" />
                </div>
                <Divider />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
