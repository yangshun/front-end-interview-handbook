import { RiTranslate2 } from 'react-icons/ri';
import url from 'url';

import { mergeWithCurrentURL } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';
import { i18nHref, useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  type: 'menu' | 'submenu';
}>;

export default function SidebarI18nSubMenu({ type }: Props) {
  const intl = useIntl();
  const { pathname, locale } = useI18nPathname();

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
          href={
            pathname == null
              ? undefined
              : mergeWithCurrentURL(url.format(i18nHref(pathname, localeItem)))
          }
          isSelected={locale === localeItem}
          label={label}
          locale={localeItem}
          refresh={true}
        />
      ))}
    </DropdownElement>
  );
}
