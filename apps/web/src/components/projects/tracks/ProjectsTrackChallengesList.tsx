import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Img from '~/components/ui/Img';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBorderColor,
  themeBorderElementColor,
  themeGlassyBorder,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextFaintColor,
} from '~/components/ui/theme';

import ProjectsChallengeDifficultyTag from '../challenges/metadata/ProjectsChallengeDifficultyTag';
import type { ProjectsChallengeItem } from '../challenges/types';
import ProjectsPremiumBadge from '../purchase/ProjectsPremiumBadge';
import ProjectsTrackChallengeChip from './ProjectsTrackChallengeChip';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  showEndProgressLine?: boolean;
  userProfile: React.ComponentProps<
    typeof ProjectsTrackChallengeChip
  >['userProfile'];
  view?: 'submission' | 'tracks';
}>;

export default function ProjectsTrackChallengesList({
  challenges,
  showEndProgressLine = false,
  userProfile,
  view = 'tracks',
}: Props) {
  const isSubmissionView = view === 'submission';

  return (
    <div className={clsx('relative flex flex-col gap-4', 'overflow-hidden')}>
      {challenges.map((challenge, index) => (
        <div key={challenge.metadata.slug} className="flex w-full gap-4">
          <div
            className={clsx(
              'relative flex flex-col justify-center self-stretch',
            )}>
            <ProjectsTrackChallengeChip
              challenge={challenge}
              index={index + 1}
              status={challenge.status}
              userProfile={userProfile}
              view={view}
            />
            {(showEndProgressLine || index < challenges.length - 1) && (
              <div
                className={clsx(
                  'absolute top-1/2 -z-10 h-full w-px translate-y-3 self-center border-l border-dashed',
                  themeBorderElementColor,
                )}
              />
            )}
          </div>
          <div
            className={clsx(
              'relative isolate',
              'group flex grow items-center gap-6',
              'rounded-lg',
              themeBackgroundCardColor,
              [
                'border',
                isSubmissionView ? themeGlassyBorder : themeBorderColor,
              ],
              'pe-6',
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            )}>
            <Img
              alt={challenge.info.title}
              className={clsx(
                'h-full w-[104px] md:w-[130px]',
                'object-cover',
                'rounded-s-lg',
              )}
              decoding="async"
              loading="lazy"
              src={challenge.metadata.coverImage}
            />
            <div className="flex grow flex-col items-start gap-4 py-4">
              <div className="flex flex-col items-start gap-2">
                <div className="flex gap-2.5">
                  <Anchor
                    className={textVariants({
                      className: 'z-[1]',
                      size: 'body1',
                      weight: 'medium',
                    })}
                    href={challenge.metadata.href}
                    variant="flat">
                    <Text size="body1" weight="medium">
                      {challenge.info.title}
                    </Text>
                  </Anchor>
                  {challenge.metadata.access === 'premium' &&
                    !isSubmissionView && (
                      <span>
                        <ProjectsPremiumBadge
                          size="sm"
                          unlocked={challenge.userUnlocked}
                        />
                      </span>
                    )}
                </div>
                <Text
                  className="hidden lg:block"
                  color="secondary"
                  size="body3">
                  {challenge.info.description}
                </Text>
              </div>
              <div className="z-[1]">
                <ProjectsChallengeDifficultyTag
                  difficulty={challenge.metadata.difficulty}
                  variant="inline"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <RiArrowRightLine
                aria-hidden="true"
                className={clsx(
                  'size-6 shrink-0',
                  themeTextFaintColor,
                  themeTextBrandColor_GroupHover,
                )}
              />
            </div>
            <Anchor
              aria-label={challenge.info.title}
              className="absolute inset-0"
              href={challenge.metadata.href}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
