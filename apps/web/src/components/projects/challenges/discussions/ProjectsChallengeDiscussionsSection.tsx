'use client';

import DiscussionsCommentList from '~/components/projects/discussions/ProjectsDiscussionsCommentList';

import ProjectsChallengeDiscussionsNewComment from './ProjectsChallengeDiscussionsNewComment';
import type { ProjectsChallengeItem } from '../types';
import useUserProfileWithProjectsProfile from '../../common/useUserProfileWithProjectsProfile';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeDiscussionsSection({
  challenge,
}: Props) {
  const { userProfile } = useUserProfileWithProjectsProfile();
  const viewer = userProfile?.projectsProfile
    ? {
        points: userProfile.projectsProfile.points,
        userProfile,
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
