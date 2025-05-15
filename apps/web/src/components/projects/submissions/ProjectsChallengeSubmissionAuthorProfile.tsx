import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import type { ProjectsChallengeSubmissionAuthor } from '~/components/projects/submissions/types';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import Text from '~/components/ui/Text';

import ProjectsProfileSocialLinks from '../profile/info/ProjectsProfileSocialLinks';
import ProjectsProfileUsernameBadge from '../profile/info/ProjectsProfileUsernameBadge';
import ProjectsProfileDisplayNameLink from '../users/ProjectsProfileDisplayNameLink';

type Props = Readonly<{
  points: number;
  premium: boolean;
  userProfile: ProjectsChallengeSubmissionAuthor;
}>;

export default function ProjectsChallengeSubmissionAuthorProfile({
  points,
  premium,
  userProfile,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <ProjectsProfileAvatar
        points={points}
        size="2xl"
        userProfile={userProfile}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Text size="body2" weight="medium">
            <ProjectsProfileDisplayNameLink userProfile={userProfile} />
          </Text>
          <ProjectsProfileUsernameBadge
            premium={premium}
            username={userProfile.username}
          />
          <ProjectsProfileSocialLinks userProfile={userProfile} />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <UserProfileInformationRow size="body3" userProfile={userProfile} />
          <ProjectsUserReputation points={points} />
        </div>
      </div>
    </div>
  );
}
