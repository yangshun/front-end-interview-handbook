import clsx from 'clsx';
import { RiArrowRightLine, RiRocketLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor_Hover,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';
import type { ProjectsSkillSummaryItem } from '../types';
import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';
import ProjectsProfileAvatarWithStatus from '../../users/ProjectsProfileAvatarWithStatus';

type Props = Readonly<{
  skillSummary: ProjectsSkillSummaryItem;
}>;

export default function ProjectsSkillRoadmapItemSummary({
  skillSummary,
}: Props) {
  const href = `/projects/skills/${skillSummary.key}`;
  const label = projectsSkillLabel(skillSummary.key);
  // TODO(projects): Allow external viewer.
  const { profile } = useProfileWithProjectsProfile();

  return (
    <div
      className={clsx(
        'relative isolate',
        'group flex w-full items-center gap-2 md:gap-4',
        'rounded-lg px-4 py-3',
        'transition-colors',
        ['border', themeBorderElementColor, themeBorderBrandColor_Hover],
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
      )}>
      <div className="flex w-full flex-col items-center gap-2 md:flex-row md:gap-4">
        <div className="flex-1">
          <Anchor
            className="relative z-[1]"
            href={href}
            scroll={false}
            scrollToTop={false}
            variant="flat">
            <Text size="body2" weight="medium">
              {label}
            </Text>
          </Anchor>
        </div>
        <div className="flex gap-4">
          <ProjectsChallengeReputationTag
            className="gap-2"
            points={skillSummary.points}
            variant="flat"
          />
          <div
            className={clsx('flex items-center gap-2', themeTextSubtleColor)}>
            <RiRocketLine className="size-4" />
            <Text color="inherit" size="body2">
              <FormattedMessage
                defaultMessage="<bold>{completedCount}</bold>/{totalCount} challenges"
                description="Rep count label in Projects"
                id="26Xmcd"
                values={{
                  bold: (chunks) => (
                    <Text color="secondary" size="body2" weight="medium">
                      {chunks}
                    </Text>
                  ),
                  completedCount: skillSummary.completedChallenges,
                  totalCount: skillSummary.totalChallenges,
                }}
              />
            </Text>
          </div>
        </div>
        <div
          className={clsx('transition-colors', profile == null && 'opacity-0')}>
          <ProjectsProfileAvatarWithStatus
            status={
              skillSummary.completedChallenges > 0 &&
              skillSummary.completedChallenges === skillSummary.totalChallenges
                ? 'COMPLETED'
                : skillSummary.inProgressChallenges > 0
                  ? 'IN_PROGRESS'
                  : undefined
            }
            userProfile={profile}
          />
        </div>
      </div>
      <RiArrowRightLine
        aria-hidden={true}
        className={clsx(
          'size-5 shrink-0',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
      <Anchor
        aria-label={label}
        className="absolute inset-0"
        href={href}
        scroll={false}
        scrollToTop={false}
      />
    </div>
  );
}
