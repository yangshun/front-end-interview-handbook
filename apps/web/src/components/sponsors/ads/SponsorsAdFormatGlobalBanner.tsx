import clsx from 'clsx';

import GlobalBannerShell from '~/components/global/banners/GlobalBannerShell';
import Anchor from '~/components/ui/Anchor';
import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundInvertColor,
  themeTextColor,
} from '~/components/ui/theme';

import { sponsorsAdTrackingHref } from './SponsorsAdHref';
import useSponsorsAdImpressionLogging from './useSponsorsAdImpressionLogging';

type Props = Readonly<{
  adId: string;
  isLoading: boolean;
  onHide?: () => void;
  text: string;
  tracking?: boolean;
  url: string;
}>;

export default function SponsorsAdFormatGlobalBanner({
  adId,
  url,
  text,
  isLoading,
  onHide,
  tracking = true,
}: Props) {
  const ref = useSponsorsAdImpressionLogging<HTMLAnchorElement>(adId);

  return (
    <GlobalBannerShell
      className={themeBackgroundInvertColor}
      isLoading={isLoading}
      onHide={onHide}>
      <Anchor
        ref={tracking ? ref : undefined}
        className={textVariants({
          color: 'invert',
          weight: 'medium',
        })}
        href={tracking ? sponsorsAdTrackingHref({ adId, url }) : url}
        target="_blank"
        variant="flat">
        <span
          className={clsx(
            'inline-block',
            themeBackgroundColor,
            'px-1 py-0.5',
            'rounded',
            'text-2xs',
            themeTextColor,
          )}>
          AD
        </span>{' '}
        {text}
      </Anchor>
    </GlobalBannerShell>
  );
}
