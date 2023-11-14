import clsx from 'clsx';
import { RiArrowDownSLine, RiArrowRightLine, RiLockLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeGlassyBorder,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsProjectCount from '../stats/ProjectsProjectCount';
import ProjectsReputationCount from '../stats/ProjectsReputationCount';

import * as Accordion from '@radix-ui/react-accordion';

type ProjectsTrackProject = {
  key: string;
  title: string;
};

export type ProjectsTrack = {
  completedProjectCount: number;
  description: string;
  isPremium: boolean;
  key: string;
  projects: Array<ProjectsTrackProject>;
  repCount: number;
  title: string;
  totalProjectCount: number;
};

type Props = Readonly<{
  track: ProjectsTrack;
}>;

export default function ProjectsMarketingComponentTrackAccordionItem({
  track: {
    key,
    title,
    description,
    repCount,
    projects,
    totalProjectCount,
    completedProjectCount,
    isPremium,
  },
}: Props) {
  const intl = useIntl();

  return (
    <Accordion.Item value={key}>
      <Card
        className="flex flex-col overflow-visible bg-neutral-800/40 hover:bg-neutral-800/50"
        disableBackground={true}
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <Accordion.Header asChild={true}>
          <Accordion.Trigger className="outline-brand group rounded-lg">
            <div className="flex items-center justify-between gap-2 p-6">
              <div className="flex flex-col items-start text-start">
                <div className="flex gap-2">
                  <Text weight="medium">{title}</Text>
                  {isPremium && (
                    <Badge
                      icon={RiLockLine}
                      label={intl.formatMessage({
                        defaultMessage: 'Premium',
                        description:
                          'Label on Premium badge to indicate premium-only access',
                        id: 'aWL34G',
                      })}
                      size="sm"
                      variant="special"
                    />
                  )}
                </div>
                <Text className="mt-1" size="body2">
                  {description}
                </Text>
                <div className="mt-2 flex gap-4">
                  <ProjectsReputationCount repCount={repCount} />
                  <ProjectsProjectCount
                    total={totalProjectCount}
                    value={completedProjectCount}
                  />
                </div>
              </div>
              <RiArrowDownSLine
                className={clsx(
                  'h-5 w-5 transition-transform group-data-[state=open]:rotate-180',
                  themeTextSecondaryColor,
                )}
              />
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="-mt-4 p-6">
          <div className="-mx-6 overflow-hidden">
            <div className="flex overflow-x-auto px-6">
              {projects.map((project, i) => (
                <div key={project.key} className="relative flex flex-col gap-4">
                  <div className="flex items-center">
                    <div
                      className={clsx(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                        themeGlassyBorder,
                        themeBackgroundEmphasized,
                      )}>
                      <Text color="secondary" size="body2">
                        {i + 1}
                      </Text>
                    </div>
                    {i < projects.length - 1 && (
                      <div className="flex-1 border-t border-dashed border-neutral-800" />
                    )}
                  </div>
                  <button
                    className={clsx(
                      'outline-brand flex flex-col gap-2 rounded-md bg-neutral-900 p-2',
                      i < projects.length - 1 && 'me-4',
                    )}
                    type="button">
                    <img
                      alt=""
                      className="h-32 w-48 self-stretch rounded-md bg-neutral-800"
                      src=""
                    />
                    <Text size="body2" weight="medium">
                      {project.title}
                    </Text>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="mt-6"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'See whole component track',
              description:
                'Label for "See whole component track" button in Component track accordion',
              id: 'MwvhTF',
            })}
            variant="secondary"
          />
        </Accordion.Content>
      </Card>
    </Accordion.Item>
  );
}
