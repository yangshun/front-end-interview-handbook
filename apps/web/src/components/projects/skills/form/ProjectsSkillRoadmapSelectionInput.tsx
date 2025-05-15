import clsx from 'clsx';
import type { ForwardedRef } from 'react';
import { forwardRef, useId, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import { themeBackgroundInputColor } from '~/components/ui/theme';

import ProjectsSkillRoadmapChips from '../metadata/ProjectsSkillRoadmapChips';
import type { ProjectsSkillKey } from '../types';
import ProjectsSkillRoadmapSelectionDialog from './ProjectsSkillRoadmapSelectionDialog';

type Props = Readonly<{
  challengeDefaultSkills?: ReadonlyArray<ProjectsSkillKey>;
  description: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  footerInfoContent?: React.ReactNode;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: () => void;
  onChange: (value: ReadonlyArray<ProjectsSkillKey>) => void;
  placeholder: string;
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
    challengeDefaultSkills,
    description,
    descriptionStyle = 'tooltip',
    errorMessage,
    footerInfoContent,
    isLabelHidden,
    label,
    onBlur,
    onChange,
    placeholder,
    required,
    value,
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
      <div className={clsx(!isLabelHidden && 'mb-2')}>
        <Label
          description={description}
          descriptionId={messageId}
          descriptionStyle={descriptionStyle}
          htmlFor={id}
          isLabelHidden={isLabelHidden}
          label={label}
          required={required}
        />
      </div>
      <div
        ref={ref}
        aria-labelledby={id}
        className={clsx(
          'flex items-center justify-between',
          'rounded',
          'px-3 py-1.5',
          'focus:outline-0',
          'ring-1 ring-inset',
          'focus-within:ring-2 focus-within:ring-inset',
          clsx(themeBackgroundInputColor, stateClasses[state]),
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
            {placeholder}
          </Text>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <ProjectsSkillRoadmapChips
              readonly={false}
              skills={value}
              onDelete={(deletedSkills) => {
                onChange(
                  value.filter((skill) => !deletedSkills.includes(skill)),
                );
              }}
            />
          </div>
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
      {hasError && (
        <div
          className={clsx(
            'mt-2 flex w-full',
            errorMessage ? 'justify-between' : 'justify-end',
          )}>
          {errorMessage && (
            <Text className="block" color="error" id={messageId} size="body3">
              {errorMessage}
            </Text>
          )}
        </div>
      )}
      {showSkillsRoadmapDialog && (
        <ProjectsSkillRoadmapSelectionDialog
          challengeDefaultSkills={challengeDefaultSkills}
          defaultSkills={value}
          footerInfoContent={footerInfoContent}
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
