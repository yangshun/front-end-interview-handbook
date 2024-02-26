import clsx from 'clsx';
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiStarSmileFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useMediaQuery } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Anchor from '~/components/ui/Anchor';
import Chip from '~/components/ui/Chip';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsProfileDisplayNameLink from './ProjectsProfileDisplayNameLink';
import useProjectsProfileStats from '../hooks/useProjectsProfileStats';

type Props = Readonly<{
  profileId: string;
}>;

export default function ProjectsProfileHoverCard({ profileId }: Props) {
  const intl = useIntl();
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');
  const { data, isLoading } = trpc.projects.profile.hovercard.useQuery({
    profileId,
  });

  const statsItems = useProjectsProfileStats({
    codeReviews: data?.stats.codeReviews,
    completedChallenges: data?.stats.completedChallenges,
    submissionViews: data?.stats.submissionViews ?? 0,
    upvotes: data?.stats.upvotes,
  });

  if (data === null) {
    return null;
  }

  const { profile, submissions } = data || {};

  return (
    <div
      className={clsx(
        'flex flex-col gap-4',
        'overflow-clip rounded-lg',
        'w-[350px] sm:w-[400px] md:w-[420px]',
      )}>
      {isLoading || !data ? (
        <div className="flex min-h-[120px] w-full items-center justify-center">
          <Spinner size="md" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Anchor href={`/projects/u/${profile?.username}`}>
              <ProjectsProfileAvatar
                hovercard={false}
                profile={profile!}
                size="2xl"
              />
            </Anchor>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <ProjectsProfileDisplayNameLink profile={profile!} />
                {/* TODO(projects): Add actual premium logic */}
                <Tooltip
                  className="flex items-center"
                  label={intl.formatMessage({
                    defaultMessage: 'Premium User',
                    description: 'Tooltip for premium icon',
                    id: 'QYVlxD',
                  })}>
                  <Chip
                    icon={RiStarSmileFill}
                    isLabelHidden={true}
                    label={intl.formatMessage({
                      defaultMessage: 'Premium',
                      description: 'Label for premium',
                      id: 'ymmDf7',
                    })}
                    size="xs"
                    variant="special"
                  />
                </Tooltip>
                {profile?.githubUsername && (
                  <Tooltip
                    asChild={true}
                    label={intl.formatMessage({
                      defaultMessage: 'View GitHub profile',
                      description: 'Tooltip for github profile icon',
                      id: 'BAyveo',
                    })}>
                    <Anchor href={profile.githubUsername} variant="unstyled">
                      <span className="sr-only">GitHub</span>
                      <RiGithubFill aria-hidden="true" className="size-5" />
                    </Anchor>
                  </Tooltip>
                )}
                {profile?.linkedInUsername && (
                  <Tooltip
                    asChild={true}
                    label={intl.formatMessage({
                      defaultMessage: 'View LinkedIn profile',
                      description: 'Tooltip for LinkedIn profile icon',
                      id: 'Xq6/V6',
                    })}>
                    <Anchor href={profile.linkedInUsername} variant="unstyled">
                      <span className="sr-only">LinkedIn</span>
                      <RiLinkedinBoxFill
                        aria-hidden="true"
                        className="size-5"
                      />
                    </Anchor>
                  </Tooltip>
                )}
              </div>
              <UserProfileInformationRow profile={profile!} size="body3" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {statsItems.map((item) => (
              <div key={item.title} className="flex h-full flex-1 flex-col">
                <Text size="body0" weight="bold">
                  {item.count}
                </Text>
                <div className="flex h-full items-center">
                  <Text className="!text-2xs" color="secondary">
                    {item.title}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          {(submissions ?? []).length >= 2 && !isMobileAndBelow && (
            <div className="flex flex-wrap gap-4">
              {submissions?.map((submission) => (
                <Anchor
                  key={submission.id}
                  className="flex-1"
                  href={submission.hrefs.detail}>
                  <img
                    alt={submission.title}
                    className="h-[110px] w-full rounded-md"
                    // TODO(projects): Remove hardcoded preview solution image
                    src={`https://source.unsplash.com/random/1080x900?random=${submission.slug}`}
                  />
                </Anchor>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
