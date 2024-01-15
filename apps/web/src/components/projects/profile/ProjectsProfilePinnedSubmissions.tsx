import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsChallengeSubmissionCard from '../submissions/lists/ProjectsChallengeSubmissionCard';

type Props = Readonly<{
  projectsProfileId: string;
}>;

export default function ProjectsProfilePinnedSubmissions({
  projectsProfileId,
}: Props) {
  const { data: pinnedSubmissions } = trpc.projects.submissions.pinned.useQuery(
    {
      projectsProfileId,
    },
  );

  if (pinnedSubmissions == null || pinnedSubmissions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Submissions"
          description="Project submissions"
          id="p++huH"
        />
      </Heading>
      <Section>
        <div className="md:grid-cols-2 lg:grid-cols-3 grid-cols-1 grid gap-3 md:gap-4 lg:gap-6">
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
