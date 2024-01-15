import clsx from 'clsx';
import { RiArrowRightLine, RiLock2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsChallengeTrackTag from '~/components/projects/challenges/metadata/ProjectsChallengeTrackTag';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeCardBackgroundColor,
} from '~/components/ui/theme';

import ProjectsChallengeStatusBadge from '../status/ProjectsChallengeStatusBadge';
import ProjectsChallengeStatusBadgeCompleted from '../status/ProjectsChallengeStatusBadgeCompleted';
import ProjectsChallengeStatusBadgeInProgress from '../status/ProjectsChallengeStatusBadgeCompletedInProgress';
import type { ProjectsChallengeItem } from '../types';
import ProjectsSkillRow from '../../skills/ProjectsSkillRow';
import ProjectsCompletedUsersTag from '../../stats/ProjectsCompletedUsersTag';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeCard({ challenge }: Props) {
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
        'flex flex-col overflow-clip rounded-lg',
        ['border', themeBorderColor],
        themeCardBackgroundColor,
      )}>
      <div className="relative">
        <img
          alt={title}
          className="aspect-[16/9] object-cover w-full"
          src={imageUrl}
        />
        {status != null && (
          <div className="absolute start-3 bottom-3">
            <ProjectsChallengeStatusBadge status={status} />
          </div>
        )}
        <div className="absolute start-2 top-2 flex items-center gap-1">
          <ProjectsChallengeDifficultyTag difficulty={difficulty} />
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
      <div className="grow flex flex-col gap-4 p-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <ProjectsChallengeTrackTag track={track} />
          <ProjectsChallengeReputationTag points={points} variant="flat" />
        </div>
        <div className="grow flex flex-col gap-2">
          <Text weight="bold">{title}</Text>
          <Text className="grow" color="subtitle" size="body2">
            {description}
          </Text>
        </div>
        <ProjectsSkillRow
          label={intl.formatMessage({
            defaultMessage: 'Skills:',
            description: 'Label for skills list in Project card',
            id: 'beN1QM',
          })}
          skills={skills}
        />
        <div className="flex items-center gap-4">
          <Button
            href={href}
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Go to project',
              description: 'Label for "Go to project" button in Project card',
              id: 'r1Pjn6',
            })}
            variant="primary"
          />
          <ProjectsCompletedUsersTag
            count={completedCount}
            profiles={completedProfiles}
          />
        </div>
      </div>
    </div>
  );
}
