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

type Props = Readonly<{
  id: string;
  isLoading: boolean;
  onHide?: () => void;
  text: string;
  url: string;
}>;

export default function SponsorsAdFormatGlobalBanner({
  id,
  url,
  text,
  isLoading,
  onHide,
}: Props) {
  return (
    <GlobalBannerShell
      className={themeBackgroundInvertColor}
      isLoading={isLoading}
      onHide={onHide}>
      <Anchor
        className={textVariants({
          color: 'invert',
          weight: 'medium',
        })}
        href={sponsorsAdTrackingHref({ id, url })}
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
