import clsx from 'clsx';
import type { ReactNode } from 'react';

import Heading from '../ui/Heading';
import Text from '../ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  heading: ReactNode;
  title?: ReactNode;
}>;

export default function MarketingSectionHeader({
  description,
  heading,
  title,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3">
        {title && (
          <Text
            className="text-pretty block text-center"
            color="active"
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
            'block',
            'mx-auto',
            'text-balance text-center text-base lg:text-xl',
          )}
          color="secondary">
          {description}
        </Text>
      )}
    </div>
  );
}
