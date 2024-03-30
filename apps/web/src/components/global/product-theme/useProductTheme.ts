import { useEffect } from 'react';

import {
  type ProductTheme,
  setProductTheme,
  unsetProductTheme,
} from './ProductThemeManager';

export default function useProductTheme(theme: ProductTheme) {
  useEffect(() => {
    setProductTheme(theme);

    return () => {
      unsetProductTheme();
    };
  }, [theme]);
}
