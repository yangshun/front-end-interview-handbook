import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';

import { ProjectsSkillLabels } from '../data/ProjectsSkillListData';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  isEditable?: boolean;
  onDelete?: () => void;
  skill: ProjectsSkillKey;
  subSkills?: ReadonlyArray<ProjectsSkillKey>;
}>;

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
  subSkill,
  isEditable,
}: {
  isEditable?: boolean;
  subSkill: ProjectsSkillKey;
}) {
  return (
    <span
      className={clsx(
        'flex flex-shrink-0 items-center rounded px-2 py-0.5',
        'bg-neutral-200 dark:bg-neutral-800',
      )}>
      <Text color="inherit" size="body3" weight="medium">
        {ProjectsSkillLabels[subSkill]}
      </Text>
      {isEditable && <DeleteButton />}
    </span>
  );
}

export default function ProjectsSkillRoadmapChips({
  skill,
  subSkills,
  isEditable,
  onDelete,
}: Props) {
  return (
    <span
      className={clsx(
        'flex items-center gap-x-1.5 rounded px-1.5 py-1',
        'bg-neutral-100 dark:bg-neutral-900',
      )}>
      <Text
        className="text-neutral-800 dark:text-neutral-200"
        color="inherit"
        size="body3"
        weight="medium">
        {ProjectsSkillLabels[skill]}
      </Text>
      {(subSkills ?? []).map((subSkill) => (
        <SubSkillChip
          key={subSkill}
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
