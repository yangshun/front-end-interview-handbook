'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsChallengeSubmissionFilterContextProvider from '~/components/projects/submissions/lists/filters/ProjectsChallengeSubmissionFilterContext';
import ProjectsChallengeSubmissionListWithFilters from '~/components/projects/submissions/lists/ProjectsChallengeSubmissionListWithFilters';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function ProjectsChallengeSubmissionListMentorPage() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col max-w-prose gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Mentor others"
            description="Page title for mentoring others in their projects"
            id="yUfdpX"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Find submissions suggested for your review, based on your completed challenges, tech skills, and experience."
              description="Page subtitle"
              id="YS1B1R"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsChallengeSubmissionFilterContextProvider>
          <ProjectsChallengeSubmissionListWithFilters type="mentor" />
        </ProjectsChallengeSubmissionFilterContextProvider>
      </Section>
    </div>
  );
}
