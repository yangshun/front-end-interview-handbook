import { useState } from 'react';

import type { ProductTheme } from '~/components/global/product-theme/ProductThemeManager';
import useProductTheme from '~/components/global/product-theme/useProductTheme';
import Select from '~/components/ui/Select';

export default function ProductThemeSelect() {
  const [theme, setTheme] = useState<ProductTheme>(
    (typeof window !== 'undefined'
      ? (document.body.dataset.theme as ProductTheme)
      : null) ?? 'interviews',
  );

  useProductTheme(theme);

  function onChange(value: ProductTheme) {
    setTheme(value);
  }

  return (
    <Select
      isLabelHidden={true}
      label="Theme"
      options={[
        {
          label: 'Interviews',
          value: 'interviews',
        },
        {
          label: 'Projects',
          value: 'projects',
        },
      ]}
      size="sm"
      value={theme}
      onChange={onChange}
    />
  );
}
