import clsx from 'clsx';
import { RiInformationLine, RiNodeTree } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsSkillRoadmapChips from '~/components/projects/skills/metadata/ProjectsSkillRoadmapChips';
import {
  Hovercard,
  HovercardContent,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsSkillKey } from '../../skills/types';

type Props = Readonly<{
  skills: ReadonlyArray<ProjectsSkillKey>;
}>;

export default function ProjectsChallengeSkillsTag({ skills }: Props) {
  return (
    <Hovercard>
      <HovercardTrigger>
        <div className={clsx('flex items-center gap-1')}>
          <RiNodeTree className={clsx('size-4', themeTextSubtleColor)} />
          <Text color="subtle" size="body3">
            {skills.length} skills
          </Text>
        </div>
      </HovercardTrigger>
      <HovercardContent>
        <div className="flex flex-col gap-2">
          <ProjectsSkillRoadmapChips readonly={true} skills={skills} />
          <div
            className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
            <RiInformationLine className="size-4 shrink-0" />
            <Text color="secondary" size="body3">
              <FormattedMessage
                defaultMessage="You can add more skills e.g. UI frameworks used after starting the project"
                description="Additional information for skills section on Projects project page"
                id="j63zLB"
              />
            </Text>
          </div>
        </div>
      </HovercardContent>
    </Hovercard>
  );
}
