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
    <div className="overflow-clip rounded-lg md:w-[420px] sm:w-[400px] w-[350px] p-6 flex flex-col gap-4">
      {isLoading || !data ? (
        <div className="flex items-center justify-center w-full min-h-[120px]">
          <Spinner size="md" />
        </div>
      ) : (
        <>
          <div className="gap-4 items-center flex">
            <Anchor href={`/projects/u/${profile?.username}`}>
              <ProjectsProfileAvatar
                hovercard={false}
                profile={{
                  ...profile!,
                  // TODO(projects): use actual points.
                  points: 42,
                }}
                size="2xl"
              />
            </Anchor>
            <div className="flex gap-1 flex-col">
              <div className="flex gap-2 items-center">
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
                    <a href={profile.githubUsername}>
                      <span className="sr-only">GitHub</span>
                      <RiGithubFill aria-hidden="true" className="size-5" />
                    </a>
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
                    <a href={profile.linkedInUsername}>
                      <span className="sr-only">LinkedIn</span>
                      <RiLinkedinBoxFill
                        aria-hidden="true"
                        className="size-5"
                      />
                    </a>
                  </Tooltip>
                )}
              </div>
              <UserProfileInformationRow profile={profile!} size="body3" />
            </div>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
            {statsItems.map((item) => (
              <div key={item.title} className="flex flex-col flex-1 h-full">
                <Text size="body0" weight="bold">
                  {item.count}
                </Text>
                <div className="flex items-center h-full">
                  <Text className="!text-2xs" color="secondary">
                    {item.title}
                  </Text>
                </div>
              </div>
            ))}
          </div>
          {(submissions ?? []).length >= 2 && !isMobileAndBelow && (
            <div className="flex gap-4 flex-wrap">
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
