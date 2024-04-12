import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeDifficultyTag from '~/components/projects/challenges/metadata/ProjectsChallengeDifficultyTag';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardAltColor,
  themeGlassyBorder,
} from '~/components/ui/theme';

import type { ProjectsChallengeItem } from '../types';
import ProjectsPremiumBadge from '../../purchase/ProjectsPremiumBadge';
import { projectsSkillExtractParents } from '../../skills/data/ProjectsSkillUtils';
import ProjectsSkillParentSkillList from '../../skills/metadata/ProjectsSkillParentSkillList';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeCard({ challenge }: Props) {
  const intl = useIntl();
  const { metadata, userUnlocked } = challenge;
  const {
    title,
    difficulty,
    description,
    skills,
    coverImage,
    href,
    access: challengeAccess,
  } = metadata;

  return (
    <div
      className={clsx(
        'flex flex-col sm:flex-row',
        'overflow-clip rounded-lg',
        'relative isolate',
        [themeGlassyBorder, themeBackgroundCardAltColor],
      )}>
      <div className="relative shrink-0">
        <img
          alt={title}
          className={clsx('h-full w-full sm:w-[188px]', 'object-cover')}
          src={coverImage}
        />
        <div className="absolute start-2 top-2 flex items-center gap-1">
          <ProjectsChallengeDifficultyTag
            difficulty={difficulty}
            size="sm"
            variant="badge"
          />
          {challengeAccess === 'premium' && (
            <ProjectsPremiumBadge size="sm" unlocked={userUnlocked} />
          )}
        </div>
      </div>
      <div className={clsx('flex grow flex-col gap-4', 'p-4')}>
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
          <Text className="text-pretty grow" color="secondary" size="body3">
            {description}
          </Text>
        </div>
        <div className="z-[1] flex">
          <ProjectsSkillParentSkillList
            parentSkills={projectsSkillExtractParents(skills)}
          />
        </div>
        <div className="flex items-center gap-4">
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
        </div>
      </div>
      <Anchor aria-label={title} className="absolute inset-0" href={href} />
    </div>
  );
}
