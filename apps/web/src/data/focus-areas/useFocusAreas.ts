import { useIntl } from 'react-intl';

import { getFocusAreas } from './FocusAreas';

export default function useFocusAreas() {
  const intl = useIntl();

  return getFocusAreas(intl);
}
