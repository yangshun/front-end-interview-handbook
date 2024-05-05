import GlobalBanner from '~/components/global/banners/GlobalBanner';
import { themeGradientPurple } from '~/components/ui/theme';

export function GlobalBannerInterviews() {
  return (
    <GlobalBanner
      className={themeGradientPurple.className}
      rotateMessages={true}
      variant="custom"
    />
  );
}
