import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiImageLine, RiInformationLine } from 'react-icons/ri';
import url from 'url';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsImageBreakpointButtonGroup from '~/components/projects/common/ProjectsImageBreakpointButtonGroup';
import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '~/components/projects/common/ProjectsImageBreakpoints';
import ProjectsChallengeSubmissionImageComparisonSlider from '~/components/projects/submissions/ProjectsChallengeSubmissionImageComparisonSlider';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import EmptyState from '~/components/ui/EmptyState';
import Img from '~/components/ui/Img';
import Spinner from '~/components/ui/Spinner';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsImageViewer from './ProjectsImageViewer';
import type { ProjectsChallengeVariantImages } from '../challenges/types';
import ProjectsChallengeSubmissionImageMatchScore from '../submissions/screenshots/ProjectsChallengeSubmissionImageMatchScore';

import type { ProjectsChallengeSubmissionScreenshotStatus } from '@prisma/client';

type RetakeScreenshotStatus = 'error' | 'idle' | 'loading' | 'success';
type Props = Readonly<{
  allowRetakeScreenshot?: boolean;
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  onTakeScreenshot: () => void;
  retakeScreenshotStatus: RetakeScreenshotStatus;
  screenshotStatus: ProjectsChallengeSubmissionScreenshotStatus;
  specImagesForVariant: ProjectsChallengeVariantImages;
  specLabels: Record<string, string>;
  specShowGridLayoutButton: React.ComponentProps<
    typeof ProjectsImageViewer
  >['specShowGridLayoutButton'];
  title?: string;
}>;

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const mapScreenshotStatusToImageComparisonStatus = (
  screenshotStatus: ProjectsChallengeSubmissionScreenshotStatus,
): RetakeScreenshotStatus => {
  let status: RetakeScreenshotStatus = 'loading';

  if (screenshotStatus === 'PENDING') {
    status = 'loading';
  }

  if (screenshotStatus === 'COMPLETED') {
    status = 'success';
  }

  if (screenshotStatus === 'FAILED') {
    status = 'error';
  }

  return status;
};

