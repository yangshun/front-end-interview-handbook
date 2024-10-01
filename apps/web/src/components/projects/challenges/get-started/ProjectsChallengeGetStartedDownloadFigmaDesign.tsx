import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';

import ProjectsChallengeFigmaDesignPaywall from '../premium/ProjectsChallengeFigmaDesignPaywall';
import type { ProjectsPremiumAccessControlType } from '../premium/ProjectsPremiumAccessControl';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  challengeMetadata: ProjectsChallengeMetadata;
  viewerFigmaAccess: ProjectsPremiumAccessControlType;
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
          defaultMessage="Hi-fidelity design and interaction specifications for this challenge."
          description="Help text for Download Figma file button for projects"
          id="qQeXuR"
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
