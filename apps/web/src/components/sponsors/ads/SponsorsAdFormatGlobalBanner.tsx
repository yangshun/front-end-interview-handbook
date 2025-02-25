import clsx from 'clsx';

import GlobalBannerShell from '~/components/global/banners/GlobalBannerShell';
import Anchor from '~/components/ui/Anchor';
import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBackgroundInvertColor,
  themeTextColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  isLoading: boolean;
  onHide?: () => void;
  text: string;
  url: string;
}>;

export default function SponsorsAdFormatGlobalBanner({
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
        href={url}
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
