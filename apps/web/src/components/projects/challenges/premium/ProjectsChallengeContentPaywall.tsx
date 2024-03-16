import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import ProjectsPremiumPaywall from './ProjectsPremiumPaywall';
import {
  useProjectsChallengePaywallSubtitle,
  useProjectsChallengePaywallTitle,
} from './ProjectsPremiumPaywallStrings';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  slug: string;
  viewerContentAccess: ProjectsPremiumAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeContentPaywall({
  viewerContentAccess,
  viewerProjectsProfile,
  slug,
}: Props) {
  const title = useProjectsChallengePaywallTitle(viewerContentAccess);
  const credits = viewerProjectsProfile?.credits ?? 0;
  const subtitle = useProjectsChallengePaywallSubtitle(
    viewerContentAccess,
    viewerProjectsProfile?.credits ?? 0,
    viewerProjectsProfile?.plan ?? null,
  );

  return (
    <ProjectsPremiumPaywall
      credits={credits}
      slug={slug}
      subtitle={subtitle}
      title={title!}
      viewerContentAccess={viewerContentAccess}
    />
  );
}
