'use client';

import clsx from 'clsx';
import { RiLockLine } from 'react-icons/ri';

import { themeBorderColor, themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsViewerProjectsProfile } from '../../types';
import type { ProjectsPremiumAccessControlType } from './ProjectsPremiumAccessControl';
import ProjectsPremiumPaywall from './ProjectsPremiumPaywall';
import {
  useProjectsChallengePaywallSubtitle,
  useProjectsChallengePaywallTitle,
} from './ProjectsPremiumPaywallStrings';

type Props = Readonly<{
  slug: string;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
  viewerResourceAccess: ProjectsPremiumAccessControlType;
}>;

export default function ProjectsChallengeResourcePaywall({
  slug,
  viewerProjectsProfile,
  viewerResourceAccess: viewerContentAccess,
}: Props) {
  const title = useProjectsChallengePaywallTitle(viewerContentAccess);

  const subtitle = useProjectsChallengePaywallSubtitle(
    viewerContentAccess,
    viewerProjectsProfile,
  );

  return (
    <div className={clsx('rounded-md p-12', ['border', themeBorderColor])}>
      <ProjectsPremiumPaywall
        icon={
          <RiLockLine
            aria-hidden={true}
            className={clsx('size-10 shrink-0', themeTextSubtleColor)}
          />
        }
        slug={slug}
        subtitle={subtitle}
        title={title!}
        viewerContentAccess={viewerContentAccess}
        viewerProjectsProfile={viewerProjectsProfile}
      />
    </div>
  );
}
