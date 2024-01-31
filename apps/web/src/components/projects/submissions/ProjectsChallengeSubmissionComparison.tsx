import clsx from 'clsx';
import { useState } from 'react';
import {
  RiAddLine,
  RiComputerLine,
  RiImageLine,
  RiSmartphoneLine,
  RiSubtractLine,
  RiTabletLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import FilterButton from '~/components/common/FilterButton';
import ProjectsChallengeSubmissionImageComparisonSlider from '~/components/projects/submissions/ProjectsChallengeSubmissionImageComparisonSlider';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import type {
  ProjectsChallengeSubmissionDeploymentScreenshotDevice,
  ProjectsChallengeSubmissionDeploymentUrls,
} from './types';

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
    useState<ProjectsChallengeSubmissionDeploymentScreenshotDevice>('desktop');
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
        <div className="flex md:px-6 px-4 py-4 justify-between md:flex-row flex-col gap-4">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Solution vs Design comparison"
              description="Solution vs design comparison title"
              id="3ffp8N"
            />
          </Heading>
          <div className="flex gap-2 items-center">
            <Button
              addonPosition="start"
              className="flex-1 md:flex-auto"
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
            <Button
              icon={RiSubtractLine}
              isLabelHidden={true}
              label="Zoom out"
              variant="secondary"
            />
            <Text size="body3">100%</Text>
            <Button
              icon={RiAddLine}
              isLabelHidden={true}
              label="Zoom in"
              variant="secondary"
            />
          </div>
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
          <div className="col-span-1 md:col-span-2 md:order-last justify-end items-center flex gap-2">
            {(
              [
                {
                  icon: RiComputerLine,
                  label: 'Desktop',
                  value: 'desktop',
                },
                {
                  icon: RiTabletLine,
                  label: 'Tablet',
                  value: 'tablet',
                },
                {
                  icon: RiSmartphoneLine,
                  label: 'Mobile',
                  value: 'mobile',
                },
              ] as const
            ).map(({ icon, label, value }) => (
              <FilterButton
                key={label}
                icon={icon}
                isLabelHidden={true}
                label={label}
                purpose="tab"
                selected={selectedDevice === value}
                tooltip={label}
                onClick={() => {
                  setSelectedDevice(value);
                }}
              />
            ))}
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
