import { RiTranslate2 } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';
import { useI18nPathname } from '~/next-i18nostic/src';

export default function SidebarI18nSubMenu() {
  const intl = useIntl();
  const { pathname, locale } = useI18nPathname();

  return (
    <DropdownMenu.Sub
      icon={RiTranslate2}
      label={intl.formatMessage({
        defaultMessage: 'Language',
        description: 'Change site language button label',
        id: '58dfbv',
      })}>
      {i18nLabelOptions.map(({ label, locale: localeItem }) => (
        <DropdownMenu.Item
          key={localeItem}
          href={pathname == null ? undefined : pathname}
          isSelected={locale === localeItem}
          label={label}
          locale={localeItem}
        />
      ))}
    </DropdownMenu.Sub>
  );
}
