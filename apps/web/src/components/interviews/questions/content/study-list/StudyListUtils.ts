import type { InterviewsStudyList } from 'contentlayer/generated';
import { BiUniversalAccess } from 'react-icons/bi';
import {
  RiDashboardLine,
  RiEye2Line,
  RiFireLine,
  RiFlashlightLine,
  RiFlowChart,
  RiJavascriptFill,
  RiReactjsFill,
  RiRefreshLine,
  RiRocketLine,
  RiStarLine,
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
  'react-hooks': RiReactjsFill,
  'state-management': RiFlowChart,
};

export const StudyPlanIcons: Record<
  string,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  blind75: RiEye2Line,
  gfe75: RiRocketLine,
  'one-month': RiFireLine,
  'one-week': RiFlashlightLine,
  'three-months': RiStarLine,
};

export function createStudyListMapFromArray(
  studyListItems: ReadonlyArray<InterviewsStudyList>,
) {
  return studyListItems.reduce(
    (acc: Record<string, InterviewsStudyList>, item) => {
      acc[item.slug] = item;

      return acc;
    },
    {},
  );
}

export function categorizeFocusAreas(
  intl: IntlShape,
  focusAreas: ReadonlyArray<InterviewsStudyList>,
) {
  const mapFocusAreas = createStudyListMapFromArray(focusAreas);

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
        mapFocusAreas['react-hooks'],
        mapFocusAreas['design-system-components'],
        mapFocusAreas['state-management'],
        mapFocusAreas.accessibility,
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
