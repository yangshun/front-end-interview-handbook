import FirstPromoter from '~/components/global/FirstPromoter';
import GlobalProviders from '~/components/global/GlobalProviders';
import GoogleAnalytics from '~/components/global/GoogleAnalytics';
import MetaPixel from '~/components/global/MetaPixel';
import Mouseflow from '~/components/global/Mouseflow';
import SmartLook from '~/components/global/SmartLook';

import type { IntlMessages } from '~/i18n';

import '~/styles/globals.css';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

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
          <SmartLook countryCode={countryCode} />
          <Mouseflow countryCode={countryCode} />
        </GlobalProviders>
      </body>
    </html>
  );
}
