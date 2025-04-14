import clsx from 'clsx';
import type {
  ProjectsChallengeInfo,
  ProjectsChallengeMetadata,
} from 'contentlayer/generated';
import { useState } from 'react';
import { RiFileDamageLine } from 'react-icons/ri';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { FormattedMessage, useIntl } from '~/components/intl';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeGlassyBorder,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import ProjectsChallengeHoverCard from './ProjectsChallengeHoverCard';
import ProjectsChallengeSubmissionCardPinButton from './ProjectsChallengeSubmissionCardPinButton';
import type { ProjectsChallengeSubmissionAugmented } from '../types';
import ProjectsStatusBadge from '../../common/status/ProjectsStatusBadge';
import ProjectsSkillSummaryList from '../../skills/metadata/ProjectsSkillSummaryList';
import ProjectsCommentCountTag from '../../stats/ProjectsCommentCountTag';
import ProjectsViewCountTag from '../../stats/ProjectsViewCountTag';
import ProjectsVoteCountTag from '../../stats/ProjectsVoteCountTag';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';
import ProjectsProfilePremiumChip from '../../users/ProjectsProfilePremiumChip';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  challenge?: Readonly<{
    info: ProjectsChallengeInfo;
    metadata: ProjectsChallengeMetadata;
    status: ProjectsChallengeSessionStatus | null;
  }>;
  isPinned?: boolean;
  onUnpin?: () => void;
  showPinButton?: boolean;
  submission: ProjectsChallengeSubmissionAugmented;
}>;

export default function ProjectsChallengeSubmissionCard({
  isPinned = false,
  challenge,
  submission,
  showPinButton = false,
  onUnpin,
}: Props) {
  const intl = useIntl();
  const {
    hrefs,
    title,
    roadmapSkills,
    techStackSkills,
    summary,
    comments,
    views,
    imgSrc,
    projectsProfile,
  } = submission;
  const author = projectsProfile?.userProfile;
  const { votes } = submission._count;
  const [showImageFallback, setShowImageFallback] = useState<boolean>(!imgSrc);

  return (
    <div
      className={clsx(
        'relative isolate',
        'flex flex-col gap-4',
        'rounded-lg',
        'p-4',
        themeGlassyBorder,
        themeBackgroundCardAltColor,
      )}>
      {challenge != null && (
        <div className="flex h-6 shrink-0 items-center justify-between gap-2">
          <div className="z-[1] flex items-center gap-2">
            <Text color="secondary" size="body3">
              <FormattedMessage
                defaultMessage="Challenge: <hover>{title}</hover>"
                description="Link to project submission's original challenge"
                id="WUv05Y"
                values={{
                  hover: (chunks) => (
                    <Hovercard>
                      <HovercardTrigger asChild={true}>
                        <Anchor
                          aria-label={title}
                          href={challenge?.metadata.href}>
                          {chunks}
                        </Anchor>
                      </HovercardTrigger>
                      <HovercardPortal>
                        <HovercardContent>
                          <ProjectsChallengeHoverCard
                            slug={challenge.metadata.slug}
                          />
                        </HovercardContent>
                      </HovercardPortal>
                    </Hovercard>
                  ),
                  title: challenge?.info.title,
                }}
              />
            </Text>
            {!isPinned && !showPinButton && (
              <ProjectsStatusBadge
                entity="challenge"
                status={challenge.status}
                variant="icon"
              />
            )}
          </div>
          {showPinButton && (
            <ProjectsChallengeSubmissionCardPinButton
              isPinned={isPinned}
              onUnpin={onUnpin}
            />
          )}
        </div>
      )}
      <div className="z-[1] flex flex-col gap-3">
        <Anchor className="min-h-12" href={hrefs.detail} variant="flat">
          <Text className="line-clamp-2" size="body1" weight="bold">
            {title}
          </Text>
        </Anchor>
        <ProjectsSkillSummaryList
          label={intl.formatMessage({
            defaultMessage: 'Stack',
            description: 'Label for tech stack used in project',
            id: 'UbCsf6',
          })}
          roadmapSkills={roadmapSkills}
          techStackSkills={techStackSkills}
        />
      </div>
      <div
        className={clsx(
          'h-[190px] shrink-0 overflow-hidden rounded-md',
          'bg-neutral-100 dark:bg-neutral-900/70',
        )}>
        {showImageFallback ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <RiFileDamageLine
              className={clsx('size-8', themeTextSubtleColor)}
            />
          </div>
        ) : (
          <Img
            alt={title}
            className={clsx('size-full object-cover')}
            decoding="async"
            loading="lazy"
            src={imgSrc}
            onError={() => {
              setShowImageFallback(true);
            }}
          />
        )}
      </div>
      {!isPinned && author != null && (
        <div className="z-[1] flex items-center gap-4">
          <ProjectsProfileAvatar
            points={projectsProfile?.points}
            size="xl"
            userProfile={author}
          />
          <div className="flex flex-col gap-1">
            <Text
              className="relative flex flex-wrap items-center gap-2"
              size="body2"
              weight="medium">
              <ProjectsProfileDisplayNameLink
                color="subtitle"
                userProfile={author}
              />
              {projectsProfile?.premium && <ProjectsProfilePremiumChip />}
            </Text>
            <UserProfileInformationRow size="body3" userProfile={author} />
          </div>
        </div>
      )}
      <div className="flex h-full flex-col justify-between gap-4">
        <Text className="line-clamp-3" color="subtitle" size="body3">
          {summary}
        </Text>
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <ProjectsVoteCountTag count={votes} />
            <ProjectsViewCountTag count={views} />
            <ProjectsCommentCountTag count={comments ?? 0} />
          </div>
          <Text className="z-[1]" color="secondary" size="body3">
            <RelativeTimestamp
              capitalize={true}
              timestamp={submission.createdAt}
            />
          </Text>
        </div>
      </div>
      <Anchor
        aria-label={title}
        className="absolute inset-0"
        href={hrefs.detail}
        variant="flat"
      />
    </div>
  );
}
