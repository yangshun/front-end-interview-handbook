import clsx from 'clsx';
import { RiArrowRightLine, RiStarSmileFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Chip from '~/components/ui/Chip';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsChallengeReputationTag from '../challenges/metadata/ProjectsChallengeReputationTag';
import type { ProjectsChallengeItem } from '../challenges/types';
import ProjectsTrackChallengeChip from '../tracks/ProjectsTrackChallengeChip';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  showMax?: number;
  userProfile: React.ComponentProps<
    typeof ProjectsTrackChallengeChip
  >['userProfile'];
  view?: 'skills' | 'submission';
}>;

export default function ProjectsSkillChallengesList({
  challenges,
  showMax,
  userProfile,
  view = 'skills',
}: Props) {
  const intl = useIntl();

  const finalChallenges = showMax ? challenges.slice(0, showMax) : challenges;
  const hasMoreChallengeThanMax = !!showMax && challenges.length > showMax;

  return (
    <div className={clsx('relative', hasMoreChallengeThanMax && 'mb-16')}>
      <div className={clsx('relative flex flex-col gap-4', 'overflow-hidden')}>
        {finalChallenges.map((challenge, index) => (
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
              {(hasMoreChallengeThanMax ||
                index < finalChallenges.length - 1) && (
                <div
                  className={clsx(
                    'absolute top-1/2 -z-10 h-[90%] w-px translate-y-3 self-center border-l border-dashed',
                    themeBorderElementColor,
                  )}
                />
              )}
            </div>
            <div
              className={clsx(
                'relative isolate',
                'group flex grow items-center gap-4 md:gap-6',
                'pe-6',
              )}>
              <Img
                alt={challenge.info.title}
                className={clsx(
                  'h-full w-20 md:w-[110px]',
                  'object-cover',
                  'rounded-lg',
                )}
                decoding="async"
                loading="lazy"
                src={challenge.metadata.coverImage}
              />
              <div className="flex grow flex-col items-start gap-4">
                <div className="flex flex-col items-start gap-2">
                  <div
                    className={clsx(
                      'flex flex-wrap items-center justify-between gap-2',
                      'w-full',
                    )}>
                    <Text size="body1" weight="medium">
                      {challenge.info.title}
                    </Text>
                    <div className="hidden gap-2 md:flex">
                      <ProjectsChallengeReputationTag
                        points={challenge.metadata.points}
                        variant="flat"
                      />
                      {challenge.metadata.access === 'premium' && (
                        <Chip
                          icon={RiStarSmileFill}
                          isLabelHidden={true}
                          label={intl.formatMessage({
                            defaultMessage: 'Premium',
                            description: 'Premium feature',
                            id: 'LAlNm0',
                          })}
                          size="xs"
                          variant="special"
                        />
                      )}
                    </div>
                  </div>
                  <Text
                    className="line-clamp-1 md:line-clamp-2"
                    color="secondary"
                    size="body3">
                    {challenge.info.description}
                  </Text>
                  <Anchor className="z-[1]" href={challenge.metadata.href}>
                    <Text
                      className="inline-flex items-center gap-2 group-hover:underline"
                      color="inherit"
                      size="body3"
                      weight="medium">
                      {intl.formatMessage({
                        defaultMessage: 'Go to project',
                        description:
                          'Label for "Go to project" button in Skill accordion',
                        id: 'soEVEt',
                      })}
                      <RiArrowRightLine
                        aria-hidden={true}
                        className="size-4 shrink-0"
                      />
                    </Text>
                  </Anchor>
                </div>
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
      {hasMoreChallengeThanMax && (
        <>
          <div
            className={clsx(
              'absolute -bottom-8',
              'ml-3',
              'h-10 w-9 border-b border-l border-dashed',
              themeBorderElementColor,
            )}
          />
          <div className={clsx('absolute -bottom-12', 'ml-12 mt-4')}>
            <Button
              className="pointer-events-none"
              label={intl.formatMessage(
                {
                  defaultMessage: '{count} more',
                  description: 'Label for more challenges count',
                  id: 'VWlSLh',
                },
                {
                  count: challenges.length - showMax,
                },
              )}
              variant="secondary"
            />
          </div>
        </>
      )}
    </div>
  );
}
