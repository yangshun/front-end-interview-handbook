import * as AccordionPrimitive from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import Card from '~/components/ui/Card';
import {
  themeBackgroundCardColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import type { ProjectsChallengeItem } from '../challenges/types';
import ProjectsSkillAccordionHeader from './ProjectsSkillAccordionHeader';
import ProjectsSkillChallengesList from './ProjectsSkillChallengesList';
import type { ProjectsSkillSummaryItemForSubmission } from './types';

type Props = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  skill: ProjectsSkillSummaryItemForSubmission;
}>;

export default function ProjectsSkillAccordionItem({
  skill,
  challenges,
}: Props) {
  return (
    <AccordionPrimitive.Item value={skill.key}>
      <Card
        className={clsx(
          'flex flex-col overflow-visible',
          themeBackgroundCardColor,
        )}
        disableBackground={true}
        disableSpotlight={true}
        padding={false}
        pattern={false}>
        <AccordionPrimitive.Header asChild={true}>
          <AccordionPrimitive.Trigger className="outline-brand group rounded-lg">
            <div className="flex items-center justify-between gap-2 p-6">
              <ProjectsSkillAccordionHeader skill={skill} />
              <RiArrowDownSLine
                className={clsx(
                  'size-5 transition-transform group-data-[state=open]:rotate-180',
                  themeTextSecondaryColor,
                )}
              />
            </div>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content className="-mt-4 p-6">
          <ProjectsSkillChallengesList
            challenges={challenges}
            showMax={2}
            userProfile={null}
            view="submission"
          />
        </AccordionPrimitive.Content>
      </Card>
    </AccordionPrimitive.Item>
  );
}
