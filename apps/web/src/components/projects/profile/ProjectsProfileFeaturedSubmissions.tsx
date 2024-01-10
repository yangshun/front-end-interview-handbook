import { FormattedMessage } from 'react-intl';

import type { ProjectsSubmission } from '~/components/projects/submissions/types';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsSubmissionCard from '../submissions/ProjectsSubmissionCard';

const exampleSubmissions: ReadonlyArray<ProjectsSubmission> = Array.from(
  { length: 3 },
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
    briefDescription: 'Newsletter Section',
    briefUrl: '/projects/challenges/newsletter-section',
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

export default function ProjectsProfileFeaturedSubmissions() {
  return (
    <Section>
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Submissions"
          description="Title for Featured Submissions section on Projects project profile page"
          id="uDIj6e"
        />
      </Heading>
      <div className="lg:grid-cols-3 grid-cols-1 grid grid-rows-3 gap-3 md:gap-4 lg:gap-6">
        {exampleSubmissions.map((submission) => (
          <ProjectsSubmissionCard
            key={submission.slug}
            isPinnedOnProfile={true}
            submission={submission}
          />
        ))}
      </div>
    </Section>
  );
}
