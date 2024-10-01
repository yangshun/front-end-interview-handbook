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

export default function ProjectsChallengeSubmissionListAllPage({
  challengeInfoDict,
  isViewerPremium,
  tracks,
}: Props) {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex max-w-prose flex-col gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Browse all user submissions"
            description="Learn from other user submissions"
            id="bofA5f"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Browse project solutions from our community. Interact with each unique submission, share your expertise, and evolve alongside our collaborative coding community."
              description="Page subtitle"
              id="eRu+ff"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsChallengeSubmissionFilterContextProvider tracks={tracks}>
          <ProjectsChallengeSubmissionListWithFilters
            challengeInfoDict={challengeInfoDict}
            isViewerPremium={isViewerPremium}
            type="all"
          />
        </ProjectsChallengeSubmissionFilterContextProvider>
      </Section>
    </div>
  );
}
