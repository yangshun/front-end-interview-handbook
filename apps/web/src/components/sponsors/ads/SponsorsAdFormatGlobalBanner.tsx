import { RiArrowRightLine } from 'react-icons/ri';

import GlobalBannerShell from '~/components/global/banners/GlobalBannerShell';
import Anchor from '~/components/ui/Anchor';
import { textVariants } from '~/components/ui/Text';
import { themeBackgroundInvertColor } from '~/components/ui/theme';

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
        {text}
        <RiArrowRightLine
          aria-hidden={true}
          className="size-3.5 -mt-0.5 ml-1 inline-flex shrink-0"
        />
      </Anchor>
    </GlobalBannerShell>
  );
}
