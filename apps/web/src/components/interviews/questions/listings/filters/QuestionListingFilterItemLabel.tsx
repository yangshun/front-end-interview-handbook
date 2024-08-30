import clsx from 'clsx';
import type { ReactNode } from 'react';
import { RiInformationLine } from 'react-icons/ri';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

export default function QuestionListingFilterItemLabel({
  label,
  tooltip,
}: Readonly<{
  label: string;
  tooltip?: ReactNode;
}>) {
  return (
    <Text className="flex items-center gap-2" size="body2" weight="medium">
      {label}{' '}
      {tooltip && (
        <Tooltip label={tooltip}>
          <RiInformationLine
            className={clsx('size-4 shrink-0', themeTextSubtleColor)}
          />
        </Tooltip>
      )}
    </Text>
  );
}
