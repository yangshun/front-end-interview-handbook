import clsx from 'clsx';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import { themeBorderColor } from '~/components/ui/theme';

import type { SponsorsAdFormatPayloadInContent } from '../SponsorsTypes';

export type SponsorsAdFormatInContentSize = 'md' | 'sm';

const sizeToTitle: Record<SponsorsAdFormatInContentSize, TextSize> = {
  md: 'body0',
  sm: 'body1',
};

export default function SponsorsAdFormatInContent({
  title,
  body,
  sponsorName,
  imageUrl,
  size,
}: Omit<SponsorsAdFormatPayloadInContent, 'format'> &
  Readonly<{
    size: SponsorsAdFormatInContentSize;
  }>) {
  return (
    <div>
      <div>
        <img
          alt={title}
          className={clsx(
            'aspect-[2/1] rounded-lg',
            'object-cover',
            'border',
            themeBorderColor,
          )}
          src={imageUrl}
        />
        <Text className="mt-2 block" color="secondary" size="body3">
          Sponsor:{' '}
          <Text color="active" weight="medium">
            {sponsorName}
          </Text>
        </Text>
      </div>
      <Text className="mt-6 block" size={sizeToTitle[size]} weight="bold">
        {title}
      </Text>
      <Text className="mt-3 block" color="secondary" size="body3">
        {body}
      </Text>
    </div>
  );
}
