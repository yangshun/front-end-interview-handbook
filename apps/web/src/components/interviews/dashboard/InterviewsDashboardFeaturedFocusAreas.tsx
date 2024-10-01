import { useFocusAreas } from '~/data/focus-areas/FocusAreasHooks';

import { useIntl } from '~/components/intl';

import DashboardFocusAreasSection from './InterviewsDashboardFocusAreasSection';

type Props = Readonly<{
  limit?: number;
}>;

export default function InterviewsDashboardFeaturedFocusAreas({
  limit = Infinity,
}: Props) {
  const intl = useIntl();
  const focusAreas = useFocusAreas();
  const areas = [
    focusAreas['async-operations'],
    focusAreas['data-structures-algorithms'],
    focusAreas['design-system-components'],
    focusAreas.lodash,
    focusAreas['dom-manipulation'],
    focusAreas.accessibility,
    focusAreas['javascript-polyfills'],
    focusAreas.forms,
  ].slice(0, limit);

  return (
    <DashboardFocusAreasSection
      description={intl.formatMessage(
        {
          defaultMessage:
            '{number} bite-sized focus areas that collectively cover the key topics required for front end interviews. If you prefer the topical approach, use these lists to systematically approach your preparation.',
          description: 'Tooltip of recommended focus areas',
          id: 'F9Zh+J',
        },
        {
          number: areas.length,
        },
      )}
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
