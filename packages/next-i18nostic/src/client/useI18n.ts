import { useContext } from 'react';

import type { I18nContextType } from './I18nContext';
import I18nContext from './I18nContext';

export default function useI18n(): I18nContextType {
  return useContext(I18nContext);
}
