import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';

import Text from '../Text';
import { themeTextFaintColor } from '../theme';
import Tooltip from '../Tooltip';

export type LabelDescriptionStyle = 'tooltip' | 'under';

export type Props = Readonly<{
  description?: React.ReactNode;
  descriptionId?: string;
  descriptionStyle?: LabelDescriptionStyle;
  htmlFor?: string;
  isLabelHidden?: boolean;
  label: string;
  required?: boolean;
}>;

export default function Label({
  description,
  descriptionId,
  descriptionStyle = 'under',
  htmlFor,
  isLabelHidden,
  label,
  required,
}: Props) {
  return (
    <div>
      <label
        className={clsx(isLabelHidden ? 'sr-only' : 'flex items-center gap-1')}
        htmlFor={htmlFor}>
        <Text color="subtitle" size="body2" weight="medium">
          {required && (
            <span aria-hidden="true" className="mr-1">
              *
            </span>
          )}
          {label}
        </Text>
        {description && descriptionStyle === 'tooltip' && (
          <Tooltip label={description}>
            <RiInformationLine className={clsx('h-4', themeTextFaintColor)} />
          </Tooltip>
        )}
      </label>
      {!isLabelHidden && description && descriptionStyle === 'under' && (
        <Text
          className="mt-1 block"
          color="secondary"
          id={descriptionId}
          size="body3">
          {description}
        </Text>
      )}
    </div>
  );
}
