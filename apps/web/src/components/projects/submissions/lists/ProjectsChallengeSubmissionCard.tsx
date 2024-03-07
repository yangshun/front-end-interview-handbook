import clsx from 'clsx';
import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import { FormattedMessage, useIntl } from 'react-intl';

import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import RelativeTimestamp from '~/components/projects/common/RelativeTimestamp';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Anchor from '~/components/ui/Anchor';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import ProjectsChallengeHoverCard from './ProjectsChallengeHoverCard';
import ProjectsChallengeSubmissionCardPinButton from './ProjectsChallengeSubmissionCardPinButton';
import type { ProjectsChallengeSubmissionAugmented } from '../types';
import ProjectsChallengeStatusBadge from '../../challenges/status/ProjectsChallengeStatusBadge';
import ProjectsSkillList from '../../skills/metadata/ProjectsSkillList';
import ProjectsCommentCountTag from '../../stats/ProjectsCommentCountTag';
import ProjectsViewCountTag from '../../stats/ProjectsViewCountTag';
import ProjectsVoteCountTag from '../../stats/ProjectsVoteCountTag';
import ProjectsProfileDisplayNameLink from '../../users/ProjectsProfileDisplayNameLink';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';

type Props = Readonly<{
  challenge?: Readonly<{
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

  return (
    <div
      className={clsx(
        'relative isolate',
        'flex flex-col gap-4',
        'rounded-lg',
        'px-4 py-6',
        themeGlassyBorder,
        themeBackgroundCardAltColor,
      )}>
      {challenge != null && (
        <div className="z-[1] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
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
                  title: challenge?.metadata.title,
                }}
              />
            </Text>
            {!isPinned && !showPinButton && (
              <ProjectsChallengeStatusBadge status={challenge.status} />
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
      <div className="flex flex-col gap-3">
        <Anchor className="z-[1]" href={hrefs.detail} variant="flat">
          <Text className="line-clamp-2" size="body1" weight="bold">
            {title}
          </Text>
        </Anchor>
        <ProjectsSkillList
          label={intl.formatMessage({
            defaultMessage: 'Stack used',
            description: 'Label for tech stack used in project',
            id: 'aiI8c6',
          })}
          limit={3}
          // TODO(projects|skills): display parent skill for roadmap skills.
          skills={[...roadmapSkills, ...techStackSkills]}
        />
      </div>
      <img alt={title} className="h-[190px] w-full rounded-md" src={imgSrc} />
      {!isPinned && author != null && (
        <div className="z-[1] flex items-center gap-4">
          <ProjectsProfileAvatar
            points={projectsProfile?.points}
            size="xl"
            userProfile={author}
          />
          <div className="flex flex-col gap-1">
            <Text className="relative" size="body2" weight="medium">
              <ProjectsProfileDisplayNameLink userProfile={author} />
            </Text>
            <UserProfileInformationRow size="body3" userProfile={author} />
          </div>
        </div>
      )}
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
          <RelativeTimestamp timestamp={submission.createdAt} />
        </Text>
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
