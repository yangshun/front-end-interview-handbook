import clsx from 'clsx';
import React from 'react';

import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

type Props = Readonly<{
  count: string;
  label: string;
}>;

function CountdownCard({ count, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 px-2">
      <div
        className={clsx(
          'grid place-items-center rounded-lg',
          'w-20 sm:w-24',
          'p-4 sm:p-6',
          themeGlassyBorder,
        )}>
        <Heading level="heading3">{count}</Heading>
      </div>
      <Text size="body0" weight="medium">
        {label}
      </Text>
    </div>
  );
}

export default CountdownCard;
