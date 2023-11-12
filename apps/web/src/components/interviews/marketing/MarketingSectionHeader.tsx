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

export default function MarketingSectionHeader({
  title,
  heading,
  description,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3">
        {title && (
          <Text
            className="text-center"
            color="active"
            display="block"
            size="body2"
            weight="medium">
            {title}
          </Text>
        )}
        <Heading className="text-center" level="heading2">
          {heading}
        </Heading>
      </div>
      {description && (
        <Text
          className={clsx(
            'mx-auto text-center text-base lg:text-xl',
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
