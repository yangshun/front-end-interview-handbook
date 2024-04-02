import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

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
import ProjectsChallengeProgressTag from '../../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsProfileAvatarWithStatus from '../../users/ProjectsProfileAvatarWithStatus';

type Props = Readonly<{
  isViewingOwnProfile?: boolean;
  skillSummary: ProjectsSkillSummaryItem;
  userProfile: React.ComponentProps<
    typeof ProjectsProfileAvatarWithStatus
  >['userProfile'];
}>;

export default function ProjectsSkillRoadmapItemRow({
  isViewingOwnProfile,
  skillSummary,
  userProfile,
}: Props) {
  const intl = useIntl();

  const href = `/projects/skills/${skillSummary.key}`;
  const label = projectsSkillLabel(skillSummary.key);

  return (
    <div
      className={clsx(
        'relative isolate',
        'group flex w-full items-center gap-2 md:gap-4',
        'rounded-lg px-4 py-3',
        'transition-colors',
        ['border', themeBorderElementColor],
        isViewingOwnProfile && [
          themeBorderBrandColor_Hover,
          themeOutlineElement_FocusVisible,
          themeOutlineElementBrandColor_FocusVisible,
        ],
      )}>
      <div className="flex w-full flex-col gap-1 md:flex-row md:items-center md:gap-4">
        <div className="flex-1">
          {isViewingOwnProfile ? (
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
          ) : (
            <Text size="body2" weight="medium">
              {label}
            </Text>
          )}
        </div>
        <div className={clsx('flex gap-4', 'relative z-[1]')}>
          <ProjectsChallengeReputationTag
            points={skillSummary.points}
            tooltip={intl.formatMessage({
              defaultMessage:
                'Reputation that can be gained from completing all challenges in the recommended skill plan of this skill',
              description: 'Tooltip for reputation label',
              id: 'IIctLn',
            })}
          />
          <ProjectsChallengeProgressTag
            completed={skillSummary.completedChallenges}
            gapClass="gap-4"
            showProgress={isViewingOwnProfile}
            tooltip={intl.formatMessage({
              defaultMessage: 'Number of challenges completed in skill plan',
              description: 'Tooltip for skill plan challenges label',
              id: 'SlcOi4',
            })}
            total={skillSummary.totalChallenges}
          />
        </div>
      </div>
      {!isViewingOwnProfile && (
        <div
          className={clsx(
            'z-[1] flex transition-colors',
            userProfile == null && 'opacity-0',
          )}>
          <ProjectsProfileAvatarWithStatus
            status={
              skillSummary.completedChallenges > 0 &&
              skillSummary.completedChallenges === skillSummary.totalChallenges
                ? 'COMPLETED'
                : skillSummary.completedChallenges > 0 ||
                    skillSummary.inProgressChallenges > 0
                  ? 'IN_PROGRESS'
                  : undefined
            }
            userProfile={userProfile}
          />
        </div>
      )}
      {isViewingOwnProfile && (
        <>
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
        </>
      )}
    </div>
  );
}
