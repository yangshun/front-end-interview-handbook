import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import ProjectsChallengeSubmissionCard from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionCard';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

export default function ProjectsChallengeSubmissionInterested({
  challengeSlug,
}: {
  challengeSlug: string;
}) {
  const { data: interestedSubmissions } =
    trpc.projects.submissions.listInterested.useQuery({
      challengeSlug,
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
        <div
          className={clsx(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            'gap-3 md:gap-4 lg:gap-6',
          )}>
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
