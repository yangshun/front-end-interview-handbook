import clsx from 'clsx';
import { RiAdvertisementLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import type { TextSize } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBorderColor,
} from '~/components/ui/theme';

import type { SponsorsAdFormatPayloadInContent } from '../SponsorsTypes';

export type SponsorsAdFormatInContentSize = 'md' | 'sm';

const sizeToTitle: Record<SponsorsAdFormatInContentSize, TextSize> = {
  md: 'body0',
  sm: 'body1',
};

export default function SponsorsAdFormatInContent({
  title,
  url,
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
        {imageUrl ? (
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
        ) : (
          <div
            className={clsx(
              'aspect-[2/1] rounded-lg',
              'flex items-center justify-center',
              themeBackgroundBrandColor,
            )}>
            <RiAdvertisementLine
              aria-hidden={true}
              className={clsx('size-16', 'text-neutral-700')}
            />
          </div>
        )}
        <Text className="mt-2 block" color="secondary" size="body3">
          Sponsor:{' '}
          <Anchor
            className={textVariants({ color: 'active' })}
            href={url}
            variant="flat"
            weight="medium">
            {sponsorName}
          </Anchor>
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
