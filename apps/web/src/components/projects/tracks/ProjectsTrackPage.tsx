'use client';

import clsx from 'clsx';
import { RiArrowLeftLine, RiArrowRightLine, RiLock2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsChallengeCountTag from '~/components/projects/stats/ProjectsChallengeCountTag';
import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsTrackChallengeStatusChip from './ProjectsTrackChallengeStatusChip';
import ProjectsChallengeStatusBadgeCompleted from '../challenges/status/ProjectsChallengeStatusBadgeCompleted';

export type Props = Readonly<{
  track: ProjectsTrackItem;
}>;

export default function ProjectsTrackPage({ track }: Props) {
  const { challenges, points, metadata } = track;
  const { title, description } = metadata;
  // TODO(projects): actual number
  const completionCount = 2;
  const completed = completionCount === challenges.length;

  const intl = useIntl();

  return (
    <div className="flex flex-col">
      <Button
        addonPosition="start"
        className="-ms-4 -mt-2 self-start"
        href="/projects/tracks"
        icon={RiArrowLeftLine}
        label={intl.formatMessage({
          defaultMessage: 'Back to all tracks',
          description: 'Button label to go back to all projects tracks',
          id: 'zpsjf3',
        })}
        variant="tertiary"
      />
      <div className="mb-12 mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="bg-red h-16 w-16 rounded-lg" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-y-2 gap-x-4 items-center">
              <Heading level="heading5">{title}</Heading>
              {metadata.premium && (
                <Badge
                  icon={RiLock2Line}
                  label={intl.formatMessage({
                    defaultMessage: 'Premium',
                    description:
                      'Label on Premium badge to indicate premium-only access',
                    id: 'aWL34G',
                  })}
                  size="sm"
                  variant="special"
                />
              )}
              {completed && <ProjectsChallengeStatusBadgeCompleted />}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <ProjectsChallengeReputationTag points={points} variant="flat" />
              <ProjectsChallengeCountTag
                total={challenges.length}
                value={completionCount}
              />
            </div>
          </div>
        </div>
        <Text color="secondary" size="body2">
          {description}
        </Text>
      </div>
      <Card
        className="p-6"
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <div className={clsx('relative flex flex-col gap-4')}>
          {challenges.map((challenge, index) => (
            <div key={challenge.slug} className="group flex items-center gap-6">
              <div
                className={clsx(
                  'relative flex flex-col justify-center self-stretch',
                )}>
                <ProjectsTrackChallengeStatusChip
                  label={index + 1}
                  status="NOT_STARTED"
                />
                {index < challenges.length - 1 && (
                  <div
                    className={clsx(
                      'w-px h-[90%] border-l border-dashed absolute self-center top-1/2 -z-10 translate-y-3',
                      themeBorderElementColor,
                    )}
                  />
                )}
              </div>
              <img
                alt={challenge.title}
                className={clsx(
                  'self-start rounded',
                  'h-[62px] w-[80px]',
                  'md:h-[100px] md:w-[130px]',
                )}
                src={challenge.imageUrl}
              />
              <div className="flex flex-col items-start gap-2">
                <Text weight="medium">{challenge.title}</Text>
                <Text color="secondary" size="body3">
                  {challenge.description}
                </Text>
                <Button
                  className="-ms-3"
                  href={challenge.href}
                  icon={RiArrowRightLine}
                  label="Start building"
                  size="sm"
                  variant="tertiary"
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
