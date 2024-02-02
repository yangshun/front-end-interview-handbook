import { Fragment } from 'react';

import ProjectsSkillEmblem from './ProjectsSkillEmblem';
import type { ProjectSkillTree } from './types';

type Props = Readonly<{
  disabled?: boolean;
  tree: ProjectSkillTree;
}>;

export default function ProjectsSkillRoadmap({ tree, disabled }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {tree.map((group, i) => (
        <Fragment key={group.key}>
          {i > 0 && (
            <div className="border-brand/60 -mb-2 ml-[59px] h-[36px] w-px border-l-2 border-dashed" />
          )}
          <div className="mb-10 flex items-center gap-2">
            <ProjectsSkillEmblem disabled={disabled} skill={group} />
            {group.items.map((item) => (
              <Fragment key={item.key}>
                <div className="border-brand/60 -mr-2 h-px w-[96px] border-b-2 border-dashed" />
                <ProjectsSkillEmblem disabled={disabled} skill={item} />
              </Fragment>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
