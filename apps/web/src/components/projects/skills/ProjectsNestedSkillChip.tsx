import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';

import type { ProjectSkillDifficulty } from './types';

type Skill = { difficulty: ProjectSkillDifficulty; key: string; label: string };

type Props = Readonly<{
  isEditable?: boolean;
  skill: Skill;
  subSkills: Array<Skill>;
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
};

function DeleteButton({ className }: { className?: string }) {
  return (
    <button className={className} type="button">
      <RiCloseLine className="h-4 w-4" />
    </button>
  );
}

function SubSkillChip({
  subSkill: { label, difficulty },
  isEditable,
}: {
  isEditable?: boolean;
  subSkill: Skill;
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

export default function ProjectsNestedSkillChip({
  skill: { label },
  subSkills,
  isEditable,
}: Props) {
  return (
    <span className="flex items-center gap-x-1.5 rounded bg-neutral-100 px-1.5 py-0.5 dark:bg-neutral-900">
      <Text
        className="text-neutral-800 dark:text-neutral-200"
        color="inherit"
        size="body3"
        weight="medium">
        {label}
      </Text>
      {subSkills.map((subSkill) => (
        <SubSkillChip
          key={subSkill.key}
          isEditable={isEditable}
          subSkill={subSkill}
        />
      ))}
      {isEditable && (
        <DeleteButton className="text-neutral-400 dark:text-neutral-500" />
      )}
    </span>
  );
}
