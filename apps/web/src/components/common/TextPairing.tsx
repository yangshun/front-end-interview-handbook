import clsx from 'clsx';
import type { ReactNode } from 'react';

import MarketingSectionTitleLabel from '~/components/marketing/MarketingSectionTitleLabel';
import type { HeadingLevel } from '~/components/ui/Heading';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

type TextPairingSize = 'lg' | 'md' | 'xl';
type Props = Readonly<{
  description?: ReactNode;
  mode?: 'dark' | 'light';
  sectionLabel?: ReactNode;
  size?: TextPairingSize;
  title?: string;
}>;

const headingMap: Record<TextPairingSize, HeadingLevel> = {
  lg: 'heading4',
  md: 'heading5',
  xl: 'heading3',
};

export default function TextPairing({
  description,
  sectionLabel,
  size = 'md',
  title,
  mode = 'light',
}: Props) {
  return (
    <div className="grid gap-y-2 lg:gap-y-3">
      {sectionLabel && (
        <MarketingSectionTitleLabel>{sectionLabel}</MarketingSectionTitleLabel>
      )}
      <Heading
        className={clsx(
          mode === 'light' && 'text-neutral-900',
          mode === 'dark' && 'text-white',
        )}
        level={headingMap[size]}>
        {title}
      </Heading>
      {description && (
        <Text
          className={clsx(
            'max-w-xl',
            (size === 'md' || size === 'lg') && 'text-sm leading-6',
            mode === 'light' && 'text-neutral-700',
            mode === 'dark' && 'text-neutral-300',
          )}
          color="inherit"
          display="block">
          {description}
        </Text>
      )}
    </div>
  );
}
