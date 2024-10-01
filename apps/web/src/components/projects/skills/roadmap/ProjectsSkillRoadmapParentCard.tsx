'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiAddCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import ProjectsSkillRoadmapItemRow from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapItemRow';
import ProjectsSkillRoadmapParentHeading from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapParentHeading';
import Button from '~/components/ui/Button';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeBorderSecondaryColor,
  themeGlassyBorder,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { ProjectsSkillIcons } from '../data/ProjectsSkillIcons';
import type { ProjectsSkillRoadmapSectionParent } from '../types';

type Props = Readonly<{
  group: ProjectsSkillRoadmapSectionParent;
  isViewerPremium: boolean;
  isViewingOwnProfile?: boolean;
  userProfile: React.ComponentProps<
    typeof ProjectsSkillRoadmapItemRow
  >['userProfile'];
}>;

function SkillItemDiamond() {
  return (
    <div className={clsx(themeTextSubtleColor, themeBackgroundLayerEmphasized)}>
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

export default function ProjectsSkillRoadmapParentCard({
  group,
  isViewerPremium,
  isViewingOwnProfile,
  userProfile,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(
    group.totalChallenges === 0 ||
      group.completedChallenges < group.totalChallenges,
  );
  const intl = useIntl();

  const buttonLabel = isExpanded
    ? intl.formatMessage({
        defaultMessage: 'Hide child skills',
        description: 'Label to collapse skills card',
        id: 'KhmeKO',
      })
    : intl.formatMessage(
        {
          defaultMessage: 'See child skills ({count})',
          description: 'Label to show skills card',
          id: 'lJF2aI',
        },
        {
          count: group.items.length,
        },
      );

  const Icon = ProjectsSkillIcons[group.key];

  return (
    <div
      className={clsx(
        'isolate',
        'px-8 py-8 md:px-10',
        'rounded-lg',
        ['border', themeGlassyBorder],
        themeBackgroundLayerEmphasized,
      )}>
      <div className="relative flex flex-col gap-6">
        <div
          className={clsx('absolute left-3 h-full w-px -translate-x-1/2', [
            'border-l border-dashed',
            themeBorderSecondaryColor,
          ])}
        />
        <div className="flex w-full gap-4">
          <div className={clsx('relative flex flex-col self-stretch')}>
            <div
              className={clsx(
                'flex items-center justify-center',
                'size-8 rounded-md',
                themeBackgroundLayerEmphasized,
                ['border', themeBorderElementColor],
                '-translate-x-1 -translate-y-1',
              )}>
              <Icon className="size-5" />
            </div>
          </div>
          <ProjectsSkillRoadmapParentHeading
            group={group}
            isViewerPremium={isViewerPremium}
          />
        </div>
        {isExpanded && (
          <div className="ml-[6px] flex flex-col gap-2">
            {group.items.map((skillSummary) => (
              <div key={skillSummary.key} className={clsx('flex w-full gap-6')}>
                <div
                  className={clsx(
                    'relative flex flex-col justify-center self-stretch',
                  )}>
                  <SkillItemDiamond />
                </div>
                <ProjectsSkillRoadmapItemRow
                  isViewerPremium={isViewerPremium}
                  isViewingOwnProfile={isViewingOwnProfile}
                  premium={group.premium}
                  skillSummary={skillSummary}
                  userProfile={userProfile}
                />
              </div>
            ))}
          </div>
        )}
        {/* Expand collapse child skills CTA */}
        <div
          className={clsx(
            'flex items-center gap-1',
            'z-[1] -ml-0.5 w-full',
            themeTextSubtleColor,
            themeBackgroundLayerEmphasized,
          )}>
          <Button
            icon={isExpanded ? RiIndeterminateCircleLine : RiAddCircleLine}
            iconClassName={themeTextSubtleColor}
            isLabelHidden={true}
            label={buttonLabel}
            size="xs"
            variant="tertiary"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Button
            label={buttonLabel}
            variant="tertiary"
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
    </div>
  );
}
