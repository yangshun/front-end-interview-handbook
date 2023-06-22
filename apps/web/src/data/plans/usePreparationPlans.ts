import { useIntl } from 'react-intl';

import { getPreparationPlans } from './PreparationPlans';

export default function usePreparationPlans() {
  const intl = useIntl();

  return getPreparationPlans(intl);
}
