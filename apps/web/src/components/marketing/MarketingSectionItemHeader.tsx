import type { ReactNode } from 'react';

import Heading from '../ui/Heading';
import Text from '../ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  heading: ReactNode;
  title?: ReactNode;
}>;

export default function MarketingSectionItemHeader({
  description,
  heading,
  title,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3">
        {title && (
          <Text className="block" color="active" size="body2" weight="medium">
            {title}
          </Text>
        )}
        <Heading level="heading3">{heading}</Heading>
      </div>
      {description && (
        <Text className="block text-base lg:text-xl" color="secondary">
          {description}
        </Text>
      )}
    </div>
  );
}
