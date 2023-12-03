'use client';

import clsx from 'clsx';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsTrack } from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordionItem';
import ProjectsProjectCountTag from '~/components/projects/stats/ProjectsProjectCountTag';
import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
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

export default function ProjectsTrackPage({
  track: {
    projects,
    totalProjectCount,
    completedProjectCount,
    repCount,
    title,
    description,
  },
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col items-stretch p-4 md:p-[60px]">
      <Button
        addonPosition="start"
        className="-ms-4 self-start"
        icon={RiArrowLeftLine}
        label={intl.formatMessage({
          defaultMessage: 'Back to all component tracks',
          description:
            'Label for "Back to all component tracks" button on Projects track page',
          id: 'sStS22',
        })}
        variant="tertiary"
      />
      <div className="mb-12 mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="bg-red h-16 w-16 rounded-lg" />
          <div className="flex flex-col gap-2">
            <Heading level="heading5">{title}</Heading>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <ProjectsReputationCountIncreaseTag repCount={repCount} />
              <ProjectsProjectCountTag
                total={totalProjectCount}
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
            <div key={project.key} className="group flex items-center gap-6">
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
                  This is some description
                </Text>
                <Button
                  className="-ms-3"
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
