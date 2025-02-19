import clsx from 'clsx';
import { RiMegaphoneLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardNoAlphaColor,
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { SponsorsAdPlacementPayloadSpotlight } from '../SponsorsTypes';

export default function SponsorsAdPlacementInContent({
  text,
  sponsorName,
  url,
  imageUrl,
}: Omit<SponsorsAdPlacementPayloadSpotlight, 'placement'>) {
  return (
    <div
      className={clsx('flex items-center gap-4', 'w-full', 'relative isolate')}>
      <div className={clsx('relative shrink-0', 'aspect-[2/1] h-12')}>
        <Tooltip asChild={true} label={`Sponsor: ${sponsorName}`} side="bottom">
          <div
            className={clsx(
              'z-[1]',
              'absolute bottom-1 right-1',
              'rounded',
              'flex items-center justify-center',
              'size-3',
              themeBackgroundCardNoAlphaColor,
            )}>
            <RiMegaphoneLine
              className={clsx('size-2', themeTextSecondaryColor)}
            />
          </div>
        </Tooltip>
        <img
          alt={text}
          className={clsx('size-full rounded', 'object-cover', [
            'border',
            themeBorderColor,
          ])}
          src={imageUrl}
        />
      </div>
      <Text className="line-clamp-3 grow" size="body3">
        {text}
      </Text>
      <Anchor aria-label={text} className="absolute inset-0" href={url} />
    </div>
  );
}
