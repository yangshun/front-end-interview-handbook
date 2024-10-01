import { useIntl } from '~/components/intl';

import type { FocusAreaType } from './FocusAreas';
import { getFocusArea } from './FocusAreas';
import { getFocusAreas } from './FocusAreas';

export function useFocusAreas() {
  const intl = useIntl();

  return getFocusAreas(intl);
}

export function useFocusArea(focusArea: FocusAreaType) {
  const intl = useIntl();

  return getFocusArea(focusArea, intl);
}
