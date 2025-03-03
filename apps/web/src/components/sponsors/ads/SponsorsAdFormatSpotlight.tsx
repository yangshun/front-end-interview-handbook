import clsx from 'clsx';
import { RiAdvertisementLine, RiMegaphoneLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBackgroundCardNoAlphaColor,
  themeBorderColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { sponsorsAdTrackingHref } from './SponsorsAdHref';
import useSponsorsAdImpressionLogging from './useSponsorsAdImpressionLogging';
import type { SponsorsAdFormatPayloadSpotlight } from '../SponsorsTypes';

type Props = Omit<SponsorsAdFormatPayloadSpotlight, 'format'> &
  Readonly<{ tracking?: boolean }>;

export default function SponsorsAdFormatSpotlight({
  adId,
  text,
  sponsorName,
  url,
  imageUrl,
  tracking = true,
}: Props) {
  const ref = useSponsorsAdImpressionLogging<HTMLAnchorElement>(adId);

  return (
    <Anchor
      ref={tracking ? ref : undefined}
      className={clsx(
        'flex items-center gap-x-3',
        'w-full',
        'relative isolate',
      )}
      href={tracking ? sponsorsAdTrackingHref({ adId, url }) : url}
      target="blank"
      variant="flat">
      <div
        className={clsx(
          'relative shrink-0',
          'aspect-[2/1] h-12',
          'rounded',
          'flex items-center justify-center',
          themeBackgroundBrandColor,
        )}>
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
        {imageUrl ? (
          <img
            alt={text}
            className={clsx('size-full', 'object-cover', [
              'border',
              themeBorderColor,
            ])}
            src={imageUrl}
          />
        ) : (
          <RiAdvertisementLine
            aria-hidden={true}
            className={clsx('size-6', 'text-neutral-700')}
          />
        )}
      </div>
      <Text className="line-clamp-3 grow" color="subtitle" size="body3">
        {text}
      </Text>
    </Anchor>
  );
}
