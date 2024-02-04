import clsx from 'clsx';
import { RiAddLine, RiCircleFill } from 'react-icons/ri';

import FilterButton from '~/components/common/FilterButton';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';

import { skillsRoadmap } from '../data/ProjectsSkillRoadmapData';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  onChange: (newValue: ReadonlyArray<ProjectsSkillKey>) => void;
  value: ReadonlyArray<ProjectsSkillKey>;
}>;

export default function ProjectsSkillRoadmapSelection({
  onChange,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-10">
      {skillsRoadmap.map((levelItem) => (
        <div key={levelItem.title} className="flex flex-col gap-4">
          <Text display="block" size="body2" weight="bold">
            {levelItem.title}
          </Text>
          <div key={levelItem.title} className="flex flex-col">
            {levelItem.items.map((groupItem, index) => (
              <div
                key={groupItem.key}
                className={clsx(
                  'relative flex flex-col gap-2',
                  index < levelItem.items.length - 1 && 'pb-6',
                )}>
                {index < levelItem.items.length - 1 && (
                  <div
                    aria-hidden={true}
                    className={clsx(
                      'absolute h-full top-1.5 left-1 -z-10 -translate-x-[0.5px]',
                      [
                        'border-l border-dashed',
                        'border-neutral-300 dark:border-neutral-700',
                      ],
                    )}
                  />
                )}
                <div className="flex items-center gap-x-3">
                  <RiCircleFill
                    className={clsx('h-2 w-2 shrink-0', themeIconColor)}
                  />
                  <Text
                    color="secondary"
                    display="block"
                    size="body3"
                    weight="bold">
                    {groupItem.key}
                  </Text>
                </div>
                <div className="inline-flex relative ml-5 self-start">
                  <div className="flex gap-4">
                    {groupItem.items.map((item) => (
                      <FilterButton
                        key={item.key}
                        icon={RiAddLine}
                        label={item.key}
                        purpose="button"
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden={true}
                    className={clsx(
                      'absolute w-full top-1/2 -z-10 -translate-x-[0.5px]',
                      [
                        'border-t border-dashed',
                        'border-neutral-300 dark:border-neutral-700',
                      ],
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
