import clsx from 'clsx';
import { useId, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import ProjectsSkillRoadmapSelectionDialog from './ProjectsSkillRoadmapSelectionDialog';
import ProjectsSkillRoadmapChips from '../metadata/ProjectsSkillRoadmapChips';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  isLabelHidden?: boolean;
  label: string;
  required?: boolean;
  skills?: ReadonlyArray<ProjectsSkillKey>;
}>;

export default function ProjectsSkillRoadmapSelectionInput({
  label,
  isLabelHidden,
  required,
  className,
  description,
  descriptionStyle,
  skills: initialSkills = [],
}: Props) {
  const [skills, setSkills] =
    useState<ReadonlyArray<ProjectsSkillKey>>(initialSkills);
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
          {skills.length === 0 ? (
            <Text color="subtle" size="body2">
              <FormattedMessage
                defaultMessage="No skills added"
                description="Placeholder for skills input when no skills are selected"
                id="8tdTMy"
              />
            </Text>
          ) : (
            <ProjectsSkillRoadmapChips
              readonly={false}
              skills={skills}
              onDelete={(deletedSkills) => {
                setSkills(
                  skills.filter((skill) => !deletedSkills.includes(skill)),
                );
              }}
            />
          )}
          <Button
            addonPosition="start"
            icon={RiAddLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Add skills',
              description: 'Add skills used for challenge',
              id: 'Qw+A0/',
            })}
            size="xs"
            tooltip={intl.formatMessage({
              defaultMessage: 'Add skills',
              description: 'Add skills used for challenge',
              id: 'Qw+A0/',
            })}
            variant="secondary"
            onClick={() => {
              setShowSkillsRoadmapDialog(true);
            }}
          />
        </div>
      </div>
      {showSkillsRoadmapDialog && (
        <ProjectsSkillRoadmapSelectionDialog
          defaultSkills={skills}
          isShown={showSkillsRoadmapDialog}
          onClose={() => setShowSkillsRoadmapDialog(false)}
          onComplete={(newSkills) => {
            setSkills(newSkills);
            setShowSkillsRoadmapDialog(false);
          }}
        />
      )}
    </div>
  );
}
