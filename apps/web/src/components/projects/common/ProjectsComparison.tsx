import clsx from 'clsx';
import { useState } from 'react';
import { RiImageLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsImageBreakpointButtonGroup from '~/components/projects/common/ProjectsImageBreakpointButtonGroup';
import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '~/components/projects/common/ProjectsImageBreakpoints';
import ProjectsChallengeSubmissionImageComparisonSlider from '~/components/projects/submissions/ProjectsChallengeSubmissionImageComparisonSlider';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import type { ProjectsBaseScreenshot } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

type CommonProps = Readonly<{
  baseScreenshots: Array<ProjectsBaseScreenshot>;
  showDimensions?: boolean;
  title?: string;
}>;

type Props = Readonly<
  CommonProps &
    (
      | {
          deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
          isTakingScreenshot: boolean;
          mode: 'compare';
          onTakeScreenshot: () => void;
        }
      | {
          deploymentUrls?: ProjectsChallengeSubmissionDeploymentUrls;
          isTakingScreenshot?: boolean;
          mode: 'display';
          onTakeScreenshot?: () => void;
        }
    )
>;

export default function ProjectsComparison({
  title,
  baseScreenshots,
  deploymentUrls,
  onTakeScreenshot,
  isTakingScreenshot,
  showDimensions,
  mode,
}: Props) {
  const intl = useIntl();
  const [selectedBreakpoint, setSelectedBreakpoint] =
    useState<ProjectsImageBreakpointCategory>('desktop');
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const pages = baseScreenshots.map((baseItem) => {
    const deploymentUrl = deploymentUrls?.find(
      (item) => item.label === baseItem.label,
    );

    return {
      label: deploymentUrl?.label || baseItem.label,
      original: baseItem.screenshots?.[selectedBreakpoint],
      screenshot: deploymentUrl?.screenshots?.[selectedBreakpoint] ?? '',
    };
  });

  const { width, height } =
    ProjectsImageBreakpointDimensions[selectedBreakpoint];

  return (
    <div
      className={clsx(
        'flex flex-col overflow-hidden',
        'rounded-lg',
        ['border', themeBorderElementColor],
        'bg-neutral-50 dark:bg-neutral-950',
      )}>
      {/* Header */}
      {title && (
        <div
          className={clsx(
            'flex flex-col justify-between md:flex-row gap-4',
            'px-4 py-4 md:px-6',
          )}>
          <Heading level="heading6">{title}</Heading>
          <Button
            addonPosition="start"
            icon={RiImageLine}
            isDisabled={isTakingScreenshot}
            isLoading={isTakingScreenshot}
            label={intl.formatMessage({
              defaultMessage: 'Retake screenshot',
              description: 'Retake screenshot button label',
              id: 'e0C2cj',
            })}
            variant="secondary"
            onClick={onTakeScreenshot}
          />
        </div>
      )}
      {/* Image Comparison Slider */}
      <div className="flex-1">
        {mode === 'display' ? (
          <img
            alt={pages[selectedScreenIndex].label}
            className={clsx('aspect-[4/3] w-full')}
            src={pages[selectedScreenIndex].original}
          />
        ) : (
          <ProjectsChallengeSubmissionImageComparisonSlider
            image={pages[selectedScreenIndex]}
          />
        )}
      </div>
      {/* Footer */}
      <div className="grid grid-col-2 md:grid-cols-8 md:px-6 px-4 py-4 w-full gap-2">
        <div
          className={clsx(
            'col-span-1 md:col-span-2 flex flex-col justify-center',
          )}>
          {showDimensions && (
            <Text color="secondary" size="body3" weight="medium">
              {width}px &times; {height}px
            </Text>
          )}
          <Text color="secondary" weight="medium">
            {pages[selectedScreenIndex].label}
          </Text>
          {deploymentUrls && (
            <Text
              className="whitespace-nowrap truncate"
              display="block"
              size="body2">
              <Anchor href={deploymentUrls[selectedScreenIndex].href}>
                {deploymentUrls[selectedScreenIndex].href}
              </Anchor>
            </Text>
          )}
        </div>
        <div className="flex col-span-1 md:col-span-2 md:order-last justify-end items-center">
          <ProjectsImageBreakpointButtonGroup
            breakpoint={selectedBreakpoint}
            setBreakpoint={setSelectedBreakpoint}
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
                'size-12 rounded border overflow-clip',
                index === selectedScreenIndex
                  ? themeBorderBrandColor
                  : themeBorderElementColor,
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
              )}
              type="button"
              onClick={() => setSelectedScreenIndex(index)}>
              <img
                alt={page.label}
                className="object-cover size-full"
                src={page.screenshot || page.original}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
