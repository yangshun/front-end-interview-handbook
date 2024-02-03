import clsx from 'clsx';
import { useState } from 'react';
import { RiAddCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsSkillRoadmapGroupHeading from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapGroupHeading';
import ProjectsSkillRoadmapItemDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapItemDetails';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
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
          clip-rule="evenodd"
          d="M6 0.47876L11.5212 6.00001L6 11.5213L0.478751 6.00001L6 0.47876ZM6 1.92126L1.92125 6.00001L6 10.0788L10.0788 6.00001L6 1.92126Z"
          fill="currentColor"
          fill-rule="evenodd"
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
        'border rounded-lg md:px-10 md:py-8 pl-8 pr-2 py-8',
        themeGlassyBorder,
        themeBackgroundColor,
      )}>
      <div className="relative flex flex-col gap-6">
        <div className="flex gap-3 w-full">
          <div className={clsx('relative flex flex-col self-stretch')}>
            {/* TODO(projects|skills): Replace with skills logo */}
            <div className="rounded-md h-6 w-6 bg-white" />
            <div
              className={clsx(
                'w-px border-l h-full border-dashed absolute self-center translate-y-6',
                themeBorderElementColor,
              )}
            />
          </div>
          <ProjectsSkillRoadmapGroupHeading group={group} />
        </div>
        {isExpanded && (
          <div className="flex flex-col gap-2 ml-[6px]">
            {group.items.map((item) => (
              <div key={item.key} className="flex gap-4 w-full">
                <div
                  className={clsx(
                    'relative flex flex-col justify-center self-stretch',
                  )}>
                  <SkillItemDiamond />
                  <div
                    className={clsx(
                      'w-px border-l h-1/2 border-dashed absolute self-center top-0',
                      themeBorderElementColor,
                    )}
                  />
                  <div
                    className={clsx(
                      'w-px border-l h-1/2 border-dashed absolute self-center top-1/2 translate-y-2',
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
        <div className={clsx('flex gap-4 w-full ml-1', themeTextSubtleColor)}>
          <div
            className={clsx(
              'relative flex flex-col justify-center self-stretch',
            )}>
            {isExpanded ? (
              <RiIndeterminateCircleLine className="h-4 w-4" />
            ) : (
              <RiAddCircleLine className="h-4 w-4" />
            )}
            <div
              className={clsx(
                'w-px border-l h-2/3 border-dashed absolute self-center -translate-y-5',
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
