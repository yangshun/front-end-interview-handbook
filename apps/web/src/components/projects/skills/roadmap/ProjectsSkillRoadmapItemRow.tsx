import clsx from 'clsx';
import { RiArrowRightLine, RiLockLine, RiLockUnlockLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import ProjectsChallengeFractionalCompletedTag from '~/components/projects/challenges/metadata/ProjectsChallengeFractionalCompletedTag';
import ProjectsChallengeProgressbar from '~/components/projects/challenges/metadata/ProjectsChallengeProgressbar';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsProfileAvatarWithStatus from '~/components/projects/users/ProjectsProfileAvatarWithStatus';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor_Hover,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { ProjectsSkillSummaryItem } from '../types';

type Props = Readonly<{
  isViewerPremium: boolean;
  isViewingOwnProfile?: boolean;
  premium: boolean;
  skillSummary: ProjectsSkillSummaryItem;
  userProfile: React.ComponentProps<
    typeof ProjectsProfileAvatarWithStatus
  >['userProfile'];
}>;

export default function ProjectsSkillRoadmapItemRow({
  isViewerPremium,
  isViewingOwnProfile,
  premium,
  skillSummary,
  userProfile,
}: Props) {
  const intl = useIntl();

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
        <div className="flex flex-1 items-center gap-2">
          {premium &&
            (isViewerPremium ? (
              <RiLockUnlockLine
                aria-label={intl.formatMessage({
                  defaultMessage: 'Premium challenge that is unlocked',
                  description: 'Label for projects premium challenge',
                  id: '0izE97',
                })}
                className={clsx('size-4 shrink-0', themeTextBrandColor)}
              />
            ) : (
              <RiLockLine
                aria-hidden={true}
                aria-label={intl.formatMessage({
                  defaultMessage: 'Premium challenge that is locked',
                  description: 'Label for projects premium challenge',
                  id: 'tGFT2g',
                })}
                className={clsx('size-4 shrink-0', themeTextBrandColor)}
              />
            ))}
          {isViewingOwnProfile ? (
            <Anchor
              className="relative z-[1]"
              href={skillSummary.href}
              scroll={false}
              variant="flat">
              <Text size="body2" weight="medium">
                {skillSummary.label}
              </Text>
            </Anchor>
          ) : (
            <Text size="body2" weight="medium">
              {skillSummary.label}
            </Text>
          )}
        </div>
        <div
          className={clsx(
            'flex flex-wrap items-center gap-4',
            'relative z-[1]',
          )}>
          <ProjectsChallengeReputationTag
            points={skillSummary.points}
            tooltip={intl.formatMessage({
              defaultMessage:
                'Reputation that can be gained from completing all challenges in the recommended skill plan of this skill',
              description: 'Tooltip for reputation label',
              id: 'IIctLn',
            })}
          />
          <ProjectsChallengeFractionalCompletedTag
            completed={skillSummary.completedChallenges}
            tooltip={intl.formatMessage({
              defaultMessage: 'Number of challenges completed in skill plan',
              description: 'Tooltip for skill plan challenges label',
              id: 'SlcOi4',
            })}
            total={skillSummary.totalChallenges}
          />
          {isViewingOwnProfile && (
            <div className="w-full md:w-auto">
              <ProjectsChallengeProgressbar
                completed={skillSummary.completedChallenges}
                total={skillSummary.totalChallenges}
              />
            </div>
          )}
        </div>
      </div>
      {!isViewingOwnProfile && (
        <div
          className={clsx(
            'z-[1] flex transition-colors',
            userProfile == null && 'opacity-0',
          )}>
          <ProjectsProfileAvatarWithStatus
            size="xs"
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
            aria-label={skillSummary.label}
            className="absolute inset-0"
            href={skillSummary.href}
            scroll={false}
          />
        </>
      )}
    </div>
  );
}
