import clsx from 'clsx';
import { RiStarSmileFill } from 'react-icons/ri';
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
import ProjectsProfileSocialLinks from '../profile/info/ProjectsProfileSocialLinks';

type Props = Readonly<{
  userId: string;
}>;

export default function ProjectsProfileHoverCard({ userId }: Props) {
  const intl = useIntl();
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');
  const { data, isLoading } = trpc.projects.profile.hovercard.useQuery({
    userId,
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
            <ProjectsProfileAvatar
              mode="link"
              points={profile!.projectsProfile?.points}
              size="2xl"
              userProfile={profile!}
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <ProjectsProfileDisplayNameLink userProfile={profile!} />
                {profile?.projectsProfile?.premium && (
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
                )}
                <ProjectsProfileSocialLinks userProfile={profile!} />
              </div>
              <UserProfileInformationRow size="body3" userProfile={profile!} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {statsItems.map((item) => (
              <div key={item.title} className="flex h-full flex-1 flex-col">
                <Text size="body0" weight="bold">
                  {item.count}
                </Text>
                <div className="flex h-full">
                  <Text className="text-2xs" color="secondary" size="inherit">
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
