import FirstPromoter from '~/components/global/FirstPromoter';
import FullStoryInit from '~/components/global/FullStoryInit';
import GlobalProviders from '~/components/global/GlobalProviders';
import GoogleAnalytics from '~/components/global/GoogleAnalytics';
import HydrationFailureLogging from '~/components/global/HydrationFailureLogging';
import MetaPixel from '~/components/global/MetaPixel';
import MouseflowInit from '~/components/global/MouseflowInit';
import SmartlookInit from '~/components/global/SmartlookInit';
import VercelAnalytics from '~/components/global/VercelAnalytics';

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
          <MouseflowInit countryCode={countryCode} />
          <FullStoryInit countryCode={countryCode} />
        </GlobalProviders>
      </body>
    </html>
  );
}
