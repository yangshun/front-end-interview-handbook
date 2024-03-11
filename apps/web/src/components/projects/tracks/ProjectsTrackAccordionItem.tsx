import clsx from 'clsx';
import { RiArrowDownSLine, RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderElementColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import ProjectsTrackChallengeStatusChip from './ProjectsTrackChallengeStatusChip';
import ProjectsTrackHeader from './ProjectsTrackHeader';
import ProjectsTrackPaywall from './ProjectsTrackPaywall';
import type { ProjectsTrackItem } from './ProjectsTracksData';
import {
  projectsTrackCountCompleted,
  projectsTrackDetermineChallengeStatus,
} from './ProjectsTrackUtils';
import type { ProjectsChallengeStatuses } from '../challenges/types';

import * as Accordion from '@radix-ui/react-accordion';

type Props = Readonly<{
  challengeStatuses?: ProjectsChallengeStatuses;
  isViewerPremium: boolean;
  track: ProjectsTrackItem;
}>;

export default function ProjectsTrackAccordionItem({
  challengeStatuses = {},
  track,
  isViewerPremium,
}: Props) {
  const intl = useIntl();

  const { metadata, challenges } = track;
  const { href, slug } = metadata;

  return (
    <Accordion.Item value={slug}>
      <Card
        className={clsx(
          'flex flex-col overflow-visible',
          themeBackgroundCardColor,
        )}
        disableBackground={true}
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <Accordion.Header asChild={true}>
          <Accordion.Trigger className="outline-brand group rounded-lg">
            <div className="flex items-center justify-between gap-2 p-6">
              <ProjectsTrackHeader
                completedCount={projectsTrackCountCompleted(
                  challengeStatuses ?? {},
                  challenges,
                )}
                track={track}
              />
              <RiArrowDownSLine
                className={clsx(
                  'size-5 transition-transform group-data-[state=open]:rotate-180',
                  themeTextSecondaryColor,
                )}
              />
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="-mt-4 p-6">
          {track.metadata.premium && !isViewerPremium ? (
            <div>
              <ProjectsTrackPaywall />
            </div>
          ) : (
            <>
              <div className="-mr-6 overflow-hidden">
                <div className="flex overflow-x-auto pb-3 pr-6">
                  {challenges.map((challenge, i) => (
                    <div
                      key={challenge.slug}
                      className="relative flex shrink-0 flex-col gap-4">
                      <div className="flex items-center">
                        <ProjectsTrackChallengeStatusChip
                          label={i + 1}
                          status={projectsTrackDetermineChallengeStatus(
                            challengeStatuses,
                            challenge.slug,
                          )}
                        />
                        {i < challenges.length - 1 && (
                          <div
                            className={clsx(
                              'flex-1 border-t border-dashed',
                              themeBorderElementColor,
                            )}
                          />
                        )}
                      </div>
                      <Anchor
                        className={clsx(
                          'outline-brand flex flex-col gap-1.5 rounded-lg p-2',
                          'bg-neutral-200/40 dark:bg-neutral-800/40',
                          i < challenges.length - 1 && 'me-4',
                        )}
                        href={challenge.href}
                        variant="unstyled">
                        <img
                          alt={challenge.title}
                          className={clsx(
                            'h-[100px] w-[160px]',
                            'rounded',
                            'bg-neutral-200 dark:bg-neutral-800',
                          )}
                          src={challenge.imageUrl}
                        />
                        <Text size="body2" weight="medium">
                          {challenge.title}
                        </Text>
                      </Anchor>
                    </div>
                  ))}
                </div>
              </div>
              <Anchor className="mt-3 inline-flex" href={href}>
                <Text
                  className="inline-flex items-center gap-2"
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
                    className="size-4 shrink-0"
                  />
                </Text>
              </Anchor>
            </>
          )}
        </Accordion.Content>
      </Card>
    </Accordion.Item>
  );
}
