import clsx from 'clsx';
import { useState } from 'react';
import { RiAddCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsSkillFamilyHeading from '~/components/projects/skills/ProjectsSkillFamilyHeading';
import ProjectsSkillItemCard from '~/components/projects/skills/ProjectsSkillItemCard';
import type { ProjectsSkillFamily } from '~/components/projects/types';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextSubtleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  skill: ProjectsSkillFamily;
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

export default function ProjectsSkillFamilyCard({ skill }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={clsx(
        'border rounded-lg md:px-10 md:py-8 pl-8 pr-2 py-8',
        themeGlassyBorder,
        themeBackgroundColor,
      )}>
      <div className="relative flex flex-col gap-6">
        {/* Parent Skill Heading*/}
        <div className="flex gap-3 w-full">
          <div className={clsx('relative flex flex-col self-stretch')}>
            {/* TODO(projects): Replace with skills logo */}
            <div className="rounded-md h-6 w-6 bg-white" />
            <div
              className={clsx(
                'w-px border-l h-full border-dashed absolute self-center translate-y-6',
                themeBorderElementColor,
              )}
            />
          </div>
          <ProjectsSkillFamilyHeading skill={skill} />
        </div>

        {/* Child Skills list */}
        {isExpanded && (
          <div className="flex flex-col gap-2 ml-[6px]">
            {skill.childSkills.map((item) => (
              <div key={item.title} className="flex gap-4 w-full">
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
                <ProjectsSkillItemCard skillItem={item} />
              </div>
            ))}
          </div>
        )}

        {/* Expand collapse child skills CTA*/}
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
                  defaultMessage="See lesser child skills"
                  description="Label for see lesser child skills"
                  id="f+oxmk"
                />
              ) : (
                <FormattedMessage
                  defaultMessage="See more child skills"
                  description="Label for see more child skills"
                  id="Ff2kvb"
                />
              )}
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
}
