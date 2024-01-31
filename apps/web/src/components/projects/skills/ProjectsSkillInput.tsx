import clsx from 'clsx';
import { useId } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  isLabelHidden?: boolean;
  label: string;
  required?: boolean;
}>;

export default function ProjectsSkillInput({
  label,
  isLabelHidden,
  required,
  className,
  description,
  descriptionStyle,
}: Props) {
  const intl = useIntl();
  // TODO(projects): do something with this id for a11y
  const id = useId();

  return (
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
          'py-2 px-3 flex justify-between items-center border rounded',
          themeBorderElementColor,
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
        />
      </div>
    </div>
  );
}
