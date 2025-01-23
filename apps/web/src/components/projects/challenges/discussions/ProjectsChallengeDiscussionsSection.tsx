'use client';

import { RiAddLine } from 'react-icons/ri';

import ProjectsDiscussionsCommentList from '~/components/projects/discussions/ProjectsDiscussionsCommentList';
import Button from '~/components/ui/Button';

import ProjectsChallengeDiscussionsNewComment from './ProjectsChallengeDiscussionsNewComment';
import type { ProjectsChallengeItem } from '../types';
import useUserProfileWithProjectsProfile from '../../common/useUserProfileWithProjectsProfile';
import { useProjectsOnboardingContext } from '../../onboarding/ProjectsOnboardingContext';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeDiscussionsSection({
  challenge,
}: Props) {
  const { userProfile } = useUserProfileWithProjectsProfile();
  const { handleActionRequiringProjectsProfile } =
    useProjectsOnboardingContext();
  const viewer = userProfile?.projectsProfile
    ? {
        points: userProfile.projectsProfile.points,
        userProfile,
      }
    : null;

  return (
    <div className="flex flex-col gap-y-9">
      {viewer ? (
        <ProjectsChallengeDiscussionsNewComment
          challenge={challenge}
          viewer={viewer}
        />
      ) : (
        <div>
          <Button
            addonPosition="start"
            icon={RiAddLine}
            label="Add a comment"
            size="lg"
            variant="secondary"
            onClick={() => handleActionRequiringProjectsProfile()}
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
