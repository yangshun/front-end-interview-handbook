import clsx from 'clsx';
import { useState } from 'react';
import { RiAddCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsSkillRoadmapGroupHeading from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapGroupHeading';
import ProjectsSkillRoadmapItemDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapItemDetails';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { ProjectsSkillRoadmapGroup } from '../types';

type Props = Readonly<{
  group: ProjectsSkillRoadmapGroup;
}>;

function SkillItemDiamond() {
  return (
    <div className={clsx(themeTextSubtleColor)}>
      <svg
        fill="inherit"
        height="12"
        viewBox="0 0 12 12"
        width="12"
        xmlns="http://www.w3.org/2000/svg">
        <path
          clipRule="evenodd"
          d="M6 0.47876L11.5212 6.00001L6 11.5213L0.478751 6.00001L6 0.47876ZM6 1.92126L1.92125 6.00001L6 10.0788L10.0788 6.00001L6 1.92126Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default function ProjectsSkillRoadmapGroupCard({ group }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={clsx(
        'rounded-lg border px-8 py-8 md:px-10',
        themeGlassyBorder,
        themeBackgroundLayerEmphasized,
      )}>
      <div className="relative flex flex-col gap-6">
        <div className="flex w-full gap-3">
          <div className={clsx('relative flex flex-col self-stretch')}>
            <div
              className={clsx(
                'flex items-center justify-center',
                'size-6 rounded-md bg-white',
              )}>
              <group.icon className="size-4" />
            </div>
            <div
              className={clsx(
                'absolute h-full w-px translate-y-6 self-center border-l border-dashed',
                themeBorderElementColor,
              )}
            />
          </div>
          <ProjectsSkillRoadmapGroupHeading group={group} />
        </div>
        {isExpanded && (
          <div className="ml-[6px] flex flex-col gap-2">
            {group.items.map((item) => (
              <div key={item.key} className="flex w-full gap-4">
                <div
                  className={clsx(
                    'relative flex flex-col justify-center self-stretch',
                  )}>
                  <SkillItemDiamond />
                  <div
                    className={clsx(
                      'absolute top-0 h-1/2 w-px self-center border-l border-dashed',
                      themeBorderElementColor,
                    )}
                  />
                  <div
                    className={clsx(
                      'absolute top-1/2 h-1/2 w-px translate-y-2 self-center border-l border-dashed',
                      themeBorderElementColor,
                    )}
                  />
                </div>
                <ProjectsSkillRoadmapItemDetails skillItem={item} />
              </div>
            ))}
          </div>
        )}
        {/* Expand collapse child skills CTA */}
        <div className={clsx('ml-1 flex w-full gap-4', themeTextSubtleColor)}>
          <div
            className={clsx(
              'relative flex flex-col justify-center self-stretch',
            )}>
            {isExpanded ? (
              <RiIndeterminateCircleLine className="size-4" />
            ) : (
              <RiAddCircleLine className="size-4" />
            )}
            <div
              className={clsx(
                'absolute h-2/3 w-px -translate-y-5 self-center border-l border-dashed',
                themeBorderElementColor,
              )}
            />
          </div>
          <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
            <Text color="secondary" size="body2" weight="medium">
              {isExpanded ? (
                <FormattedMessage
                  defaultMessage="Hide child skills"
                  description="Label to collapse skills card"
                  id="KhmeKO"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="See child skills"
                  description="Label to expand skills card"
                  id="W9OR+u"
                />
              )}
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
}
