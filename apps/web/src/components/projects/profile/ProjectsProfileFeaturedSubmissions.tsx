import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsChallengeSubmissionCard from '../submissions/lists/ProjectsChallengeSubmissionCard';

type Props = Readonly<{
  projectsProfileId: string;
}>;

export default function ProjectsProfileFeaturedSubmissions({
  projectsProfileId,
}: Props) {
  const { data: featuredSubmissions } =
    trpc.projects.submissions.featured.useQuery({
      projectsProfileId,
    });

  if (featuredSubmissions == null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Submissions"
          description="Title for Featured Submissions section on Projects project profile page"
          id="uDIj6e"
        />
      </Heading>
      <Section>
        <div className="md:grid-cols-2 lg:grid-cols-3 grid-cols-1 grid gap-3 md:gap-4 lg:gap-6">
          {featuredSubmissions.map((submission) => (
            <ProjectsChallengeSubmissionCard
              key={submission.id}
              challenge={submission.challenge}
              isPinnedOnProfile={true}
              submission={submission}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
