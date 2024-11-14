import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiAddLine, RiCircleFill } from 'react-icons/ri';

import FilterButton from '~/components/ui/FilterButton/FilterButton';
import Text from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';

import { skillsRoadmapConfig } from '../data/ProjectsSkillRoadmapConfigData';
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
      {skillsRoadmapConfig.map((levelItem) => (
        <div key={levelItem.title} className="flex flex-col gap-4">
          <Text className="block" color="subtitle" size="body2" weight="bold">
            {levelItem.title}
          </Text>
          <div key={levelItem.title} className="flex flex-col">
            {levelItem.items.map((parentSkillItem, index) => (
              <div
                key={parentSkillItem.key}
                className={clsx(
                  'relative flex flex-col gap-2',
                  index < levelItem.items.length - 1 && 'pb-6',
                )}>
                {index < levelItem.items.length - 1 && (
                  <div
                    aria-hidden={true}
                    className={clsx(
                      'absolute left-1 top-1.5 -z-10 h-full -translate-x-[0.5px]',
                      [
                        'border-l border-dashed',
                        'border-neutral-300 dark:border-neutral-700',
                      ],
                    )}
                  />
                )}
                <div className="flex items-center gap-x-3">
                  <RiCircleFill
                    className={clsx('size-2 shrink-0', themeIconColor)}
                  />
                  <Text
                    className="block"
                    color="secondary"
                    size="body3"
                    weight="bold">
                    {parentSkillItem.title}
                  </Text>
                </div>
                <div className="relative ml-5 inline-flex self-start">
                  <div className="flex gap-4">
                    {parentSkillItem.items.map(({ key: skillKey, label }) => {
                      const selected = value.includes(skillKey);

                      return (
                        <FilterButton
                          key={skillKey}
                          icon={selected ? FaCheck : RiAddLine}
                          label={label}
                          selected={selected}
                          onClick={() => {
                            if (selected) {
                              onChange(
                                value.filter((skill) => skill !== skillKey),
                              );
                            } else {
                              onChange([...value, skillKey]);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                  <div
                    aria-hidden={true}
                    className={clsx(
                      'absolute top-1/2 -z-10 w-full -translate-x-[0.5px]',
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
