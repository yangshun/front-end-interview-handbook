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
  const { data: pinnedSubmissions } =
    trpc.projects.submissions.listPinned.useQuery({
      projectsProfileId,
    });

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
