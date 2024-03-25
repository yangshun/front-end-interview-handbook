'use client';

import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';
import ProjectsChallengeReputationTag from '../../challenges/metadata/ProjectsChallengeReputationTag';

type Props = Readonly<{
  slug: string;
}>;

export default function ProjectsSkillRoadmapDetails({ slug }: Props) {
  return (
    <div className="flex flex-col gap-y-8 pb-12">
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6">{projectsSkillLabel(slug)}</Heading>
        <div className="flex flex-wrap gap-x-6">
          <ProjectsChallengeReputationTag points={1200} />
          <ProjectsChallengeReputationTag points={1200} />
        </div>
        <Text className="block" color="secondary" size="body3">
          HTML stands for HyperText Markup Language. It is used on the frontend
          and gives the structure to the webpage which you can style using CSS
          and make interactive using JavaScript.
        </Text>
      </div>
      <Divider />
      <Prose textSize="sm">
        <Heading level="heading6">Suggested readings</Heading>
        <p>
          <ul>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
            <li>W3Schools: Learn HTML</li>
          </ul>
        </p>
      </Prose>
      <Divider />
      <div className="flex flex-col gap-y-4">
        <Heading level="heading6">Skill plan</Heading>
        <Text className="block" color="secondary" size="body3">
          Recommended projects to do to advance this skill progressively.
        </Text>
        <div className="flex flex-wrap gap-x-6">
          <ProjectsChallengeReputationTag points={1200} />
          <ProjectsChallengeReputationTag points={1200} />
        </div>
      </div>
    </div>
  );
}
