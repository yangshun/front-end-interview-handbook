import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsChallengeSubmissionCard from '../submissions/lists/ProjectsChallengeSubmissionCard';
import type { ProjectsChallengeSubmissionAugmented } from '../submissions/types';

type Props = Readonly<{
  pinnedSubmissions:
    | ReadonlyArray<ProjectsChallengeSubmissionAugmented>
    | undefined;
}>;

export default function ProjectsProfilePinnedSubmissions({
  pinnedSubmissions,
}: Props) {
  if (pinnedSubmissions == null || pinnedSubmissions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Pinned submissions"
          description="Pinned project submissions"
          id="C/3YNR"
        />
      </Heading>
      <Section>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
          {pinnedSubmissions.map((submission) => (
            <ProjectsChallengeSubmissionCard
              key={submission.id}
              challenge={submission.challenge}
              isPinned={true}
              submission={submission}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
