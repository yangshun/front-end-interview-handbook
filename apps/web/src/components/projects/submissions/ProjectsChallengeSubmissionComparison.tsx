import clsx from 'clsx';
import { useState } from 'react';
import { RiImageLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeSubmissionImageComparisonSlider from '~/components/projects/submissions/ProjectsChallengeSubmissionImageComparisonSlider';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import type { ProjectsChallengeSubmissionDeploymentUrls } from './types';
import ProjectsImageBreakpointButtonGroup from '../common/ProjectsImageBreakpointButtonGroup';
import type { ProjectsImageBreakpointCategory } from '../common/ProjectsImageBreakpoints';

type Props = Readonly<{
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  submissionId: string;
}>;

export default function ProjectsChallengeSubmissionComparison({
  deploymentUrls,
  submissionId,
}: Props) {
  const intl = useIntl();
  const [selectedDevice, setSelectedDevice] =
    useState<ProjectsImageBreakpointCategory>('desktop');
  // TODO(projects): refetch submission to prevent storing duplicated state
  const [deploymentScreenshots, setDeploymentScreenshots] =
    useState<ProjectsChallengeSubmissionDeploymentUrls>(deploymentUrls);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const pages = deploymentScreenshots.map((page) => ({
    label: page.label,
    original: `https://source.unsplash.com/random/1080x700?random=${page.label}`,
    screenshot: page.screenshots?.[selectedDevice],
  }));

  const takeScreenshotMutation =
    trpc.projects.submissions.takeScreenshot.useMutation();

  return (
    <Section>
      <div
        className={clsx(
          'flex flex-col',
          'rounded-lg',
          ['border', themeBorderElementColor],
          'bg-neutral-50 dark:bg-neutral-950',
        )}>
        {/* Header */}
        <div
          className={clsx(
            'flex flex-col justify-between md:flex-row gap-4',
            'px-4 py-4 md:px-6',
          )}>
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Solution vs Design comparison"
              description="Solution vs design comparison title"
              id="3ffp8N"
            />
          </Heading>
          <Button
            addonPosition="start"
            icon={RiImageLine}
            isDisabled={takeScreenshotMutation.isLoading}
            isLoading={takeScreenshotMutation.isLoading}
            label={intl.formatMessage({
              defaultMessage: 'Retake screenshot',
              description: 'Retake screenshot button label',
              id: 'e0C2cj',
            })}
            variant="secondary"
            onClick={() => {
              takeScreenshotMutation
                .mutateAsync({ submissionId })
                .then((newDeploymentScreenshots) => {
                  setDeploymentScreenshots(newDeploymentScreenshots);
                });
            }}
          />
        </div>
        {/* Image Comparison Slider */}
        <div className="flex-1">
          <ProjectsChallengeSubmissionImageComparisonSlider
            image={pages[selectedScreenIndex]}
          />
        </div>
        {/* Footer */}
        <div className="grid grid-col-2 md:grid-cols-8 md:px-6 px-4 py-4 w-full">
          <Text
            className={clsx('col-span-1 md:col-span-2 flex items-center')}
            color="secondary"
            weight="medium">
            {deploymentScreenshots[selectedScreenIndex].label}
          </Text>
          <div className="flex col-span-1 md:col-span-2 md:order-last justify-end items-center">
            <ProjectsImageBreakpointButtonGroup
              device={selectedDevice}
              setDevice={setSelectedDevice}
            />
          </div>
          <div
            className={clsx(
              'flex justify-center gap-2',
              'col-span-2 md:col-span-4',
            )}>
            {pages.map((page, index) => (
              <button
                key={page.label}
                className={clsx(
                  'w-12 h-12 rounded border overflow-clip',
                  index === selectedScreenIndex
                    ? 'border-brand-dark dark:border-brand'
                    : themeBorderElementColor,
                )}
                type="button"
                onClick={() => setSelectedScreenIndex(index)}>
                <img
                  alt={page.label}
                  className="object-cover w-full h-full"
                  src={page.screenshot}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
