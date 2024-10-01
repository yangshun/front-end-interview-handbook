'use client';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeItem } from '../types';
import ProjectsChallengeSubmissionList from '../../submissions/lists/ProjectsChallengeSubmissionList';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeReferenceSubmissions({
  challenge,
}: Props) {
  const { data: referenceSubmissions, isLoading } =
    trpc.projects.submissions.listReference.useQuery({
      challengeSlug: challenge.metadata.slug,
    });

  return (
    <div className="flex flex-col">
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="User submissions you can reference"
          description="Title for user project submissions section"
          id="YUzNZk"
        />
      </Heading>
      <Section>
        <div className="flex flex-col gap-8">
          <Text
            className="mt-4 block max-w-screen-md"
            color="secondary"
            size="body2">
            <FormattedMessage
              defaultMessage="Here are some highly-rated submissions you can reference while doing your project. We prioritize submissions by their ratings, the similarity of their tech stack to yours, and the seniority level of the commenter."
              description="Description for Reference Submissions section on Projects project tips & resources page"
              id="TfBpeT"
            />
          </Text>
          {isLoading ? (
            <Spinner display="block" />
          ) : (
            <ProjectsChallengeSubmissionList
              submissions={referenceSubmissions ?? []}
            />
          )}
        </div>
      </Section>
    </div>
  );
}
