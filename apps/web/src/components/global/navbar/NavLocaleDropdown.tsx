import { RiTranslate2 } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';
import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

export default function NavLocaleDropdown() {
  const intl = useIntl();
  const { pathname, locale } = useI18nPathname();
  const router = useI18nRouter();

  return (
    <DropdownMenu
      align="end"
      icon={RiTranslate2}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Language',
        description: 'Change site language button label',
        id: '58dfbv',
      })}
      showChevron={false}
      size="sm">
      {i18nLabelOptions.map(({ label, locale: localeItem }) => (
        <DropdownMenu.Item
          key={localeItem}
          isSelected={locale === localeItem}
          label={label}
          onClick={() => {
            if (pathname == null) {
              return;
            }

            router.push(pathname, { locale: localeItem });
          }}
        />
      ))}
    </DropdownMenu>
  );
}
