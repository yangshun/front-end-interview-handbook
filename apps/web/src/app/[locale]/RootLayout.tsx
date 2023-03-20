import FirstPromoter from '~/components/global/FirstPromoter';
import GlobalProviders from '~/components/global/GlobalProviders';
import GoogleAnalytics from '~/components/global/GoogleAnalytics';

import type { IntlMessages } from '~/i18n';

import '~/styles/globals.css';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

type Props = Readonly<{
  children: React.ReactNode;
  intlMessages: IntlMessages;
  locale: string;
}>;

export default function RootLayout({ children, intlMessages, locale }: Props) {
  return (
    <html lang={locale}>
      <body>
        <GlobalProviders intlMessages={intlMessages} locale={locale}>
          <GoogleAnalytics />
          <style>{`:root { --navbar-height: 57px; }`}</style>
          {children}
          <VercelAnalytics />
          <FirstPromoter />
        </GlobalProviders>
      </body>
    </html>
  );
}
