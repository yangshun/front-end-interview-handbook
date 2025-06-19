import { RiTranslate2 } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';
import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  type: 'menu' | 'submenu';
}>;

export default function SidebarI18nSubMenu({ type }: Props) {
  const intl = useIntl();
  const { locale, pathname } = useI18nPathname();

  const DropdownElement = type === 'menu' ? DropdownMenu : DropdownMenu.Sub;

  return (
    <DropdownElement
      icon={RiTranslate2}
      isLabelHidden={type === 'menu'}
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
    </DropdownElement>
  );
}
