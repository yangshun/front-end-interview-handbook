import { useEffect, useState } from 'react';

import Select from '~/components/ui/Select';

export default function ProductThemeSelect() {
  const [theme, setTheme] = useState('interviews');

  function onChange(value: string) {
    setTheme(value);
  }

  useEffect(() => {
    document.body.dataset.theme = theme;

    return () => {
      delete document.body.dataset.theme;
    };
  }, [theme]);

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
