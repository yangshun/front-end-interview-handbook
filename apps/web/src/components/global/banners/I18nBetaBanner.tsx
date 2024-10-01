'use client';

import { useIsClient, useLocalStorage } from 'usehooks-ts';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';
import { useI18n } from '~/next-i18nostic/src';

export default function I18nBetaBanner() {
  const isClient = useIsClient();
  const { locale } = useI18n();
  const needToShowBanner =
    i18nLabelOptions.find(({ locale: localeItem }) => localeItem === locale)
      ?.isBeta ?? false;
  const [showBanner, setShowBanner] = useLocalStorage(
    `gfe:i18n:beta:${locale}`,
    needToShowBanner,
  );

  if (!isClient || !showBanner) {
    return null;
  }

  return (
    <div className="z-sticky fixed bottom-0 w-full">
      <Banner
        size="xs"
        onHide={() => {
          setShowBanner(false);
        }}>
        <FormattedMessage
          defaultMessage="Translations for {locale} are in beta and may not be accurate. Do give feedback or <link>contact us</link> if you are interested in helping to translate!"
          description="Banner about beta locale version"
          id="/FyqAR"
          values={{
            link: (chunks) => (
              <Anchor
                className="whitespace-nowrap font-medium"
                href="mailto:contact@greatfrontend.com"
                underline={true}
                variant="flat">
                {chunks}
              </Anchor>
            ),
            locale,
          }}
        />
      </Banner>
    </div>
  );
}
