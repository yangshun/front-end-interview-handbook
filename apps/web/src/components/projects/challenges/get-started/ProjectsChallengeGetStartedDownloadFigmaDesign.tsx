import type { ProjectsChallengeMetadata } from 'contentlayer/generated';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

import type { ProjectsChallengeAccessControlType } from '../premium/ProjectsChallengeAccessControl';
import ProjectsChallengeFigmaDesignPaywall from '../premium/ProjectsChallengeFigmaDesignPaywall';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  challengeMetadata: ProjectsChallengeMetadata;
  viewerFigmaAccess: ProjectsChallengeAccessControlType;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export default function ProjectsChallengeGetStartedDownloadFigmaDesign({
  challengeMetadata,
  viewerFigmaAccess,
  viewerProjectsProfile,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-4">
      <Text color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="Includes a hi-fidelity design and interaction specifications for this project."
          description="Description for Download Figma Design content section on Before You Get Started dialog"
          id="+SiVOr"
        />
      </Text>
      <ProjectsChallengeFigmaDesignPaywall
        challengeMetadata={challengeMetadata}
        placement="GET_STARTED_DIALOG"
        viewerFigmaAccess={viewerFigmaAccess}
        viewerProjectsProfile={viewerProjectsProfile}
      />
    </div>
  );
}