export default function ProjectsImageComparison({
  allowRetakeScreenshot,
  screenshotStatus,
  title,
  specLabels,
  specShowGridLayoutButton,
  specImagesForVariant,
  onTakeScreenshot,
  deploymentUrls,
  retakeScreenshotStatus,
}: Props) {
  const intl = useIntl();
  const [selectedBreakpoint, setSelectedBreakpoint] =
    useState<ProjectsImageBreakpointCategory>('desktop');
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const [imageComparisonStatus, setImageComparisonStatus] =
    useState<RetakeScreenshotStatus>(() => {
      return mapScreenshotStatusToImageComparisonStatus(screenshotStatus);
    });
  const deploymentImagesForBreakpointWithComparison = (
    deploymentUrls ?? []
  ).map((deploymentUrlItem) => {
    const matchingComparisonImage = specImagesForVariant?.find(
      (comparisonImage) => comparisonImage.label === deploymentUrlItem.label,
    );

    // To invalidate cached images after taking screenshot
    const updatedAt = deploymentUrlItem?.updatedAt?.getTime();
    const imageUrl = deploymentUrlItem?.images?.[selectedBreakpoint] ?? '';

    return {
      image: imageUrl
        ? new URL(url.format({ query: { updatedAt } }), imageUrl).toString()
        : '',
      label: deploymentUrlItem?.label,
      original: matchingComparisonImage?.images?.[selectedBreakpoint] ?? '',
    };
  });
  const { width } = ProjectsImageBreakpointDimensions[selectedBreakpoint];

  const { image: userSubmittedImage, original: baseImage } =
    deploymentImagesForBreakpointWithComparison[selectedScreenIndex];

  useEffect(() => {
    setImageComparisonStatus(retakeScreenshotStatus);
  }, [retakeScreenshotStatus]);

  useEffect(() => {
    const status = mapScreenshotStatusToImageComparisonStatus(screenshotStatus);

    setImageComparisonStatus(status);
  }, [screenshotStatus]);

  const showRetakeScreenshotButton =
    allowRetakeScreenshot && screenshotStatus !== 'PENDING';
  const isRetakingScreenshotInProgress = retakeScreenshotStatus === 'loading';
  const showLoadingState = imageComparisonStatus === 'loading';
  const showSuccessState = imageComparisonStatus === 'success';
  const showErrorState = imageComparisonStatus === 'error';
  // TODO(projects): there's still a bug where if a user freshly loads the page
  // while the screenshotsStatus is pending, there's no pending mutation
  // that will refresh the page when the screenshot taking is failed/completed.

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
            'flex flex-wrap justify-between gap-4',
            'px-4 py-4 md:px-6',
          )}>
          <Text size="body1" weight="bold">
            {title}
          </Text>
          <div
            className={clsx(
              'flex items-center gap-2 md:gap-4',
              showSuccessState ? 'flex-1 justify-between' : 'justify-start',
            )}>
            {showSuccessState && (
              <ProjectsChallengeSubmissionImageMatchScore
                baseImage={baseImage}
                breakpoint={selectedBreakpoint}
                userSubmittedImage={userSubmittedImage}
              />
            )}
            {showRetakeScreenshotButton && (
              <Button
                addonPosition="start"
                icon={RiImageLine}
                isDisabled={isRetakingScreenshotInProgress}
                isLoading={isRetakingScreenshotInProgress}
                label={intl.formatMessage({
                  defaultMessage: 'Retake screenshot',
                  description: 'Retake screenshot button label',
                  id: 'e0C2cj',
                })}
                tooltip={intl.formatMessage({
                  defaultMessage:
                    'When your site URL was submitted, we automatically take screenshots of your pages. You can manually trigger retake with this button if your site has been updated',
                  description: 'Tooltip for retake screenshot button',
                  id: 'eNCfLw',
                })}
                variant="secondary"
                onClick={onTakeScreenshot}
              />
            )}
          </div>
        </div>
      )}
      {showLoadingState && (
        <div
          className={clsx(
            'flex flex-1 flex-col items-center justify-center gap-4',
            'aspect-[5/3] md:aspect-[7/3]',
            'size-full px-4',
          )}>
          <Spinner display="block" />
          <Text className="text-center" size="body1" weight="bold">
            {isRetakingScreenshotInProgress ? (
              <FormattedMessage
                defaultMessage="Retaking screenshots, please check back later."
                description="Message for screenshot in progress"
                id="dxmK3O"
              />
            ) : (
              <FormattedMessage
                defaultMessage="Generating screenshots, please check back later."
                description="Message for screenshot in progress"
                id="xcLT+y"
              />
            )}
          </Text>
        </div>
      )}
      {showErrorState && (
        <div
          className={clsx(
            'flex flex-1 flex-col items-center justify-center gap-4',
            'aspect-[5/3] md:aspect-[7/3]',
            'size-full',
          )}>
          <EmptyState
            subtitle={
              allowRetakeScreenshot &&
              intl.formatMessage({
                defaultMessage: 'Please try retaking the screenshot',
                description: 'Retake error message for screenshot',
                id: 'xP6aru',
              })
            }
            title={intl.formatMessage({
              defaultMessage: 'Error generating screenshots.',
              description: 'Error message for error while taking screenshot',
              id: 'FLv3Wf',
            })}
            variant="error"
          />
        </div>
      )}
      {/* Image Comparison Slider */}
      {showSuccessState && (
        <div className="flex-1">
          {deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
            .original ? (
            <ProjectsChallengeSubmissionImageComparisonSlider
              aspectRatioClass="aspect-[5/3] md:aspect-[7/3]"
              image={
                deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                  .image
              }
              maxWidth={width}
              originalImage={
                deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                  .original
              }
            />
          ) : (
            <ProjectsImageViewer
              alt={
                deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                  .label
              }
              aspectRatioClass="aspect-[5/3] md:aspect-[7/3]"
              grid={ProjectsImageBreakpointDimensions[selectedBreakpoint].grid}
              specShowGridLayoutButton={specShowGridLayoutButton}
              src={
                deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                  .image
              }
              width={width}
            />
          )}
        </div>
      )}
      {/* Footer */}
      <div
        className={clsx(
          'grid grid-cols-4 gap-4',
          deploymentImagesForBreakpointWithComparison.length > 1 &&
            'md:grid-cols-3',
          'px-4 py-4 md:px-6',
          'w-full',
          ['border-t', themeBorderElementColor],
        )}>
        <div
          className={clsx('flex flex-col justify-center', [
            deploymentImagesForBreakpointWithComparison.length > 1
              ? 'col-span-4 md:col-span-1'
              : 'col-span-2',
          ])}>
          {deploymentImagesForBreakpointWithComparison.length > 1 && (
            <Text color="secondary" size="body1" weight="medium">
              {specLabels[
                deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                  .label
              ] ||
                deploymentImagesForBreakpointWithComparison[selectedScreenIndex]
                  .label}
            </Text>
          )}
          {deploymentUrls && (
            <div className="flex items-center gap-2">
              <Tooltip
                asChild={true}
                hyphenated={true}
                label={deploymentUrls[selectedScreenIndex].href}>
                <Anchor
                  className={clsx(
                    'truncate whitespace-nowrap',
                    textVariants({ color: 'inherit', size: 'body2' }),
                  )}
                  href={deploymentUrls[selectedScreenIndex].href}
                  warnAboutExternalLink={true}>
                  {deploymentUrls[selectedScreenIndex].href}
                </Anchor>
              </Tooltip>
              {(() => {
                const timestamp = deploymentUrls[selectedScreenIndex].updatedAt;

                if (timestamp == null) {
                  return null;
                }

                const label = `Generated on ${dateFormatter.format(
                  new Date(timestamp),
                )}`;

                return (
                  <Tooltip label={label}>
                    <RiInformationLine
                      aria-label={label}
                      className={clsx(
                        'size-4 shrink-0',
                        themeTextSecondaryColor,
                      )}
                    />
                  </Tooltip>
                );
              })()}
            </div>
          )}
        </div>
        {showSuccessState && (
          <>
            {deploymentImagesForBreakpointWithComparison.length > 1 && (
              <div
                className={clsx(
                  'flex gap-2 md:justify-center',
                  'col-span-2 md:col-span-1',
                )}>
                {deploymentImagesForBreakpointWithComparison.map(
                  (page, index) => (
                    <Tooltip
                      key={page.label}
                      asChild={true}
                      label={
                        specLabels[
                          deploymentImagesForBreakpointWithComparison[index]
                            .label
                        ] ||
                        deploymentImagesForBreakpointWithComparison[index].label
                      }>
                      <button
                        aria-label={page.label}
                        className={clsx(
                          'size-12 overflow-clip rounded',
                          'border',
                          index === selectedScreenIndex
                            ? themeBorderBrandColor
                            : themeBorderElementColor,
                          themeOutlineElement_FocusVisible,
                          themeOutlineElementBrandColor_FocusVisible,
                        )}
                        type="button"
                        onClick={() => setSelectedScreenIndex(index)}>
                        <Img
                          alt={page.label}
                          className="size-full object-cover"
                          decoding="async"
                          loading="lazy"
                          src={page.image}
                        />
                      </button>
                    </Tooltip>
                  ),
                )}
              </div>
            )}
            <div
              className={clsx('flex items-center justify-end', [
                'col-span-2',
                deploymentImagesForBreakpointWithComparison.length > 1 &&
                  'md:col-span-1',
              ])}>
              <ProjectsImageBreakpointButtonGroup
                breakpoint={selectedBreakpoint}
                setBreakpoint={setSelectedBreakpoint}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
