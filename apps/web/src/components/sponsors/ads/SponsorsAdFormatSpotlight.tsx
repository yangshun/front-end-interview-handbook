import clsx from 'clsx';
import {
  RiAdvertisementLine,
  RiArrowRightLine,
  RiMegaphoneLine,
} from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useIntl } from '~/components/intl';
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

export type SponsorsAdFormatSpotlightPlacement =
  | 'nav_mobile'
  | 'nav_sidebar'
  | 'page_header'
  | 'preview'
  | 'side_column';

type Props = Omit<SponsorsAdFormatPayloadSpotlight, 'format'> &
  Readonly<{
    adPlacement: SponsorsAdFormatSpotlightPlacement;
    textWeight?: TextWeight;
    tracking?: boolean;
  }>;

const adFormat = 'SPOTLIGHT';

export default function SponsorsAdFormatSpotlight({
  adPlacement,
  adId,
  text,
  sponsorName,
  url,
  imageUrl,
  tracking = true,
  textWeight = 'normal',
}: Props) {
  const intl = useIntl();

  const ref = useSponsorsAdImpressionLogging<HTMLDivElement>(
    adFormat,
    adId,
    adPlacement,
  );
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
        <Tooltip
          asChild={true}
          label={intl.formatMessage(
            {
              defaultMessage: 'Sponsor: {sponsorName}',
              description: 'Sponsor name',
              id: 'KuqaMi',
            },
            {
              sponsorName,
            },
          )}
          side="bottom">
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
            className={clsx('size-full', 'object-cover', 'rounded-md', [
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
      <div className="flex grow flex-col gap-0.5">
        <Text className={clsx('block')} color="secondary" size="body3">
          {intl.formatMessage({
            defaultMessage: 'Sponsored',
            description: 'Sponsored',
            id: 'Lyx7B0',
          })}
        </Text>
        <Text
          className={clsx(
            'line-clamp-2',
            'inline-block pb-px', // Underline gets cutoff on Firefox, so add a 1px bottom spacing
          )}
          color="subtitle"
          size="body3">
          <Anchor
            className={clsx('relative z-[1]')}
            href={href}
            target="_blank"
            variant="flat"
            weight={textWeight}
            onClick={() => {
              return gtag.event({
                action: 'sponsors.ad.click',
                extra: {
                  ad_format: adFormat,
                  ad_id: adId,
                  ad_placement: adPlacement,
                },
              });
            }}>
            {text}
          </Anchor>{' '}
          <RiArrowRightLine
            aria-hidden={true}
            className="size-3.5 inline-flex shrink-0"
          />
        </Text>
      </div>
      <Anchor
        aria-label={text}
        className="absolute inset-0"
        href={href}
        target="_blank"
        onClick={() => {
          return gtag.event({
            action: 'sponsors.ad.click',
            extra: {
              ad_format: adFormat,
              ad_id: adId,
              ad_placement: adPlacement,
            },
          });
        }}
      />
    </div>
  );
}
