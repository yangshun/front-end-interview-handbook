import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeSubmissionCard from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionCard';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function ProjectsChallengeSubmissionInterested({
  challengeSlug,
  submissionId,
}: {
  challengeSlug: string;
  submissionId: string;
}) {
  const { data: interestedSubmissions } =
    trpc.projects.submissions.interested.useQuery({
      challenge: challengeSlug,
      submissionId,
    });

  if (interestedSubmissions == null || interestedSubmissions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="You may be interested"
          description="Title for you may be interested section on Projects challenge submission page"
          id="9//mtm"
        />
      </Heading>
      <Section>
        <div className="md:grid-cols-2 lg:grid-cols-3 grid-cols-1 grid gap-3 md:gap-4 lg:gap-6">
          {interestedSubmissions.map((submission) => (
            <ProjectsChallengeSubmissionCard
              key={submission.id}
              challenge={submission.challenge}
              submission={submission}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
