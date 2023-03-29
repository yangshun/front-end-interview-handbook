import FullStoryInit from '~/components/global/analytics/FullStoryInit';
import GoogleAnalytics from '~/components/global/analytics/GoogleAnalytics';
import HydrationFailureLogging from '~/components/global/analytics/HydrationFailureLogging';
import MetaPixel from '~/components/global/analytics/MetaPixel';
import SentryInit from '~/components/global/analytics/SentryInit';
import SmartlookInit from '~/components/global/analytics/SmartlookInit';
import VercelAnalytics from '~/components/global/analytics/VercelAnalytics';
import FirstPromoter from '~/components/global/FirstPromoter';
import GlobalProviders from '~/components/global/GlobalProviders';

import type { IntlMessages } from '~/i18n';

import '~/styles/globals.css';

type Props = Readonly<{
  children: React.ReactNode;
  countryCode: string;
  intlMessages: IntlMessages;
  locale: string;
}>;

export default function RootLayout({
  children,
  countryCode,
  intlMessages,
  locale,
}: Props) {
  return (
    <html lang={locale}>
      <body>
        <HydrationFailureLogging countryCode={countryCode} />
        <GlobalProviders
          countryCode={countryCode}
          intlMessages={intlMessages}
          locale={locale}>
          <GoogleAnalytics />
          <MetaPixel />
          <style>{`:root { --navbar-height: 57px; }`}</style>
          {children}
          <VercelAnalytics />
          <FirstPromoter />
          <SmartlookInit countryCode={countryCode} />
          <FullStoryInit countryCode={countryCode} />
          <SentryInit countryCode={countryCode} />
        </GlobalProviders>
      </body>
    </html>
  );
}
