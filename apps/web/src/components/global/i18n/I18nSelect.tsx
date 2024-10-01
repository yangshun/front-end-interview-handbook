import { useIntl } from '~/components/intl';
import type { SelectDisplay } from '~/components/ui/Select';
import Select from '~/components/ui/Select';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';

type Props = Readonly<{
  display?: SelectDisplay;
  locale: string;
  onChange: (newLocale: string) => void;
}>;

export default function I18nSelect({ display, locale, onChange }: Props) {
  const intl = useIntl();

  return (
    <Select
      display={display}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Language',
        description: 'Change site language button label',
        id: '58dfbv',
      })}
      options={i18nLabelOptions.map(({ label, locale: localeValue }) => ({
        label,
        value: localeValue,
      }))}
      size="sm"
      value={locale}
      onChange={onChange}
    />
  );
}
