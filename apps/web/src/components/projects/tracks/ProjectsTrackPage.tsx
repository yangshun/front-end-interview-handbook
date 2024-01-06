'use client';

import clsx from 'clsx';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsProjectCountTag from '~/components/projects/stats/ProjectsProjectCountTag';
import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import type { ProjectsTrack } from '~/components/projects/tracks/ProjectsTracksData';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeElementBorderColor,
} from '~/components/ui/theme';

export type Props = Readonly<{
  track: ProjectsTrack;
}>;

export default function ProjectsTrackPage({ track }: Props) {
  const { projects, completedProjectCount, points, metadata } = track;
  const { title, description } = metadata;

  const intl = useIntl();

  return (
    <div className="flex flex-col">
      <Button
        addonPosition="start"
        className="-ms-4 -mt-2 self-start"
        href="/projects/tracks"
        icon={RiArrowLeftLine}
        label={intl.formatMessage({
          defaultMessage: 'Back to all tracks',
          description: 'Button label to go back to all projects tracks',
          id: 'zpsjf3',
        })}
        variant="tertiary"
      />
      <div className="mb-12 mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="bg-red h-16 w-16 rounded-lg" />
          <div className="flex flex-col gap-2">
            <Heading level="heading5">{title}</Heading>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <ProjectsReputationCountIncreaseTag
                points={points}
                variant="flat"
              />
              <ProjectsProjectCountTag
                total={projects.length}
                value={completedProjectCount}
              />
            </div>
          </div>
        </div>
        <Text color="secondary" size="body2">
          {description}
        </Text>
      </div>
      <Card
        className="p-6"
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <div
          className={clsx(
            'relative flex flex-col gap-4',
            'before:border-element before:absolute before:left-3 before:-z-10 before:h-full before:w-px before:border-l before:border-dashed dark:before:border-neutral-700',
          )}>
          {projects.map((project, index) => (
            <div key={project.slug} className="group flex items-center gap-6">
              <div
                className={clsx(
                  'relative flex flex-col justify-center self-stretch',
                  'before:absolute before:top-0 before:hidden before:h-1/2 before:w-full before:bg-white group-first:before:block dark:before:bg-neutral-900',
                  'after:absolute after:bottom-0 after:hidden after:h-1/2 after:w-full after:bg-white group-last:after:block dark:after:bg-neutral-900',
                )}>
                <div
                  className={clsx(
                    'z-10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full',
                    themeBackgroundLayerEmphasized,
                    themeElementBorderColor,
                  )}>
                  <Text color="secondary" size="body2" weight="medium">
                    {index + 1}
                  </Text>
                </div>
              </div>
              <div
                className={clsx(
                  'bg-red self-start rounded',
                  'md:h-[100px] md:w-[130px]',
                  'h-[62px] w-[80px]',
                )}
              />
              <div className="flex flex-col items-start gap-2">
                <Text weight="medium">{project.title}</Text>
                <Text color="secondary" size="body3">
                  {project.description}
                </Text>
                <Button
                  className="-ms-3"
                  href={project.href}
                  icon={RiArrowRightLine}
                  label="Start building"
                  size="sm"
                  variant="tertiary"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
