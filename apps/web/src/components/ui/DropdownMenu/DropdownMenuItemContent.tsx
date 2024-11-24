import clsx from 'clsx';
import { RiArrowRightSLine } from 'react-icons/ri';

import type { TextColor } from '../Text';
import Text from '../Text';
import { themeTextSubtleColor } from '../theme';

type Props = Readonly<{
  color?: TextColor;
  endAddOn?: React.ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isSelected?: boolean;
  label: React.ReactNode;
  usage?: 'item' | 'trigger';
}>;

export default function DropdownMenuItemContent({
  color,
  endAddOn,
  icon: Icon,
  isSelected = false,
  label,
  usage = 'item',
}: Props) {
  return (
    <Text
      className="flex grow items-center gap-x-2"
      color={isSelected ? 'active' : color ?? 'secondary'}
      size="body2"
      weight={isSelected ? 'medium' : undefined}>
      {Icon && (
        <Icon
          className={clsx(
            'size-4 shrink-0',
            isSelected || color != null ? '' : themeTextSubtleColor,
          )}
        />
      )}
      {label}
      {endAddOn}
      {usage === 'trigger' && (
        <RiArrowRightSLine className="size-4 ml-auto shrink-0" />
      )}
    </Text>
  );
}
