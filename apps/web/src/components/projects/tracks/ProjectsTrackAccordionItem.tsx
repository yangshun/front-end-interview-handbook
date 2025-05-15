'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { RiArrowDownSLine, RiArrowRightLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { ProjectsChallengeHistoricalStatuses } from '../challenges/types';
import { projectsChallengeCountCompletedIncludingHistorical } from '../challenges/utils/ProjectsChallengeUtils';
import ProjectsPremiumBadge from '../purchase/ProjectsPremiumBadge';
import type { ProjectsTrackItem } from './data/ProjectsTracksData';
import ProjectsTrackAccordionHeader from './ProjectsTrackAccordionHeader';
import ProjectsTrackChallengeChip from './ProjectsTrackChallengeChip';
import ProjectsTrackPaywall from './ProjectsTrackPaywall';

type Props = Readonly<{
  challengeStatuses?: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  track: ProjectsTrackItem;
  userProfile: React.ComponentProps<
    typeof ProjectsTrackChallengeChip
  >['userProfile'];
}>;

export default function ProjectsTrackAccordionItem({
  challengeStatuses = {},
  isViewerPremium,
  isViewingOwnProfile,
  track,
  userProfile,
}: Props) {
  const intl = useIntl();

  const { challenges, metadata } = track;
  const { href, slug } = metadata;

  return (
    <AccordionPrimitive.Item value={slug}>
      <Card
        className={clsx(
          'flex flex-col overflow-visible',
          themeBackgroundCardColor,
        )}
        disableBackground={true}
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <AccordionPrimitive.Header asChild={true}>
          <AccordionPrimitive.Trigger className="outline-brand group rounded-lg">
            <div className="flex items-center justify-between gap-2 p-6">
              <ProjectsTrackAccordionHeader
                completedCount={projectsChallengeCountCompletedIncludingHistorical(
                  challengeStatuses ?? {},
                  challenges,
                )}
                isViewerPremium={isViewerPremium}
                isViewingOwnProfile={isViewingOwnProfile}
                track={track}
              />
              <RiArrowDownSLine
                className={clsx(
                  'size-5 transition-transform group-data-[state=open]:rotate-180',
                  themeTextSecondaryColor,
                )}
              />
            </div>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="-mt-4 p-6">
          {track.metadata.premium && !isViewerPremium ? (
            <div>
              <ProjectsTrackPaywall />
            </div>
          ) : (
            <>
              <div className="-mr-6 overflow-hidden">
                <div className="flex overflow-x-auto pb-3 pr-6">
                  {challenges.map((challenge, index) => (
                    <div
                      key={challenge.metadata.slug}
                      className="relative flex shrink-0 flex-col gap-4">
                      <div className="flex items-center">
                        <ProjectsTrackChallengeChip
                          index={index + 1}
                          status={challenge.status}
                          userProfile={userProfile}
                        />
                        {index < challenges.length - 1 && (
                          <div
                            className={clsx(
                              'flex-1 border-t border-dashed',
                              themeBorderElementColor,
                            )}
                          />
                        )}
                      </div>
                      <div
                        className={clsx(
                          'relative',
                          'flex flex-col gap-1.5 rounded-lg p-2',
                          'bg-neutral-200/40 dark:bg-neutral-800/40',
                          'w-[168px]',
                          index < challenges.length - 1 && 'me-4',
                          themeOutlineElement_FocusVisible,
                          themeOutlineElementBrandColor_FocusVisible,
                        )}>
                        <div className="relative">
                          <Img
                            alt={challenge.info.title}
                            className={clsx(
                              'object-cover',
                              'h-[100px] w-full',
                              'rounded',
                              'bg-neutral-200 dark:bg-neutral-800',
                            )}
                            decoding="async"
                            loading="lazy"
                            src={challenge.metadata.coverImage}
                          />
                          {challenge.metadata.access === 'premium' && (
                            <span className="absolute start-1 top-1">
                              <ProjectsPremiumBadge
                                size="sm"
                                unlocked={challenge.userUnlocked}
                              />
                            </span>
                          )}
                        </div>
                        <Text className="truncate" size="body2" weight="medium">
                          {challenge.info.title}
                        </Text>
                        <Anchor
                          aria-label={challenge.info.title}
                          className="absolute inset-0"
                          href={challenge.metadata.href}
                        />
                      </div>
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
        </AccordionPrimitive.Content>
      </Card>
    </AccordionPrimitive.Item>
  );
}
