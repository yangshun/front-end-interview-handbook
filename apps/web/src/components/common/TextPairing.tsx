import clsx from 'clsx';
import type { ReactNode } from 'react';

import MarketingSectionTitleLabel from '~/components/interviews/marketing/MarketingSectionTitleLabel';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  description?: ReactNode;
  sectionLabel?: ReactNode;
  title?: string;
  titleAddOnText?: string;
}>;

export default function TextPairing({
  description,
  sectionLabel,
  title,
  titleAddOnText,
}: Props) {
  return (
    <div className="flex flex-col gap-y-1">
      {sectionLabel && (
        <MarketingSectionTitleLabel>{sectionLabel}</MarketingSectionTitleLabel>
      )}
      <Heading className={clsx('flex items-center gap-4')} level="heading6">
        {title}
        {titleAddOnText && (
          <Badge label={titleAddOnText} size="sm" variant="neutral" />
        )}
      </Heading>
      {description && (
        <Text
          className={clsx('max-w-3xl')}
          color="secondary"
          display="block"
          size="body2">
          {description}
        </Text>
      )}
    </div>
  );
}
