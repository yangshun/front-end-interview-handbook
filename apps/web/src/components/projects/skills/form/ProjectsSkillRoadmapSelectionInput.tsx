import clsx from 'clsx';
import { useId, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';
import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import ProjectsSkillRoadmapSelection from './ProjectsSkillRoadmapSelection';

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  isLabelHidden?: boolean;
  label: string;
  required?: boolean;
}>;

export default function ProjectsSkillRoadmapSelectionInput({
  label,
  isLabelHidden,
  required,
  className,
  description,
  descriptionStyle,
}: Props) {
  const [showSkillsRoadmapDialog, setShowSkillsRoadmapDialog] = useState(false);
  const intl = useIntl();
  // TODO(projects): do something with this id for a11y
  const id = useId();

  return (
    <div>
      <div className={clsx('flex flex-col gap-2', className)}>
        <Label
          description={description}
          descriptionStyle={descriptionStyle}
          htmlFor={id}
          isLabelHidden={isLabelHidden}
          label={label}
          required={required}
        />
        <div
          className={clsx(
            'flex justify-between items-center rounded',
            'py-1.5 px-3',
            ['border', themeBorderElementColor],
            themeBackgroundElementColor,
          )}>
          {/* TODO(projects): Add skill selection input */}
          <Text color="subtle" size="body2">
            <FormattedMessage
              defaultMessage="No skills added"
              description="Placeholder for skills input when no skills are selected"
              id="8tdTMy"
            />
          </Text>
          <Button
            addonPosition="start"
            icon={RiAddLine}
            label={intl.formatMessage({
              defaultMessage: 'Add skills',
              description: 'Label for "Add skills" button for skills input',
              id: 'RhfyEQ',
            })}
            size="xs"
            variant="secondary"
            onClick={() => {
              setShowSkillsRoadmapDialog(true);
            }}
          />
        </div>
      </div>
      <Dialog
        isShown={showSkillsRoadmapDialog}
        primaryButton={
          <Button
            label="Confirm"
            size="md"
            variant="primary"
            onClick={() => setShowSkillsRoadmapDialog(false)}
          />
        }
        secondaryButton={
          <Button
            label="Revert to default"
            size="md"
            variant="secondary"
            onClick={() => setShowSkillsRoadmapDialog(false)}
          />
        }
        title="Choose additional skills you will use in this project"
        width="screen-xl"
        onClose={() => setShowSkillsRoadmapDialog(false)}>
        <ProjectsSkillRoadmapSelection value={[]} onChange={() => {}} />
      </Dialog>
    </div>
  );
}
