import useProfile from '~/hooks/user/useProfile';

import DiscussionsCommentList from '~/components/discussions/DiscussionsCommentList';

import ProjectsChallengeDiscussionsNewComment from './ProjectsChallengeDiscussionsNewComment';
import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeDiscussionsSection({
  challenge,
}: Props) {
  const { profile } = useProfile();

  return (
    <div className="flex flex-col gap-y-9">
      {profile && (
        <ProjectsChallengeDiscussionsNewComment
          challenge={challenge}
          // TODO(projects): fetch real points.
          viewer={{ ...profile, points: 42 }}
        />
      )}
      <div className="flex w-full">
        <DiscussionsCommentList
          domain="PROJECTS_CHALLENGE"
          entityId={challenge.metadata.slug}
          // TODO(projects): fetch real points.
          viewer={profile == null ? profile : { ...profile, points: 42 }}
        />
      </div>
    </div>
  );
}
