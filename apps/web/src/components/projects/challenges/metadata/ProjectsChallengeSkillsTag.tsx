import clsx from 'clsx';
import { RiInformationLine, RiNodeTree } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsSkillRoadmapChips from '~/components/projects/skills/metadata/ProjectsSkillRoadmapChips';
import {
  Hovercard,
  HovercardContent,
  HovercardPortal,
  HovercardTrigger,
} from '~/components/ui/Hovercard/Hovercard';
import Text from '~/components/ui/Text';
import {
  themeBorderSubtleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { ProjectsSkillKey } from '../../skills/types';

type Props = Readonly<{
  skills: ReadonlyArray<ProjectsSkillKey>;
  variant?: 'default' | 'underline';
}>;

export default function ProjectsChallengeSkillsTag({
  skills,
  variant = 'default',
}: Props) {
  const intl = useIntl();

  return (
    <Hovercard>
      <HovercardTrigger asChild={true}>
        <button className={clsx('flex items-center gap-1')} type="button">
          <RiNodeTree
            aria-hidden={true}
            className={clsx('size-4 shrink-0', themeTextSubtleColor)}
          />
          <Text
            className={clsx(
              variant === 'underline' && [
                'py-1',
                '-mb-0.5',
                'border-b border-dashed',
                themeBorderSubtleColor,
              ],
            )}
            color="subtle"
            size="body3">
            {intl.formatMessage(
              {
                defaultMessage:
                  '{skillsCount, plural, =0 {No skills used} one {1 skill used} other {# skills used}}',
                description: 'Number of skills used for a challenge',
                id: 'QokfmI',
              },
              {
                skillsCount: skills.length,
              },
            )}
          </Text>
        </button>
      </HovercardTrigger>
      <HovercardPortal>
        <HovercardContent>
          <div className="flex flex-col gap-2">
            <Text className="block" color="subtitle" weight="medium">
              <FormattedMessage
                defaultMessage="Skills used in this challenge"
                description="Additional information for skills section on Projects project page"
                id="excuaF"
              />
            </Text>
            <div className="flex flex-wrap items-center gap-2">
              <ProjectsSkillRoadmapChips readonly={true} skills={skills} />
            </div>
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
      </HovercardPortal>
    </Hovercard>
  );
}
