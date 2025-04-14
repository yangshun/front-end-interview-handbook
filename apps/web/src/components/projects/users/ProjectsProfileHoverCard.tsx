import clsx from 'clsx';
import { useMediaQuery } from 'usehooks-ts';

import { trpc } from '~/hooks/trpc';

import { formatBigNumber } from '~/components/common/formatBigNumber';
import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Anchor from '~/components/ui/Anchor';
import Img from '~/components/ui/Img';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import ProjectsProfileDisplayNameLink from './ProjectsProfileDisplayNameLink';
import ProjectsProfilePremiumChip from './ProjectsProfilePremiumChip';
import ProjectsUserReputation from './ProjectsUserReputation';
import useProjectsProfileStats from '../hooks/useProjectsProfileStats';
import ProjectsProfileSocialLinks from '../profile/info/ProjectsProfileSocialLinks';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  userId: string;
}>;

export default function ProjectsProfileHoverCard({ userId }: Props) {
  const user = useUser();
  const isMobileAndBelow = useMediaQuery('(max-width: 768px)');
  const { data, isLoading } = trpc.projects.profile.hovercard.useQuery({
    userId,
  });

  const statsItems = useProjectsProfileStats({
    codeReviews: data?.stats.codeReviews,
    completedChallenges: data?.stats.completedChallenges,
    isViewingOwnProfile: user?.id === userId,
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
        'w-[350px] sm:w-[380px]',
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
                <ProjectsProfileDisplayNameLink
                  color="subtitle"
                  userProfile={profile!}
                />
                {profile?.projectsProfile?.premium && (
                  <ProjectsProfilePremiumChip />
                )}
                <ProjectsProfileSocialLinks userProfile={profile!} />
              </div>
              <UserProfileInformationRow size="body3" userProfile={profile!} />
              <ProjectsUserReputation
                points={profile!.projectsProfile?.points ?? 0}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {statsItems.map((item) => (
              <div key={item.title} className="flex h-full flex-1 flex-col">
                <Text size="body0" weight="bold">
                  {item.count ? formatBigNumber(item.count) : '-'}
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
                  <Img
                    alt={submission.title}
                    className="h-[110px] w-full rounded-md"
                    src={submission.imgSrc}
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
