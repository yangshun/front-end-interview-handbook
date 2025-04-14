import clsx from 'clsx';
import { useState } from 'react';

import ProjectsImageBreakpointButtonGroup from '~/components/projects/common/ProjectsImageBreakpointButtonGroup';
import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '~/components/projects/common/ProjectsImageBreakpoints';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import ProjectsImageViewer from './ProjectsImageViewer';
import type { ProjectsChallengeVariantImages } from '../challenges/types';

type Props = Readonly<{
  specImagesForVariant: ProjectsChallengeVariantImages;
  specLabels: Record<string, string>;
  specShowGridLayoutButton: React.ComponentProps<
    typeof ProjectsImageViewer
  >['specShowGridLayoutButton'];
}>;

export default function ProjectsImageDisplay({
  specShowGridLayoutButton,
  specImagesForVariant,
  specLabels,
}: Props) {
  const [selectedBreakpoint, setSelectedBreakpoint] =
    useState<ProjectsImageBreakpointCategory>('desktop');
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);

  const specImagesForBreakpoint = specImagesForVariant.map(
    (comparisonImage) => ({
      image: comparisonImage.images[selectedBreakpoint],
      label: comparisonImage.label,
    }),
  );

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
      {/* Image Container */}
      <div className="flex-1">
        <ProjectsImageViewer
          alt={specImagesForVariant[selectedScreenIndex].label}
          aspectRatioClass="aspect-[5/3]"
          grid={ProjectsImageBreakpointDimensions[selectedBreakpoint].grid}
          specShowGridLayoutButton={specShowGridLayoutButton}
          src={
            specImagesForVariant[selectedScreenIndex].images[selectedBreakpoint]
          }
          width={width}
        />
      </div>
      {/* Footer */}
      <div
        className={clsx(
          'grid grid-cols-2 gap-4',
          specImagesForBreakpoint.length > 1 && 'md:grid-cols-4',
          'px-4 py-4 md:px-6',
          'w-full',
          ['border-t', themeBorderElementColor],
        )}>
        <div className={clsx('col-span-1 flex flex-col justify-center')}>
          {specImagesForBreakpoint.length > 1 && (
            <Text color="secondary" size="body1" weight="medium">
              {specLabels[specImagesForBreakpoint[selectedScreenIndex].label] ||
                specImagesForBreakpoint[selectedScreenIndex].label}
            </Text>
          )}
          <Text color="secondary" size="body3" weight="medium">
            {width}px &times; {height}px
          </Text>
        </div>
        <div className="col-span-1 flex items-center justify-end md:order-last">
          <ProjectsImageBreakpointButtonGroup
            breakpoint={selectedBreakpoint}
            setBreakpoint={setSelectedBreakpoint}
          />
        </div>
        {specImagesForBreakpoint.length > 1 && (
          <div className={clsx('flex justify-center gap-2', 'col-span-2')}>
            {specImagesForBreakpoint.map((page, index) => (
              <button
                key={page.label}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
