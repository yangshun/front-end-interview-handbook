'use client';

import { FormattedMessage } from 'react-intl';

import ProjectsSkillTreeSection from '~/components/projects/skills/ProjectsSkillRoadmapSection';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

export default function ProjectsSkillRoadmapPage() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col max-w-prose gap-1">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Skill tree"
            description="Title of Projects skill tree page"
            id="+/f5eR"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Build your way up to a well-rounded front end / full stack skillset. Hone a specific skill, or follow our skills progression starting from zero."
              description="Description of Projects skill tree page"
              id="E9mfba"
            />
          </Text>
        </Section>
      </div>
      <Section>
        <ProjectsSkillTreeSection />
      </Section>
    </div>
  );
}
