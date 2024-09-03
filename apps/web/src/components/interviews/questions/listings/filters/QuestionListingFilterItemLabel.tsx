import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

export default function QuestionListingFilterItemLabel({
  label,
  showInfoIcon = false,
}: Readonly<{
  label: string;
  showInfoIcon?: boolean;
}>) {
  return (
    <Text className="flex items-center gap-2" size="body2" weight="medium">
      {label}{' '}
      {showInfoIcon && (
        <RiInformationLine
          className={clsx('size-4 shrink-0', themeTextSubtleColor)}
        />
      )}
    </Text>
  );
}
