import type { ProjectsViewerProjectsProfile } from '../../types';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import ProjectsPremiumPaywall from './ProjectsPremiumPaywall';
import {
  useProjectsChallengeSubmissionPaywallSubtitle,
  useProjectsChallengeSubmissionPaywallTitle,
} from './ProjectsPremiumPaywallStrings';

type Props = Readonly<{
  slug: string;
  viewerContentAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeSubmissionPaywall({
  viewerContentAccess,
  viewerProjectsProfile,
  slug,
}: Props) {
  const title = useProjectsChallengeSubmissionPaywallTitle(viewerContentAccess);
  const subtitle = useProjectsChallengeSubmissionPaywallSubtitle(
    viewerContentAccess,
    viewerProjectsProfile?.credits ?? 0,
    viewerProjectsProfile?.creditsAtStartOfCycle ?? 0,
    viewerProjectsProfile?.plan ?? null,
  );

  return (
    <ProjectsPremiumPaywall
      slug={slug}
      subtitle={subtitle}
      title={title!}
      viewerContentAccess={viewerContentAccess}
      viewerProjectsProfile={viewerProjectsProfile}
    />
  );
}
