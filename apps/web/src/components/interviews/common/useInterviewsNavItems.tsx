import {
  RiBookOpenLine,
  RiHome3Line,
  RiPlayLine,
  RiPriceTag3Line,
  RiShiningLine,
  RiTerminalWindowLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';
import url from 'url';

import gtag from '~/lib/gtag';
import { SCROLL_HASH_INTERVIEWS_FEATURES } from '~/hooks/useScrollToHash';

import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';
import { useFocusAreas } from '~/data/focus-areas/FocusAreasHooks';
import { useGuidesData } from '~/data/Guides';
import { getPreparationPlanTheme } from '~/data/plans/PreparationPlans';
import { usePreparationPlans } from '~/data/plans/PreparationPlansHooks';
import {
  useQuestionTechnologyLists,
  useQuestionUserFacingFormatData,
} from '~/data/QuestionFormats';

import Badge from '~/components/ui/Badge';
import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

export default function useInterviewsNavItems(placement: 'nav' | 'sidebar') {
  const intl = useIntl();

  const questionTechnologyLists = useQuestionTechnologyLists();
  const questionFormatLists = useQuestionUserFacingFormatData();
  const preparationPlans = usePreparationPlans();
  const focusAreas = useFocusAreas();
  const guidesData = useGuidesData();

  const dashboard: NavbarPrimaryItem = {
    currentMatchRegex: /\prepare$/,
    href: '/prepare',
    icon: RiHome3Line,
    itemKey: 'dashboard',
    label: intl.formatMessage({
      defaultMessage: 'Dashboard',
      description: 'Link to dashboard page',
      id: 'vi10y1',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.dashboard.click`,
        category: 'engagement',
        label: 'Dashboard',
      });
    },
    position: 'start',
    type: 'link',
  };
  const features: NavbarPrimaryItem = {
    href: url.format({
      hash: SCROLL_HASH_INTERVIEWS_FEATURES,
      pathname: '/',
    }),
    icon: RiShiningLine,
    itemKey: 'features',
    label: intl.formatMessage({
      defaultMessage: 'Features',
      description: 'Sidebar navigation label',
      id: 'IveIL+',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.features.click`,
        category: 'ecommerce',
        label: 'Features',
      });
    },
    position: 'end',
    scroll: false,
    type: 'link',
  };
  const guides: NavbarPrimaryItem = {
    align: 'center',
    currentMatchRegex: /guidebook/,
    icon: RiBookOpenLine,
    itemKey: 'guides',
    items: [
      {
        itemKey: 'guidebooks',
        items: [
          {
            href: guidesData['front-end-interview-guidebook'].href,
            icon: guidesData['front-end-interview-guidebook'].icon,
            itemKey: guidesData['front-end-interview-guidebook'].key,
            label: guidesData['front-end-interview-guidebook'].name,
            labelAddon: (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Free',
                  description: 'Free-of-charge label',
                  id: 'S+6OOS',
                })}
                size="xs"
                variant="success"
              />
            ),
            onClick: () => {
              gtag.event({
                action: `${placement}.guides.feig.click`,
                category: 'engagement',
                label: 'Front End Interview Guidebook',
              });
            },
            sublabel: guidesData['front-end-interview-guidebook'].description,
            type: 'popover-link',
          },
          {
            href: guidesData['front-end-system-design-guidebook'].href,
            icon: guidesData['front-end-system-design-guidebook'].icon,
            itemKey: guidesData['front-end-system-design-guidebook'].key,
            label: guidesData['front-end-system-design-guidebook'].name,
            onClick: () => {
              gtag.event({
                action: `${placement}.guides.fesdg.click`,
                category: 'engagement',
                label: 'Front End System Design Guidebook',
              });
            },
            sublabel:
              guidesData['front-end-system-design-guidebook'].description,
            type: 'popover-link',
          },
          {
            href: guidesData['behavioral-interview-guidebook'].href,
            icon: guidesData['behavioral-interview-guidebook'].icon,
            itemKey: guidesData['behavioral-interview-guidebook'].key,
            label: guidesData['behavioral-interview-guidebook'].name,
            labelAddon: (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Free',
                  description: 'Free-of-charge label',
                  id: 'S+6OOS',
                })}
                size="sm"
                variant="success"
              />
            ),
            onClick: () => {
              gtag.event({
                action: `${placement}.guides.big.click`,
                category: 'engagement',
                label: 'Behavioral Interview Guidebook',
              });
            },
            sublabel: guidesData['behavioral-interview-guidebook'].description,
            type: 'popover-link',
          },
        ],
        label: intl.formatMessage({
          defaultMessage: 'Guidebooks',
          description: 'Guidebooks category',
          id: 'B82jFj',
        }),
        type: 'popover-list',
      },
    ],
    label: intl.formatMessage({
      defaultMessage: 'Guides',
      description: 'Guides navbar item',
      id: 'H/u+cg',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.guides.click`,
        category: 'engagement',
        label: 'Guides',
      });
    },
    position: 'start',
    type: 'popover',
  };
  const practice: NavbarPrimaryItem = {
    align: 'center',
    // TODO: Adding the regex causes this item to be active during SSR for /prepare. Disabling first.
    // currentMatchRegex: /^(\/prepare\/(coding|quiz|system|behavioral))|\/questions\/|\/focus-areas\//,
    icon: RiTerminalWindowLine,
    itemKey: 'practice-questions',
    items: [
      {
        alignment: 'top',
        itemKey: 'questions-types',
        items: [
          {
            href: questionFormatLists.coding.href,
            icon: questionFormatLists.coding.icon,
            itemKey: questionFormatLists.coding.key,
            label: questionFormatLists.coding.longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.questions.coding.click`,
                category: 'engagement',
                label: 'Coding Questions',
              });
            },
            sublabel: questionFormatLists.coding.description,
            type: 'popover-link',
          },
          {
            href: questionFormatLists['system-design'].href,
            icon: questionFormatLists['system-design'].icon,
            itemKey: questionFormatLists['system-design'].key,
            label: questionFormatLists['system-design'].longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.questions.system_design.click`,
                category: 'engagement',
                label: 'System Design Questions',
              });
            },
            sublabel: questionFormatLists['system-design'].description,
            type: 'popover-link',
          },
          {
            href: questionFormatLists.quiz.href,
            icon: questionFormatLists.quiz.icon,
            itemKey: questionFormatLists.quiz.key,
            label: questionFormatLists.quiz.longName,
            labelAddon: (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Free',
                  description: 'Free-of-charge label',
                  id: 'S+6OOS',
                })}
                size="sm"
                variant="success"
              />
            ),
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.questions.quiz.click`,
                category: 'engagement',
                label: 'Quiz Questions',
              });
            },
            sublabel: questionFormatLists.quiz.description,
            type: 'popover-link',
          },
        ],
        label: intl.formatMessage({
          defaultMessage: 'Prepare end-to-end for front end interviews',
          description: 'Title for question format category links in navbar',
          id: 'mOk1w0',
        }),
        supplementaryItem: {
          href: questionFormatLists.coding.href,
          icon: RiPlayLine,
          itemKey: questionFormatLists.coding.key,
          label: intl.formatMessage({
            defaultMessage: 'Practice end-to-end',
            description: 'Practice questions for all stages',
            id: 'QHtJPS',
          }),
          type: 'link',
        },
        type: 'popover-list',
      },
      {
        alignment: 'center',
        itemKey: 'language-framework',
        items: [
          {
            href: questionTechnologyLists.js.href,
            icon: questionTechnologyLists.js.icon,
            itemKey: questionTechnologyLists.js.key,
            label: questionTechnologyLists.js.longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.topic.javascript.click`,
                category: 'engagement',
                label: 'JavaScript Questions',
              });
            },
            type: 'popover-link',
          },
          {
            href: questionTechnologyLists.html.href,
            icon: questionTechnologyLists.html.icon,
            itemKey: questionTechnologyLists.html.key,
            label: questionTechnologyLists.html.longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.topic.html.click`,
                category: 'engagement',
                label: 'HTML Questions',
              });
            },
            type: 'popover-link',
          },
          {
            href: questionTechnologyLists.css.href,
            icon: questionTechnologyLists.css.icon,
            itemKey: questionTechnologyLists.css.key,
            label: questionTechnologyLists.css.longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.topic.css.click`,
                category: 'engagement',
                label: 'CSS Questions',
              });
            },
            type: 'popover-link',
          },
          {
            href: questionTechnologyLists.react.href,
            icon: questionTechnologyLists.react.icon,
            itemKey: questionTechnologyLists.react.key,
            label: questionTechnologyLists.react.longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.topic.react.click`,
                category: 'engagement',
                label: 'React Questions',
              });
            },
            type: 'popover-link',
          },
          {
            href: questionTechnologyLists.angular.href,
            icon: questionTechnologyLists.angular.icon,
            itemKey: questionTechnologyLists.angular.key,
            label: questionTechnologyLists.angular.name,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.topic.angular.click`,
                category: 'engagement',
                label: 'Angular',
              });
            },
            type: 'popover-link',
          },
          {
            href: questionTechnologyLists.vue.href,
            icon: questionTechnologyLists.vue.icon,
            itemKey: questionTechnologyLists.vue.key,
            label: questionTechnologyLists.vue.name,
            labelAddon: (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'New!',
                  description: 'New label',
                  id: 'HrMm6A',
                })}
                size="xs"
                variant="success"
              />
            ),
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.topic.vue.click`,
                category: 'engagement',
                label: 'Vue',
              });
            },
            type: 'popover-link',
          },
          {
            href: questionTechnologyLists.svelte.href,
            icon: questionTechnologyLists.svelte.icon,
            itemKey: questionTechnologyLists.svelte.key,
            label: questionTechnologyLists.svelte.name,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.topic.svelte.click`,
                category: 'engagement',
                label: 'Svelte',
              });
            },
            type: 'popover-link',
          },
        ],
        label: intl.formatMessage({
          defaultMessage: 'Practice questions by framework or language',
          description: 'Title for question framework category links in navbar',
          id: '0mKzkX',
        }),
        type: 'popover-list',
      },
      {
        itemKey: 'study-plans',
        items: [
          {
            href: preparationPlans['one-week'].href,
            icon: getPreparationPlanTheme('one-week').iconOutline,
            itemKey: preparationPlans['one-week'].type,
            label: preparationPlans['one-week'].longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.plans.one_week.click`,
                category: 'engagement',
                label: '1 Week Plan',
              });
            },
            sublabel: preparationPlans['one-week'].shortDescription,
            type: 'popover-link',
          },
          {
            href: preparationPlans['one-month'].href,
            icon: getPreparationPlanTheme('one-month').iconOutline,
            itemKey: preparationPlans['one-month'].type,
            label: preparationPlans['one-month'].longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.plans.one_month.click`,
                category: 'engagement',
                label: '1 Month Plan',
              });
            },
            sublabel: preparationPlans['one-month'].shortDescription,
            type: 'popover-link',
          },
          {
            href: preparationPlans['three-months'].href,
            icon: getPreparationPlanTheme('three-months').iconOutline,
            itemKey: preparationPlans['three-months'].type,
            label: preparationPlans['three-months'].longName,
            onClick: () => {
              gtag.event({
                action: `${placement}.practice.plans.three_months.click`,
                category: 'engagement',
                label: '3 Months Plan',
              });
            },
            sublabel: preparationPlans['three-months'].shortDescription,
            type: 'popover-link',
          },
        ],
        label: intl.formatMessage({
          defaultMessage: 'Practice with study plans and timelines',
          description: 'Section title for study plans',
          id: 'CQOAJS',
        }),
        supplementaryItem: {
          href: '/study-plans',
          icon: RiPlayLine,
          itemKey: 'study-plans',
          label: intl.formatMessage({
            defaultMessage: 'View study plans',
            description: 'Link label to view all study plans',
            id: 'lGUj4P',
          }),
          type: 'link',
        },
        type: 'popover-list',
      },
      {
        itemKey: 'focus-areas',
        items: (
          [
            'async-operations',
            'data-structures-algorithms',
            'design-system-components',
            'lodash',
            'dom-manipulation',
            'accessibility',
            'javascript-polyfills',
            'forms',
          ] as const
        ).map((focusArea) => ({
          href: focusAreas[focusArea].href,
          icon: getFocusAreaTheme(focusArea).iconOutline,
          itemKey: focusAreas[focusArea].type,
          key: focusArea,
          label: focusAreas[focusArea].longName,
          onClick: () => {
            gtag.event({
              action: `${placement}.practice.focus_areas.${focusAreas[focusArea].type}.click`,
              category: 'engagement',
              label: focusAreas[focusArea].longName,
            });
          },
          type: 'popover-link',
        })),
        label: intl.formatMessage({
          defaultMessage: 'Practice for specific focus areas',
          description: 'Section title',
          id: 'PigS2u',
        }),
        supplementaryItem: {
          href: '/focus-areas',
          icon: RiPlayLine,
          itemKey: 'focus-areas',
          label: intl.formatMessage({
            defaultMessage: 'View focus areas',
            description: 'Link label to view all focus areas',
            id: 'PvVu6g',
          }),
          type: 'link',
        },
        type: 'popover-list',
      },
    ],
    label: intl.formatMessage({
      defaultMessage: 'Practice questions',
      description:
        'Section title for links to question lists by category and format',
      id: 'hphZ3y',
    }),
    position: 'start',
    type: 'popover-tabs',
  };
  const pricing: NavbarPrimaryItem = {
    href: '/interviews/pricing',
    icon: RiPriceTag3Line,
    itemKey: 'pricing',
    label: intl.formatMessage({
      defaultMessage: 'Pricing',
      description: 'Link label to the pricing page',
      id: 'VlrCm6',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.pricing.click`,
        category: 'ecommerce',
        label: 'Pricing',
      });
    },
    position: 'end',
    type: 'link',
  };

  return {
    dashboard,
    features,
    guides,
    practice,
    pricing,
  };
}
