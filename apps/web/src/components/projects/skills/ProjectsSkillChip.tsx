import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';

import type { ProjectSkillDifficulty, ProjectsSkill } from './types';

type Props = Readonly<{
  isEditable?: boolean;
  onDelete?: () => void;
  skill: ProjectsSkill;
  subSkills?: Array<ProjectsSkill>;
}>;

const difficultyClasses: Record<
  ProjectSkillDifficulty,
  {
    bg: string;
    closeButton: string;
    text: string;
  }
> = {
  easy: {
    bg: 'bg-success',
    closeButton: 'text-success-darker',
    text: 'text-success-darker',
  },
  hard: {
    bg: 'bg-danger',
    closeButton: 'text-danger-darker',
    text: 'text-danger-darker',
  },
  medium: {
    bg: 'bg-warning',
    closeButton: 'text-warning-darker',
    text: 'text-warning-darker',
  },
  unknown: {
    bg: 'bg-neutral-200 dark:bg-neutral-800',
    closeButton: 'text-neutral-400',
    text: 'text-neutral-950 dark:text-white',
  },
};

function DeleteButton({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button className={className} type="button" onClick={onClick}>
      <RiCloseLine className="h-4 w-4" />
    </button>
  );
}

function SubSkillChip({
  subSkill: { label, difficulty = 'unknown' },
  isEditable,
}: {
  isEditable?: boolean;
  subSkill: ProjectsSkill;
}) {
  return (
    <span
      className={clsx(
        'flex flex-shrink-0 items-center rounded px-2 py-0.5',
        difficultyClasses[difficulty].bg,
      )}>
      <Text
        className={difficultyClasses[difficulty].text}
        color="inherit"
        size="body3"
        weight="medium">
        {label}
      </Text>
      {isEditable && (
        <DeleteButton className={difficultyClasses[difficulty].closeButton} />
      )}
    </span>
  );
}

export default function ProjectsSkillChip({
  skill: { label, difficulty = 'unknown' },
  subSkills,
  isEditable,
  onDelete,
}: Props) {
  return (
    <span
      className={clsx(
        'flex items-center gap-x-1.5 rounded px-1.5 py-0.5',
        subSkills !== undefined && 'bg-neutral-100 dark:bg-neutral-900',
        subSkills === undefined && difficultyClasses[difficulty].bg,
      )}>
      <Text
        // ClassName="text-neutral-800 dark:text-neutral-200"
        className={
          subSkills !== undefined
            ? 'text-neutral-800 dark:text-neutral-200'
            : difficultyClasses[difficulty].text
        }
        color="inherit"
        size="body3"
        weight="medium">
        {label}
      </Text>
      {(subSkills ?? []).map((subSkill) => (
        <SubSkillChip
          key={subSkill.key}
          isEditable={isEditable}
          subSkill={subSkill}
        />
      ))}
      {isEditable && (
        <DeleteButton
          className="text-neutral-400 dark:text-neutral-500"
          onClick={onDelete}
        />
      )}
    </span>
  );
}
