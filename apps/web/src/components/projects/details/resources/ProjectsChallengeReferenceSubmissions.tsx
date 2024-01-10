import { FormattedMessage } from 'react-intl';

import ProjectsSubmissionCard from '~/components/projects/submissions/ProjectsSubmissionCard';
import type { ProjectsSubmission } from '~/components/projects/submissions/types';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

const exampleSubmissions: ReadonlyArray<ProjectsSubmission> = Array.from(
  { length: 10 },
  (_, i) => ({
    author: {
      avatarUrl: 'https://source.unsplash.com/random/48x48',
      bio: null,
      createdAt: new Date(),
      currentStatus: null,
      githubUsername: null,
      id: '123' + String(i),
      linkedInUsername: null,
      name: 'John Smith',
      plan: null,
      premium: false,
      startWorkDate: null,
      stripeCustomer: null,
      title: 'Front End Engineer',
      updatedAt: new Date(),
      username: 'johnsmith',
      website: null,
    },
    commentCount: 0,
    description:
      'On this project, I found validating the users email address difficult. I was unable to validate the users email because of I was unable to relate the EventListener and the validate email function. I will like to know the best way to go about this and I will appreciate any contributions.',
    imgSrc: 'https://source.unsplash.com/random/640x360',
    likeCount: 0,
    slug: `responsive-solution-built-with-react-${i}`,
    stack: [
      {
        difficulty: 'easy',
        key: 'react',
        label: 'React',
      },
      {
        difficulty: 'medium',
        key: 'css',
        label: 'CSS',
      },
    ],
    submissionDate: new Date(),
    title: 'Responsive solution built with React',
    viewCount: 0,
  }),
);

export default function ProjectsChallengeReferenceSubmissions() {
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
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exampleSubmissions.slice(0, 6).map((submission) => (
            <ProjectsSubmissionCard
              key={submission.slug}
              submission={submission}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
