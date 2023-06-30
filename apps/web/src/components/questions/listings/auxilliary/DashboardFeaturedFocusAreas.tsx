import { useIntl } from 'react-intl';

import { useFocusAreas } from '~/data/focus-areas/FocusAreasHooks';

import QuestionFocusAreasSection from '../../dashboard/QuestionFocusAreasSection';

type Props = Readonly<{
  limit?: number;
}>;

export default function DashboardFeaturedFocusAreas({
  limit = Infinity,
}: Props) {
  const intl = useIntl();
  const focusAreas = useFocusAreas();
  const areas = [
    focusAreas['data-structures-algorithms'],
    focusAreas['async-operations'],
    focusAreas['design-system-components'],
    focusAreas.lodash,
    focusAreas['dom-manipulation'],
    focusAreas.accessibility,
    focusAreas['javascript-polyfills'],
    focusAreas.forms,
  ].slice(0, limit);

  return (
    <QuestionFocusAreasSection
      description={intl.formatMessage({
        defaultMessage: 'These focus areas are relevant to interviews',
        description: 'Tooltip of recommended focus areas',
        id: 'CZYeMZ',
      })}
      focusAreas={areas}
      title={intl.formatMessage({
        defaultMessage: 'Recommended focus areas',
        description:
          'Title of recommended focus areas section on preparation page',
        id: 'F+dxo7',
      })}
    />
  );
}
