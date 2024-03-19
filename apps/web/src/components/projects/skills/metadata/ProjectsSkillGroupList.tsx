import clsx from 'clsx';

import { textVariants } from '~/components/ui/Text';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';

type Props = Readonly<{
  skillGroups: ReadonlyArray<{
    className: string;
    key: string;
  }>;
}>;

export default function ProjectsSkillGroupList({ skillGroups }: Props) {
  if (skillGroups.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {skillGroups.map((skillGroupItem) => (
        <li
          key={skillGroupItem.key}
          className={clsx(
            'inline-flex items-center rounded px-2 py-0.5',
            skillGroupItem.className,
            textVariants({ size: 'body3', weight: 'bold' }),
          )}>
          {projectsSkillLabel(skillGroupItem.key)}
        </li>
      ))}
    </ul>
  );
}
