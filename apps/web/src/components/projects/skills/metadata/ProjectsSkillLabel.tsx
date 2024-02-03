import { startCase } from 'lodash-es';

import { ProjectsSkillLabels } from '../data/ProjectsSkillListData';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  value: ProjectsSkillKey;
}>;

export default function ProjectsSkillLabel({ value }: Props) {
  return <span>{ProjectsSkillLabels[value] ?? startCase(value)}</span>;
}
