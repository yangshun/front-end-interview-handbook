import useProfile from '~/hooks/user/useProfile';

import DiscussionsCommentList from '~/components/projects/discussions/ProjectsDiscussionsCommentList';

import ProjectsChallengeDiscussionsNewComment from './ProjectsChallengeDiscussionsNewComment';
import type { ProjectsChallengeItem } from '../types';
import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeDiscussionsSection({
  challenge,
}: Props) {
  const { profile } = useProfileWithProjectsProfile();
  const viewer = profile?.projectsProfile
    ? {
        points: profile.projectsProfile.points,
        userProfile: {
          ...profile,
        },
      }
    : null;

  return (
    <div className="flex flex-col gap-y-9">
      {viewer && (
        <ProjectsChallengeDiscussionsNewComment
          challenge={challenge}
          viewer={viewer}
        />
      )}
      <div className="flex w-full">
        <DiscussionsCommentList
          domain="PROJECTS_CHALLENGE"
          entityId={challenge.metadata.slug}
          viewer={viewer}
        />
      </div>
    </div>
  );
}
