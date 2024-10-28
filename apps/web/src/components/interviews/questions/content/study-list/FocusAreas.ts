import type { InterviewsStudyList } from 'contentlayer/generated';
import { BiUniversalAccess } from 'react-icons/bi';
import {
  RiDashboardLine,
  RiFlowChart,
  RiJavascriptFill,
  RiRefreshLine,
  RiWindowFill,
} from 'react-icons/ri';
import { SiLodash } from 'react-icons/si';
import { TbBinaryTree, TbForms } from 'react-icons/tb';
import type { IntlShape } from 'react-intl';

export const FocusAreaIcons: Record<
  string,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  accessibility: BiUniversalAccess,
  'async-operations': RiRefreshLine,
  'data-structures-algorithms': TbBinaryTree,
  'design-system-components': RiDashboardLine,
  'dom-manipulation': RiWindowFill,
  forms: TbForms,
  'javascript-polyfills': RiJavascriptFill,
  lodash: SiLodash,
  'state-management': RiFlowChart,
};

export function mapFocusAreasBySlug(
  focusAreas: ReadonlyArray<InterviewsStudyList>,
) {
  return focusAreas.reduce((acc: Record<string, InterviewsStudyList>, item) => {
    acc[item.slug] = item;

    return acc;
  }, {});
}

export function categorizeFocusAreas(
  intl: IntlShape,
  focusAreas: ReadonlyArray<InterviewsStudyList>,
) {
  const mapFocusAreas = mapFocusAreasBySlug(focusAreas);

  return [
    {
      items: [
        mapFocusAreas['javascript-polyfills'],
        mapFocusAreas['async-operations'],
        mapFocusAreas.lodash,
      ],
      title: intl.formatMessage({
        defaultMessage: 'JavaScript Engineering',
        description: 'Title for focus area type',
        id: 'er249T',
      }),
    },
    {
      items: [
        mapFocusAreas['dom-manipulation'],
        mapFocusAreas.forms,
        mapFocusAreas['design-system-components'],
        mapFocusAreas.accessibility,
        mapFocusAreas['state-management'],
      ],
      title: intl.formatMessage({
        defaultMessage: 'User Interface Development',
        description: 'Title for focus area type',
        id: '2M6LN4',
      }),
    },
    {
      items: [mapFocusAreas['data-structures-algorithms']],
      title: intl.formatMessage({
        defaultMessage: 'Computer Science Foundations',
        description: 'Title for focus area type',
        id: 'L7w0Ka',
      }),
    },
  ];
}
