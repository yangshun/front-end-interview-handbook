import clsx from 'clsx';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiLock2Line,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasized,
  themeGlassyBorder,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsProjectCountTag from '../stats/ProjectsProjectCountTag';
import ProjectsReputationCountIncreaseTag from '../stats/ProjectsReputationCountIncreaseTag';
import type { ProjectsTrack } from '../tracks/ProjectsTracksData';

import * as Accordion from '@radix-ui/react-accordion';

type Props = Readonly<{
  track: ProjectsTrack;
}>;

export default function ProjectsMarketingComponentTrackAccordionItem({
  track,
}: Props) {
  const {
    href,
    slug,
    title,
    description,
    points,
    projects,
    totalProjectCount,
    completedProjectCount,
    isPremium,
  } = track;

  const intl = useIntl();

  return (
    <Accordion.Item value={slug}>
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
                      icon={RiLock2Line}
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
                  <ProjectsReputationCountIncreaseTag
                    points={points}
                    variant="flat"
                  />
                  <ProjectsProjectCountTag
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
                <div
                  key={project.slug}
                  className="relative flex flex-col gap-4">
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
                  <Anchor
                    className={clsx(
                      'outline-brand flex flex-col gap-2 rounded-md bg-neutral-900 p-2',
                      i < projects.length - 1 && 'me-4',
                    )}
                    href={project.href}>
                    <img
                      alt=""
                      className="h-32 w-48 self-stretch rounded-md bg-neutral-800"
                      src=""
                    />
                    <Text size="body2" weight="medium">
                      {project.title}
                    </Text>
                  </Anchor>
                </div>
              ))}
            </div>
          </div>
          <Anchor className="inline-flex mt-6" href={href}>
            <Text
              className="inline-flex gap-2 items-center"
              color="inherit"
              size="body2"
              weight="medium">
              {intl.formatMessage({
                defaultMessage: 'See whole component track',
                description:
                  'Label for "See whole component track" button in Component track accordion',
                id: 'MwvhTF',
              })}
              <RiArrowRightLine
                aria-hidden={true}
                className="w-4 h-4 shrink-0"
              />
            </Text>
          </Anchor>
        </Accordion.Content>
      </Card>
    </Accordion.Item>
  );
}
