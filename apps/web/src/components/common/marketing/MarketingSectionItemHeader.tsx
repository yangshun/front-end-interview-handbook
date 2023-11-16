import clsx from 'clsx';
import type { ReactNode } from 'react';

import { themeTextSecondaryColor } from '~/components/ui/theme';

import Heading from '../../ui/Heading';
import Text from '../../ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  heading: ReactNode;
  title?: ReactNode;
}>;

export default function MarketingSectionItemHeader({
  title,
  heading,
  description,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3">
        {title && (
          <Text color="active" display="block" size="body2" weight="medium">
            {title}
          </Text>
        )}
        <Heading level="heading3">
          {heading}
        </Heading>
      </div>
      {description && (
        <Text
          className={clsx(
            'text-base lg:text-xl',
            themeTextSecondaryColor,
          )}
          display="block"
          size="custom">
          {description}
        </Text>
      )}
    </div>
  );
}
