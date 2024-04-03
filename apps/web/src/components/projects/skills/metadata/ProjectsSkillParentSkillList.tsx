import clsx from 'clsx';

import { textVariants } from '~/components/ui/Text';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';

type Props = Readonly<{
  parentSkills: ReadonlyArray<{
    className: string;
    key: string;
  }>;
}>;

export default function ProjectsSkillParentSkillList({ parentSkills }: Props) {
  if (parentSkills.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {parentSkills.map((parentSkillItem) => (
        <li
          key={parentSkillItem.key}
          className={clsx(
            'inline-flex items-center rounded px-2 py-0.5',
            parentSkillItem.className,
            textVariants({ size: 'body3', weight: 'bold' }),
          )}>
          {projectsSkillLabel(parentSkillItem.key)}
        </li>
      ))}
    </ul>
  );
}
