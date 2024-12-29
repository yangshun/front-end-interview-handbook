import clsx from 'clsx';
import nextI18nConfig from 'next-i18nostic/config';

import GoogleAnalytics from '~/components/global/analytics/GoogleAnalytics';
import HydrationFailureLogging from '~/components/global/analytics/HydrationFailureLogging';
import MetaPixel from '~/components/global/analytics/MetaPixel';
import GlobalBannerDisplayScript from '~/components/global/banners/GlobalBannerDisplayScript';
import I18nBetaBanner from '~/components/global/banners/I18nBetaBanner';
import ColorSchemeInitScript from '~/components/global/color-scheme/ColorSchemeInitScript';
import FirstPromoter from '~/components/global/FirstPromoter';
import GlobalProviders from '~/components/global/GlobalProviders';
import { Toaster } from '~/components/global/toasts/Toaster';
import { themeBackgroundColor } from '~/components/ui/theme';
import SandpackCSS from '~/components/workspace/common/sandpack/SandpackCSS';

import type { IntlMessages } from '~/i18n';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
  intlMessages: IntlMessages;
  locale: string;
}>;

export default function RootLayout({ children, intlMessages, locale }: Props) {
  return (
    <html
      lang={locale.split('-')[0]}
      suppressHydrationWarning={true}
      // So that browsers don't offer translations for a supported locale.
      translate={nextI18nConfig.locales.includes(locale) ? 'no' : undefined}>
      <head>
        {/* Important to inject in head to get it to run as early as possible. */}
        <ColorSchemeInitScript />
        <GlobalBannerDisplayScript />
        <SandpackCSS />
      </head>
      <body className={clsx('antialiased', themeBackgroundColor)}>
        <HydrationFailureLogging />
        <GlobalProviders intlMessages={intlMessages} locale={locale}>
          <GoogleAnalytics />
          <MetaPixel />
          {children}
          <FirstPromoter />
          <I18nBetaBanner />
          <Toaster />
        </GlobalProviders>
      </body>
    </html>
  );
}
