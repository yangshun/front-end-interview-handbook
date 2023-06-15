import clsx from 'clsx';
import type { ReactNode } from 'react';

import MarketingSectionTitleLabel from '~/components/marketing/MarketingSectionTitleLabel';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  mode?: 'dark' | 'light';
  sectionLabel?: ReactNode;
  title?: string;
}>;

export default function TextPairing({
  description,
  sectionLabel,
  title,
  mode = 'light',
}: Props) {
  return (
    <div className="grid gap-y-2">
      {sectionLabel && (
        <MarketingSectionTitleLabel>{sectionLabel}</MarketingSectionTitleLabel>
      )}
      <Heading
        className={clsx(
          mode === 'light' && 'text-neutral-900',
          mode === 'dark' && 'text-white',
        )}
        level="heading5">
        {title}
      </Heading>
      {description && (
        <Text
          className={clsx('max-w-3xl leading-6')}
          color="secondary"
          display="block"
          size="body2">
          {description}
        </Text>
      )}
    </div>
  );
}
