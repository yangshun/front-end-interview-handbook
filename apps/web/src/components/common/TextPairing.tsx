import clsx from 'clsx';
import type { ReactNode } from 'react';

import MarketingSectionTitleLabel from '~/components/marketing/MarketingSectionTitleLabel';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  mode?: 'dark' | 'light';
  sectionLabel?: ReactNode;
  title?: string;
  titleAddOnText?: string;
}>;

export default function TextPairing({
  description,
  mode = 'light',
  sectionLabel,
  title,
  titleAddOnText,
}: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      {sectionLabel && (
        <MarketingSectionTitleLabel>{sectionLabel}</MarketingSectionTitleLabel>
      )}
      <Heading
        className={clsx(
          'flex items-center gap-4',
          mode === 'light' && 'text-neutral-900',
          mode === 'dark' && 'text-white',
        )}
        level="heading5">
        {title}
        {titleAddOnText && (
          <Badge label={titleAddOnText} size="sm" variant="neutral" />
        )}
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
