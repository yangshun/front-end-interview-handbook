import type { InterviewsStudyList } from 'contentlayer/generated';

import { useIntl } from '~/components/intl';

import DashboardFocusAreasSection from './InterviewsDashboardFocusAreasSection';
import { mapFocusAreasBySlug } from '../questions/content/study-list/FocusAreas';

type Props = Readonly<{
  focusAreas: ReadonlyArray<InterviewsStudyList>;
  limit?: number;
}>;

export default function InterviewsDashboardFeaturedFocusAreas({
  limit = Infinity,
  focusAreas,
}: Props) {
  const intl = useIntl();
  const mapFocusAreas = mapFocusAreasBySlug(focusAreas);
  const areas = [
    mapFocusAreas['async-operations'],
    mapFocusAreas['data-structures-algorithms'],
    mapFocusAreas['design-system-components'],
    mapFocusAreas.lodash,
    mapFocusAreas['dom-manipulation'],
    mapFocusAreas.accessibility,
    mapFocusAreas['javascript-polyfills'],
    mapFocusAreas.forms,
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
