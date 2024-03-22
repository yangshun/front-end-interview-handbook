import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsChallengeTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import type { ProjectsChallengeItem } from '../types';
import ProjectsPremiumBadge from '../../common/ProjectsPremiumBadge';
import ProjectsStatusBadge from '../../common/status/ProjectsStatusBadge';
import projectsSkillExtractGroups from '../../skills/metadata/projectsSkillExtractGroups';
import ProjectsSkillGroupList from '../../skills/metadata/ProjectsSkillGroupList';
import ProjectsCompletedUsersTag from '../../stats/ProjectsCompletedUsersTag';

type ChallengeCardType = 'hover' | 'normal';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  isViewerPremium: boolean;
  type?: ChallengeCardType;
}>;

export default function ProjectsChallengeCard({
  challenge,
  isViewerPremium,
  type = 'normal',
}: Props) {
  const intl = useIntl();
  const {
    completedProfiles,
    completedCount,
    metadata,
    status,
    track,
    userUnlocked,
  } = challenge;
  const {
    title,
    difficulty,
    description,
    skills,
    imageUrl,
    points,
    href,
    access: challengeAccess,
  } = metadata;

  return (
    <div
      className={clsx(
        'flex flex-col',
        'rounded-lg',
        'relative isolate',
        type === 'normal' && [
          themeGlassyBorder,
          themeBackgroundCardAltColor,
          'transition-all',
          'hover:-translate-y-1',
        ],
      )}>
      <div className="relative">
        <img
          alt={title}
          className={clsx(
            'aspect-[16/9] w-full object-cover',
            type === 'hover' ? 'rounded-md' : 'rounded-t-lg',
          )}
          src={imageUrl}
        />
        {status != null && (
          <div className="absolute bottom-3 start-3 z-[1]">
            <ProjectsStatusBadge entity="challenge" status={status} />
          </div>
        )}
        <div className="absolute start-3 top-3 flex items-center gap-1">
          <ProjectsChallengeDifficultyTag
            difficulty={difficulty}
            variant="badge"
          />
          {challengeAccess === 'premium' && (
            <ProjectsPremiumBadge unlocked={userUnlocked} />
          )}
        </div>
      </div>
      <div
        className={clsx(
          'flex grow flex-col gap-4',
          type === 'normal' ? 'p-4' : 'pt-4',
        )}>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {isViewerPremium && <ProjectsChallengeTrackTag track={track} />}
          <ProjectsChallengeReputationTag points={points} variant="flat" />
        </div>
        <div className="flex grow flex-col gap-2">
          <Anchor
            className={textVariants({
              className: 'z-[1]',
              size: 'body1',
              weight: 'bold',
            })}
            href={href}
            variant="flat">
            {title}
          </Anchor>
          <Text className="grow" color="secondary" size="body2">
            {description}
          </Text>
        </div>
        <div className="z-[1] flex">
          <ProjectsSkillGroupList
            skillGroups={projectsSkillExtractGroups(skills)}
          />
        </div>
        <div className="flex items-center gap-4">
          {type === 'normal' && (
            <Button
              className="z-[1]"
              href={href}
              icon={RiArrowRightLine}
              label={intl.formatMessage({
                defaultMessage: 'Go to project',
                description: 'Label for "Go to project" button in Project card',
                id: 'r1Pjn6',
              })}
              variant="primary"
            />
          )}
          <ProjectsCompletedUsersTag
            avatarBorderClassName="border-white dark:border-neutral-800/70"
            count={completedCount}
            profiles={completedProfiles}
          />
        </div>
      </div>
      <Anchor aria-label={title} className="absolute inset-0" href={href} />
    </div>
  );
}
