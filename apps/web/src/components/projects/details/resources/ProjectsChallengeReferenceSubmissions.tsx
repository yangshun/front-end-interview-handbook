import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsSubmissionCard from '~/components/projects/submissions/ProjectsSubmissionCard';
import EmptyState from '~/components/ui/EmptyState';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  project: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeReferenceSubmissions({
  project,
}: Props) {
  const { data: referenceSubmissions } =
    trpc.projects.submissions.reference.useQuery({
      slug: project.metadata.slug,
    });

  return (
    <div className="flex flex-col">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Submissions you can reference"
          description="Title for Reference Submissions section on Projects project tips & resources page"
          id="6PA1sS"
        />
      </Heading>
      <Section>
        <div className="flex flex-col gap-8">
          <Text
            className="mt-4 max-w-screen-md"
            color="secondary"
            display="block"
            size="body2">
            <FormattedMessage
              defaultMessage="Here are some highly-rated submissions you can reference while doing your project. We prioritize submissions by their ratings, the similarity of their tech stack to yours, and the seniority level of the commenter."
              description="Description for Reference Submissions section on Projects project tips & resources page"
              id="TfBpeT"
            />
          </Text>
          {referenceSubmissions == null ||
          referenceSubmissions?.length === 0 ? (
            <div
              className={clsx('rounded-lg py-10', 'border', themeBorderColor)}>
              <EmptyState title="No submissions" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {referenceSubmissions
                ?.map((submission) => ({
                  ...submission,
                  author: submission.projectsProfile?.userProfile,
                  comments: 23,
                  imgSrc: 'https://source.unsplash.com/random/48x48',
                  likes: 56,
                  stack: [],
                }))
                .map((submission) => (
                  <ProjectsSubmissionCard
                    key={submission.id}
                    submission={submission}
                  />
                ))}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
