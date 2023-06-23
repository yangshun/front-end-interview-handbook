import clsx from 'clsx';
import type { ReactNode } from 'react';

import { themeTextSecondaryColor } from '~/components/ui/theme';

import Heading from '../ui/Heading';
import Text from '../ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  heading: ReactNode;
  title: ReactNode;
}>;

export default function MarketingSectionHeader({
  title,
  heading,
  description,
}: Props) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3">
        <Text
          className="text-brand-light"
          color="inherit"
          size="body2"
          weight="medium">
          {title}
        </Text>
        <Heading className="text-center" level="heading2">
          {heading}
        </Heading>
      </div>
      {description && (
        <Text
          className={clsx(
            'mx-auto max-w-3xl text-center text-lg md:text-xl',
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
