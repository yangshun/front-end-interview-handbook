import clsx from 'clsx';
import { RiAdvertisementLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import type { TextSize } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundBrandColor,
  themeBackgroundColor,
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
  external,
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
  const href =
    external && tracking ? sponsorsAdTrackingHref({ adId, url }) : url;

  const isRichTextValue = isLexicalEditorValue(body);

  function linkClick() {
    gtag.event({
      action: 'sponsors.ad.click',
      extra: {
        ad_format: adFormat,
        ad_id: adId,
        ad_placement: adPlacement,
      },
    });
  }

  return (
    <div ref={tracking ? ref : undefined} className="w-full">
      <div>
        {imageUrl ? (
          <Anchor
            href={href}
            target="_blank"
            variant="unstyled"
            onClick={linkClick}>
            <img
              alt={title}
              className={clsx(
                'aspect-[2/1] w-full object-cover',
                themeBackgroundColor,
                'rounded-lg',
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
          <FormattedMessage
            defaultMessage="Sponsor: <link>{sponsorName}</link>"
            description="Sponsor link"
            id="GC0CwH"
            values={{
              link: (chunks) => (
                <Anchor
                  className={textVariants({ color: 'active' })}
                  href={href}
                  target="_blank"
                  variant="flatUnderline"
                  weight="medium"
                  onClick={linkClick}>
                  {chunks}
                </Anchor>
              ),
              sponsorName,
            }}
          />
        </Text>
      </div>
      <Text className="mt-6 block" size={sizeToTitle[size]} weight="bold">
        {title}
      </Text>
      <div className="mt-3">
        {isRichTextValue ? (
          <SponsorsAdFormatInContentBodyRenderer
            key={body}
            adId={adId}
            size="sm"
            tracking={tracking}
            value={body}
          />
        ) : (
          <Text className="block" color="secondary" size="body2">
            {body}
          </Text>
        )}
      </div>
    </div>
  );
}
