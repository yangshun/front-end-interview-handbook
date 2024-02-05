import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef, useId, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import { themeBackgroundElementColor } from '~/components/ui/theme';

import ProjectsSkillRoadmapSelectionDialog from './ProjectsSkillRoadmapSelectionDialog';
import ProjectsSkillRoadmapChips from '../metadata/ProjectsSkillRoadmapChips';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  isLabelHidden?: boolean;
  label?: string;
  onBlur?: () => void;
  onChange: (value: ReadonlyArray<ProjectsSkillKey>) => void;
  required?: boolean;
  value: ReadonlyArray<ProjectsSkillKey>;
}>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx('ring-danger', 'focus-within:ring-danger'),
  normal: clsx(
    'ring-neutral-300 dark:ring-neutral-700',
    'focus-within:ring-brand-dark dark:focus-within:ring-brand',
  ),
};

function ProjectsSkillRoadmapSelectionInput(
  {
    className,
    descriptionStyle = 'tooltip',
    description,
    errorMessage,
    isLabelHidden,
    label,
    required,
    value,
    onBlur,
    onChange,
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [showSkillsRoadmapDialog, setShowSkillsRoadmapDialog] = useState(false);
  const intl = useIntl();

  const hasError = !!errorMessage;
  const id = useId();
  const messageId = useId();
  const state = hasError ? 'error' : 'normal';

  return (
    <div>
      <div className={clsx('flex flex-col gap-2', className)}>
        <Label
          description={
            description ??
            intl.formatMessage({
              defaultMessage:
                'The skills you are using in this project, which are in our skills roadmap. Helps us track your progress on skills development',
              description:
                'Description for skills input on project submit page',
              id: 'pRi/7+',
            })
          }
          descriptionId={messageId}
          descriptionStyle={descriptionStyle}
          htmlFor={id}
          isLabelHidden={isLabelHidden}
          label={
            label ??
            intl.formatMessage({
              defaultMessage: 'Skills used',
              description: 'Label for projects skills input',
              id: 'Pm4UMA',
            })
          }
          required={required}
        />
        <div
          ref={ref}
          aria-labelledby={id}
          className={clsx(
            'flex justify-between items-center',
            'rounded',
            'px-3 py-1.5',
            'focus:outline-0',
            'ring-1 ring-inset',
            'focus-within:ring-2 focus-within:ring-inset',
            clsx(themeBackgroundElementColor, stateClasses[state]),
          )}
          role={value.length === 0 ? 'button' : undefined}
          tabIndex={0}
          onBlur={onBlur}
          onClick={() => {
            if (value.length > 0) {
              return;
            }
            setShowSkillsRoadmapDialog(true);
          }}>
          {value.length === 0 ? (
            <Text color="placeholder" size="body2">
              <FormattedMessage
                defaultMessage="No skills added"
                description="Placeholder for skills input when no skills are selected"
                id="8tdTMy"
              />
            </Text>
          ) : (
            <ProjectsSkillRoadmapChips
              readonly={false}
              skills={value}
              onDelete={(deletedSkills) => {
                onChange(
                  value.filter((skill) => !deletedSkills.includes(skill)),
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
      {hasError && (
        <div
          className={clsx(
            'flex w-full mt-2',
            errorMessage ? 'justify-between' : 'justify-end',
          )}>
          {errorMessage && (
            <Text color="error" display="block" id={messageId} size="body3">
              {errorMessage}
            </Text>
          )}
        </div>
      )}
      {showSkillsRoadmapDialog && (
        <ProjectsSkillRoadmapSelectionDialog
          defaultSkills={value}
          isShown={showSkillsRoadmapDialog}
          onClose={() => setShowSkillsRoadmapDialog(false)}
          onComplete={(newSkills) => {
            onChange(newSkills);
            setShowSkillsRoadmapDialog(false);
          }}
        />
      )}
    </div>
  );
}

export default forwardRef(ProjectsSkillRoadmapSelectionInput);
