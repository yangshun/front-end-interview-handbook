import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsChallengeSubmissionCard from '../submissions/lists/ProjectsChallengeSubmissionCard';

type Props = Readonly<{
  projectsProfileId: string;
}>;

export default function ProjectsProfilePinnedSubmissions({
  projectsProfileId,
}: Props) {
  // TODO(projects): fetch from server to prevent layout shifts
  // and so that the bottom profile tabs can scroll into view correctly.
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
        <div className={clsx('grid gap-6', 'md:grid-cols-2', 'xl:grid-cols-3')}>
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
