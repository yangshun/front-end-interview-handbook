'use client';

import { FormattedMessage } from '~/components/intl';
import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import ProjectsTrackSection from './ProjectsTrackSection';
import type { ProjectsChallengeHistoricalStatuses } from '../challenges/types';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsTracksListPage({
  challengeHistoricalStatuses,
  isViewerPremium,
  isViewingOwnProfile,
  projectTracks,
}: Props) {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex max-w-prose flex-col gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Component tracks"
            description="Title of Projects component tracks page"
            id="fg9e1P"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Build entire component libraries or design systems from scratch for your portfolio or as a toolkit for future projects."
              description="Description of Projects component tracks page"
              id="tK6m9g"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsTrackSection
          challengeHistoricalStatuses={challengeHistoricalStatuses}
          defaultOpen={true}
          isViewerPremium={isViewerPremium}
          isViewingOwnProfile={isViewingOwnProfile}
          projectTracks={projectTracks}
          userProfile={null}
        />
      </Section>
    </div>
  );
}
