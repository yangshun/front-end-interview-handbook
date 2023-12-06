import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiMoreLine,
  RiTimerLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import type { ProjectsProject } from './types';
import ProjectsOtherTechStackInput from '../skills/ProjectsOtherTechStackInput';
import ProjectsSkillsSelect from '../skills/ProjectsSkillsSelect';

type Props = Readonly<{
  project: ProjectsProject;
}>;

export default function ProjectsProjectCurrentProjectSessionCard({
  project: { skills },
}: Props) {
  const intl = useIntl();
  const [isExpanded, setIsExpanded] = useState(false);
  const [otherTechStacks, setOtherTechStacks] = useState<Array<string>>([]);

  return (
    <Card className="p-6" padding={false} pattern={false}>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1.5">
          <Text weight="bold">
            <FormattedMessage
              defaultMessage="Current project session"
              description="Title for current project session card"
              id="AfXYpF"
            />
          </Text>
          <div className={clsx('flex gap-1', themeTextSecondaryColor)}>
            <RiTimerLine className="h-4 w-4" color="inherit" />
            <Text color="inherit" size="body3">
              {/* TODO: i18n this */}
              Since Jul 23
            </Text>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Submit project',
              description:
                'Label for "Submit project" button on current project session card',
              id: 'jUpKwE',
            })}
            size="xs"
            variant="primary"
          />
          <Button
            icon={RiMoreLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'More',
              description:
                'Label for "More" button on current project session card',
              id: 'dgTN/f',
            })}
            size="xs"
            variant="secondary"
          />
          <Button
            className={clsx('transition-transform', isExpanded && 'rotate-180')}
            icon={RiArrowDownSLine}
            isLabelHidden={true}
            label={
              isExpanded
                ? intl.formatMessage({
                    defaultMessage: 'Collapse',
                    description:
                      'Label for "Collapse" button on current project session card',
                    id: 'n2UNgq',
                  })
                : intl.formatMessage({
                    defaultMessage: 'More',
                    description:
                      'Label for "More" button on current project session card',
                    id: 'dgTN/f',
                  })
            }
            size="xs"
            variant="tertiary"
            onClick={() => setIsExpanded((expanded) => !expanded)}
          />
        </div>
      </div>
      {isExpanded && (
        <>
          <ProjectsSkillsSelect className="mt-6" skills={skills} />
          <ProjectsOtherTechStackInput
            value={otherTechStacks}
            onChange={setOtherTechStacks}
          />
        </>
      )}
    </Card>
  );
}
