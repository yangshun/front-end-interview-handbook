'use client';

import type { ProjectsChallengeInfo } from 'contentlayer/generated';

import { FormattedMessage } from '~/components/intl';
import ProjectsChallengeSubmissionFilterContextProvider from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import ProjectsChallengeSubmissionListWithFilters from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListWithFilters';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';

type Props = Readonly<{
  challengeInfoDict: Record<string, ProjectsChallengeInfo>;
  isViewerPremium: boolean;
  tracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsChallengeSubmissionListLearnPage({
  challengeInfoDict,
  isViewerPremium,
  tracks,
}: Props) {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex max-w-prose flex-col gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Browse all submissions"
            description="Browser all submissions"
            id="5ZA7Hl"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Explore user submissions handpicked for your growth - based on your profile, skills you're keen to learn, and the projects you've completed."
              description="Page subtitle"
              id="Xcw/lL"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsChallengeSubmissionFilterContextProvider tracks={tracks}>
          <ProjectsChallengeSubmissionListWithFilters
            challengeInfoDict={challengeInfoDict}
            isViewerPremium={isViewerPremium}
            type="learn"
          />
        </ProjectsChallengeSubmissionFilterContextProvider>
      </Section>
    </div>
  );
}
