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

export default function ProjectsChallengeSubmissionListMentorPage({
  challengeInfoDict,
  isViewerPremium,
  tracks,
}: Props) {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex max-w-prose flex-col gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Mentor others"
            description="Page title for mentoring others in their projects"
            id="yUfdpX"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Find submissions suggested for your review, based on your completed challenges, tech skills, and experience."
              description="Page subtitle"
              id="YS1B1R"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsChallengeSubmissionFilterContextProvider tracks={tracks}>
          <ProjectsChallengeSubmissionListWithFilters
            challengeInfoDict={challengeInfoDict}
            isViewerPremium={isViewerPremium}
            type="mentor"
          />
        </ProjectsChallengeSubmissionFilterContextProvider>
      </Section>
    </div>
  );
}
