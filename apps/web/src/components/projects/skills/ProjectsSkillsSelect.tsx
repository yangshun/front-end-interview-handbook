import clsx from 'clsx';
import { RiAddLine, RiInformationLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import ProjectsSkillChip from './ProjectsSkillChip';
import type { ProjectsSkill } from './types';

type Props = Readonly<{
  className?: string;
  skills: ReadonlyArray<
    ProjectsSkill & {
      isEditable?: boolean;
    }
  >;
}>;

export default function ProjectsSkillsSelect({ className, skills }: Props) {
  const intl = useIntl();

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Text size="body2">*</Text>
          <Text size="body2">
            <FormattedMessage
              defaultMessage="Skills"
              description="Label for skills select"
              id="Vk81t3"
            />
          </Text>
          <Tooltip
            label={intl.formatMessage({
              defaultMessage: 'Skills tooltip',
              description: 'Tooltip for skills select',
              id: 't2WvF1',
            })}>
            <RiInformationLine
              className={clsx('h-4 w-4', themeTextSecondaryColor)}
            />
          </Tooltip>
        </div>
        <Button
          className="!text-brand -me-2"
          icon={RiAddLine}
          label={intl.formatMessage({
            defaultMessage: 'Edit skills',
            description: 'Label for edit skills button in skills select',
            id: '1e4fFu',
          })}
          variant="tertiary"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <ProjectsSkillChip
            key={skill.key}
            isEditable={skill.isEditable}
            skill={skill}
            // TODO(projects): Replace below with actual subSkills
            subSkills={[
              {
                difficulty: 'easy',
                key: 'dom-manipulation',
                label: 'DOM Manipulation',
              },
              {
                difficulty: 'medium',
                key: 'flex',
                label: 'Flex',
              },
              {
                difficulty: 'hard',
                key: 'typescript',
                label: 'TypeScript',
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
}
