import { themeGradientGreenYellow } from '~/components/ui/theme';

import GlobalBanner from './GlobalBanner';

export function GlobalBannerProjects() {
  return (
    <GlobalBanner
      className={themeGradientGreenYellow.className}
      variant="custom"
    />
  );
}
