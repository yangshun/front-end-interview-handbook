import clsx from 'clsx';
import { RiAdvertisementLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import Anchor from '~/components/ui/Anchor';
import type { TextSize } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBorderColor,
} from '~/components/ui/theme';

import SponsorsAdFormatInContentBodyRenderer from './SponsorsAdFormatInContentBodyRenderer';
import { sponsorsAdTrackingHref } from './SponsorsAdHref';
import useSponsorsAdImpressionLogging from './useSponsorsAdImpressionLogging';
import type { SponsorsAdFormatPayloadInContent } from '../SponsorsTypes';

export type SponsorsAdFormatInContentSize = 'md' | 'sm';

const sizeToTitle: Record<SponsorsAdFormatInContentSize, TextSize> = {
  md: 'body0',
  sm: 'body1',
};

function isLexicalEditorValue(value: string) {
  if (!value) {
    return false;
  }

  try {
    const parsed = JSON.parse(value);

    // Check if it follows the Lexical editor format
    return typeof parsed === 'object';
  } catch (err) {
    // If JSON parsing fails, it's a normal string
    return false;
  }
}

export type SponsorsAdFormatInContentPlacement =
  | 'guide'
  | 'preview'
  | 'questions_js'
  | 'questions_quiz'
  | 'questions_system_design'
  | 'questions_ui';

type Props = Omit<SponsorsAdFormatPayloadInContent, 'format'> &
  Readonly<{
    adPlacement: SponsorsAdFormatInContentPlacement;
    size: SponsorsAdFormatInContentSize;
    tracking?: boolean;
  }>;

const adFormat = 'IN_CONTENT';

export default function SponsorsAdFormatInContent({
  adPlacement,
  adId,
  title,
  url,
  body,
  sponsorName,
  imageUrl,
  size,
  tracking = true,
}: Props) {
  const ref = useSponsorsAdImpressionLogging<HTMLDivElement>(
    adFormat,
    adId,
    adPlacement,
  );
  const href = tracking ? sponsorsAdTrackingHref({ adId, url }) : url;

  const isRichTextValue = isLexicalEditorValue(body);

  return (
    <div ref={tracking ? ref : undefined} className="w-full">
      <div>
        {imageUrl ? (
          <Anchor
            href={href}
            variant="unstyled"
            onClick={() =>
              gtag.event({
                action: 'sponsors.ad.click',
                extra: {
                  ad_format: adFormat,
                  ad_id: adId,
                  ad_placement: adPlacement,
                },
              })
            }>
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
          </Anchor>
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
            href={href}
            target="_blank"
            variant="flatUnderline"
            weight="medium"
            onClick={() =>
              gtag.event({
                action: 'sponsors.ad.click',
                extra: {
                  ad_format: adFormat,
                  ad_id: adId,
                  ad_placement: adPlacement,
                },
              })
            }>
            {sponsorName}
          </Anchor>
        </Text>
      </div>
      <Text className="mt-6 block" size={sizeToTitle[size]} weight="bold">
        {title}
      </Text>
      {isRichTextValue ? (
        <SponsorsAdFormatInContentBodyRenderer
          key={body}
          adId={adId}
          size="sm"
          tracking={tracking}
          value={body}
        />
      ) : (
        <Text className="mt-3 block" color="secondary" size="body3">
          {body}
        </Text>
      )}
    </div>
  );
}
