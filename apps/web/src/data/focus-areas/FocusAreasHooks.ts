import { useIntl } from '~/components/intl';

import { getFocusAreas_DEPRECATED } from './FocusAreas';

/**
 * @deprecated
 */
export function useFocusAreas_DEPRECATED() {
  const intl = useIntl();

  return getFocusAreas_DEPRECATED(intl);
}
