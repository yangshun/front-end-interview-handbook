import { RiTranslate2 } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';
import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  showSelected?: boolean;
  size?: 'md' | 'sm' | 'xs';
}>;

export default function NavI18nDropdown({ size, showSelected }: Props) {
  const intl = useIntl();
  const { pathname, locale } = useI18nPathname();

  const selectedLocale = i18nLabelOptions.find(
    (item) => item.locale === (locale ?? 'en-US'),
  );

  const showLabel = showSelected && !!selectedLocale;

  return (
    <DropdownMenu
      align="end"
      icon={showLabel ? undefined : RiTranslate2}
      isLabelHidden={!showLabel}
      label={
        showLabel
          ? selectedLocale?.label ?? ''
          : intl.formatMessage({
              defaultMessage: 'Language',
              description: 'Change site language button label',
              id: '58dfbv',
            })
      }
      showChevron={showLabel}
      size={size}
      tooltip={intl.formatMessage({
        defaultMessage: 'Language',
        description: 'Tooltip for language selector',
        id: 'G+S25i',
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
    </DropdownMenu>
  );
}
