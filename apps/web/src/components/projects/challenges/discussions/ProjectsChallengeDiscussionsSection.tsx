'use client';

import ProjectsDiscussionsCommentList from '~/components/projects/discussions/ProjectsDiscussionsCommentList';

import useUserProfileWithProjectsProfile from '../../common/useUserProfileWithProjectsProfile';
import ProjectsDiscussionsCommentCompleteProfileButton from '../../discussions/ProjectsDiscussionsCommentCompleteProfileButton';
import type { ProjectsChallengeItem } from '../types';
import ProjectsChallengeDiscussionsNewComment from './ProjectsChallengeDiscussionsNewComment';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

const scrollHash = 'projects-challenge-discussion-comment';

export default function ProjectsChallengeDiscussionsSection({
  challenge,
}: Props) {
  const { userProfile } = useUserProfileWithProjectsProfile();

  const viewer = userProfile?.projectsProfile?.completed
    ? {
        points: userProfile.projectsProfile.points,
        userProfile,
      }
    : null;

  return (
    <div className="flex flex-col gap-y-9" id={scrollHash}>
      {viewer ? (
        <ProjectsChallengeDiscussionsNewComment
          challenge={challenge}
          viewer={viewer}
        />
      ) : (
        <div>
          <ProjectsDiscussionsCommentCompleteProfileButton
            scrollHash={scrollHash}
          />
        </div>
      )}
      <div className="w-full">
        <ProjectsDiscussionsCommentList
          domain="PROJECTS_CHALLENGE"
          entityId={challenge.metadata.slug}
          viewer={viewer}
        />
      </div>
    </div>
  );
}
