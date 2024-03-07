import clsx from 'clsx';
import { RiArrowRightLine, RiLock2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsChallengeTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import ProjectsChallengeStatusBadge from '../status/ProjectsChallengeStatusBadge';
import type { ProjectsChallengeItem } from '../types';
import ProjectsSkillList from '../../skills/metadata/ProjectsSkillList';
import ProjectsCompletedUsersTag from '../../stats/ProjectsCompletedUsersTag';

type ChallengeCardType = 'hover' | 'normal';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  type?: ChallengeCardType;
}>;

export default function ProjectsChallengeCard({
  challenge,
  type = 'normal',
}: Props) {
  const intl = useIntl();
  const { completedProfiles, completedCount, metadata, status, track } =
    challenge;
  const {
    title,
    difficulty,
    description,
    skills,
    imageUrl,
    points,
    href,
    access,
  } = metadata;

  return (
    <div
      className={clsx(
        'flex flex-col',
        'rounded-lg',
        'relative isolate',
        type === 'normal' && [themeGlassyBorder, themeBackgroundCardAltColor],
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
          <div className="absolute bottom-3 start-3">
            <ProjectsChallengeStatusBadge status={status} />
          </div>
        )}
        <div className="absolute start-3 top-3 flex items-center gap-1">
          <ProjectsChallengeDifficultyTag
            difficulty={difficulty}
            variant="badge"
          />
          {access === 'premium' && (
            <Badge
              icon={RiLock2Line}
              label={intl.formatMessage({
                defaultMessage: 'Premium',
                description: 'Label for premium project tag',
                id: 'szBcoh',
              })}
              variant="special"
            />
          )}
        </div>
      </div>
      <div
        className={clsx(
          'flex grow flex-col gap-4 pt-4',
          type === 'normal' && 'p-4',
        )}>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <ProjectsChallengeTrackTag track={track} />
          <ProjectsChallengeReputationTag points={points} variant="flat" />
        </div>
        <div className="flex grow flex-col gap-2">
          <Text size="body1" weight="bold">
            {title}
          </Text>
          <Text className="grow" color="subtitle" size="body2">
            {description}
          </Text>
        </div>
        <ProjectsSkillList
          label={intl.formatMessage({
            defaultMessage: 'Skills',
            description: 'Label for skills list in Project card',
            id: 'Lr/Ez4',
          })}
          limit={3}
          skills={skills}
        />
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
            count={completedCount}
            profiles={completedProfiles}
          />
        </div>
      </div>
      <Anchor aria-label={title} className="absolute inset-0" href={href} />
    </div>
  );
}
