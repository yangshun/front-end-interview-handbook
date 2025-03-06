import clsx from 'clsx';
import {
  RiAdvertisementLine,
  RiArrowRightLine,
  RiMegaphoneLine,
} from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import type { TextWeight } from '~/components/ui/Text';
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
  Readonly<{ textWeight?: TextWeight; tracking?: boolean }>;

export default function SponsorsAdFormatSpotlight({
  adId,
  text,
  sponsorName,
  url,
  imageUrl,
  tracking = true,
  textWeight = 'normal',
}: Props) {
  const ref = useSponsorsAdImpressionLogging<HTMLDivElement>(adId);
  const href = tracking ? sponsorsAdTrackingHref({ adId, url }) : url;

  return (
    <div
      ref={tracking ? ref : undefined}
      className={clsx(
        'flex items-center gap-x-3',
        'w-full',
        'relative isolate',
      )}>
      <div
        className={clsx(
          'relative shrink-0',
          'aspect-[2/1] h-12',
          'flex items-center justify-center',
          'rounded-md',
          themeBackgroundBrandColor,
          'overflow-hidden',
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
      <Text
        className={clsx(
          'line-clamp-3 grow',
          'inline-block pb-px', // Underline gets cutoff on Firefox, so add a 1px bottom spacing
        )}
        color="subtitle"
        size="body3">
        <Anchor
          className={clsx('relative z-[1]')}
          target="_blank"
          variant="flat"
          weight={textWeight}>
          {text}
        </Anchor>{' '}
        <RiArrowRightLine
          aria-hidden={true}
          className="size-3.5 inline-flex shrink-0"
        />
      </Text>
      <Anchor
        aria-label={text}
        className="absolute inset-0"
        href={href}
        target="_blank"
      />
    </div>
  );
}
