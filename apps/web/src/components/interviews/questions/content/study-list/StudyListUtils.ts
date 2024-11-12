import type { InterviewsStudyList } from 'contentlayer/generated';
import { BiUniversalAccess } from 'react-icons/bi';
import {
  RiDashboardLine,
  RiEye2Line,
  RiFireLine,
  RiFlashlightLine,
  RiFlowChart,
  RiJavascriptFill,
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
  'state-management': RiFlowChart,
};

export const StudyPlanIcons: Record<
  string,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  blind75: RiEye2Line,
  greatfrontend75: RiRocketLine,
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

export function focusAreaLongDescription(
  intl: IntlShape,
): Record<string, string> {
  return {
    accessibility: intl.formatMessage({
      defaultMessage:
        'Practice developing inclusive and accessible web experiences. Explore the principles and techniques of web accessibility, including semantic HTML, ARIA roles, keyboard navigation, and screen reader compatibility, a skill which differentiates senior from junior front end engineers.',
      description: 'Long description for focus areas',
      id: 'i2twoD',
    }),
    'async-operations': intl.formatMessage({
      defaultMessage:
        'Sharpen your skills in asynchronous programming by practicing the use of async/await, Promises, and callback functions. Dive into scenarios that require asynchronous operations, such as making API requests and delayed code execution.',
      description: 'Long description for focus areas',
      id: 'IrBtz7',
    }),
    'data-structures-algorithms': intl.formatMessage({
      defaultMessage:
        'Hone your computer science fundamentals by implementing important data structures and algorithms from scratch and practice the questions where algorithmic efficiency is key.',
      description: 'Title for focus area type',
      id: '33r7p3',
    }),
    'design-system-components': intl.formatMessage({
      defaultMessage:
        'Elevate your front-end skills by practicing the creation of front end design system components.',
      description: 'Long description for focus areas',
      id: 'Ul4HxL',
    }),
    'dom-manipulation': intl.formatMessage({
      defaultMessage:
        'Dive into the world of element selection and modification in the DOM. Practice selecting elements using CSS selectors, traverse the DOM hierarchy, and manipulate their properties, content, and styles.',
      description: 'Long description for focus areas',
      id: '9jeX9H',
    }),
    forms: intl.formatMessage({
      defaultMessage:
        'Master the art of building interactive and user-friendly forms by exploring various form components, validation techniques, and handling form submissions.',
      description: 'Long description for focus areas',
      id: '4+MpEW',
    }),
    'javascript-polyfills': intl.formatMessage({
      defaultMessage:
        'Gain proficiency in front end fundamentals by implementing JavaScript and DOM APIs from scratch.',
      description: 'Long description for focus areas',
      id: 'FhnnWR',
    }),
    lodash: intl.formatMessage({
      defaultMessage:
        'Implement various Lodash functions and methods to manipulate and transform data efficiently, a common task given during front end interviews and improve your front end interview readiness.',
      description: 'Long description for focus areas',
      id: 'sBY9/Q',
    }),
    'state-management': intl.formatMessage({
      defaultMessage:
        'Train your skills in designing complex state and implementing operations to manipulate state.',
      description: 'Long description for focus areas',
      id: 'h+WHk/',
    }),
  };
}
