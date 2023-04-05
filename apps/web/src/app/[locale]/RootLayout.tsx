import GoogleAnalytics from '~/components/global/analytics/GoogleAnalytics';
import HydrationFailureLogging from '~/components/global/analytics/HydrationFailureLogging';
import MetaPixel from '~/components/global/analytics/MetaPixel';
import SentryInit from '~/components/global/analytics/SentryInit';
import VercelAnalytics from '~/components/global/analytics/VercelAnalytics';
import WebVitals from '~/components/global/analytics/WebVitals';
import FirstPromoter from '~/components/global/FirstPromoter';
import GlobalProviders from '~/components/global/GlobalProviders';
import I18nBetaBanner from '~/components/global/I18nBetaBanner';

import type { IntlMessages } from '~/i18n';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
  intlMessages: IntlMessages;
  locale: string;
}>;

export default function RootLayout({ children, intlMessages, locale }: Props) {
  return (
    <html lang={locale}>
      <body>
        <HydrationFailureLogging />
        <GlobalProviders intlMessages={intlMessages} locale={locale}>
          <GoogleAnalytics />
          <MetaPixel />
          <style>{`:root { --navbar-height: 57px; }`}</style>
          {children}
          <VercelAnalytics />
          <FirstPromoter />
          <SentryInit />
          <WebVitals />
          <I18nBetaBanner />
        </GlobalProviders>
      </body>
    </html>
  );
}
