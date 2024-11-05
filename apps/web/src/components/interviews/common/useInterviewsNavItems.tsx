import {
  RiBookOpenLine,
  RiBuilding2Line,
  RiCalendar2Line,
  RiEyeLine,
  RiFocus2Line,
  RiHome3Line,
  RiPriceTag3Line,
  RiQuestionAnswerLine,
  RiQuestionnaireLine,
  RiReactjsFill,
  RiShiningLine,
  RiStarFill,
  RiTerminalWindowLine,
  RiThumbUpLine,
  RiTimeLine,
} from 'react-icons/ri';
import url from 'url';

import gtag from '~/lib/gtag';
import { SCROLL_HASH_INTERVIEWS_FEATURES } from '~/hooks/useScrollToHash';

import { useGuidesData } from '~/data/Guides';

import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

export default function useInterviewsNavItems(placement: 'nav' | 'sidebar') {
  const intl = useIntl();

  const guidesData = useGuidesData();

  const dashboard = {
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
  } as const;
  const features = {
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
  } as const;
  const recommendedPreparation = {
    align: 'center',
    icon: RiThumbUpLine,
    itemKey: 'questions-types',
    // TODO(interviews): consolidate with "recommended prep strategy" dropdown menu.
    items: [
      {
        href: guidesData['front-end-interview-playbook'].href,
        icon: guidesData['front-end-interview-playbook'].icon,
        itemKey: guidesData['front-end-interview-playbook'].key,
        label: guidesData['front-end-interview-playbook'].name,
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.feig.click`,
            category: 'engagement',
            label: guidesData['front-end-interview-playbook'].name,
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage: 'Quick start guide to front end interviews',
          description: 'Description of front end interview playbook',
          id: '1Q18c8',
        }),
        type: 'popover-link',
      },
      {
        href: '/interviews/greatfrontend75',
        icon: RiStarFill,
        itemKey: 'gfe75',
        label: 'GreatFrontEnd 75',
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.gfe75.click`,
            category: 'engagement',
            label: 'GreatFrontEnd 75',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Most important 75 questions for front end interviews',
          description: 'Description of GreatFrontEnd 75',
          id: 'N0z+Fz',
        }),
        type: 'popover-link',
      },
      {
        href: '/interviews/blind75',
        icon: RiEyeLine,
        itemKey: 'blind75',
        label: 'Blind 75',
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.blind75.click`,
            category: 'engagement',
            label: 'Bling 75',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage: 'List of the 75 most important algorithm questions',
          description: 'Description of Blind 75',
          id: 'erkZY+',
        }),
        type: 'popover-link',
      },
      {
        href: guidesData['front-end-system-design-playbook'].href,
        icon: guidesData['front-end-system-design-playbook'].icon,
        itemKey: guidesData['front-end-system-design-playbook'].key,
        label: guidesData['front-end-system-design-playbook'].name,
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.fesdg.click`,
            category: 'engagement',
            label: 'Front End System Design',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Core front end system design techniques and in-depth solutions',
          description: 'Description of front end system design playbook',
          id: 'uuRCtm',
        }),
        type: 'popover-link',
      },
    ],
    label: intl.formatMessage({
      defaultMessage: 'Recommended preparation',
      description: 'Recommended interview preparation resources',
      id: '19cHR9',
    }),
    type: 'popover-list',
  } as const;
  const timeSavers = {
    align: 'center',
    currentMatchRegex: /\/study-plans|\/interviews\/company|\/focus-areas/,
    icon: RiTimeLine,
    itemKey: 'time-savers',
    items: [
      {
        href: '/interviews/study-plans',
        icon: RiCalendar2Line,
        itemKey: 'study-plans',
        label: intl.formatMessage({
          defaultMessage: 'Study plans',
          description: 'Interviews study plans',
          id: 'htx1cR',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.time_savers.study_plans.click`,
            category: 'engagement',
            label: 'Study plans',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Prepare for your front end interviews in 1 week, 1 month, or 3 months',
          description: 'Description for interview study plans',
          id: 'Fpu2gU',
        }),
        type: 'popover-link',
      },
      {
        bottomEl: (
          <div className="flex gap-1.5">
            {[
              {
                imgSrc: '/img/company-logos/google-logomark.svg',
                label: 'Google',
              },
              {
                imgSrc: '/img/company-logos/amazon-logomark.svg',
                label: 'Amazon',
              },
              {
                imgSrc: '/img/company-logos/tiktok-logomark.svg',
                label: 'TikTok',
              },
              {
                imgSrc: '/img/company-logos/microsoft-logomark.svg',
                label: 'Microsoft',
              },
            ].map(({ label, imgSrc }) => (
              <img
                key={label}
                alt={label}
                className="size-4 inline-block shrink-0 rounded bg-white p-0.5"
                src={imgSrc}
              />
            ))}
            <Badge label="+6 more" size="xs" variant="neutral" />
          </div>
        ),
        href: '/interviews/company',
        icon: RiBuilding2Line,
        itemKey: 'company-guide',
        label: intl.formatMessage({
          defaultMessage: 'Company guides',
          description: 'Company interview guides',
          id: 'Kj5nRS',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.time_savers.company_guides.click`,
            category: 'engagement',
            label: 'Company guides',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Optimized preparation for target companies, leveraging insider tips and expertise',
          description: 'Description for company interview guides',
          id: 'xlpypp',
        }),
        type: 'popover-link',
      },
      {
        bottomEl: (
          <div className="flex gap-2">
            {[
              'Polyfills',
              'Async',
              'Design Systems',
              'Accessibility',
              '+8 more',
            ].map((label) => (
              <Badge key={label} label={label} size="xs" variant="neutral" />
            ))}
          </div>
        ),
        href: '/interviews/focus-areas',
        icon: RiFocus2Line,
        itemKey: 'focus-areas',
        label: intl.formatMessage({
          defaultMessage: 'Focus areas',
          description: 'Interview preparation focus areas',
          id: 'Y0QGFG',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.time_savers.focus_areas.click`,
            category: 'engagement',
            label: 'Focus areas',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Deep dive into topical focus areas critical for front end interviews',
          description: 'Description for interview preparation focus areas',
          id: 'wrQH8L',
        }),
        type: 'popover-link',
      },
    ],
    label: intl.formatMessage({
      defaultMessage: 'Time-savers',
      description: 'Section title for study plans',
      id: 'rrz3iJ',
    }),
    type: 'popover-list',
  } as const;
  const practiceQuestions = {
    align: 'center',
    currentMatchRegex: /\/interviews\/questions/,
    icon: RiQuestionnaireLine,
    itemKey: 'practice-questions',
    items: [
      {
        bottomEl: (
          <div className="flex gap-2">
            {['React', 'TypeScript', 'Vue', 'Angular', 'Svelte', '+3 more'].map(
              (label) => (
                <Badge key={label} label={label} size="xs" variant="neutral" />
              ),
            )}
          </div>
        ),
        href: '/questions',
        icon: RiReactjsFill,
        itemKey: 'question-framework',
        label: intl.formatMessage({
          defaultMessage: 'By framework or language',
          description:
            'Practice for interviews by question frameworks or language',
          id: 'nLjMCI',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.practice_questions.frameworks.click`,
            category: 'engagement',
            label: 'By framework or language',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Targeted practice in specific front end frameworks and languages.',
          description:
            'Description for interviews practice by frameworks and languages',
          id: 'taJXPg',
        }),
        type: 'popover-link',
      },
      {
        bottomEl: (
          <div className="flex gap-2">
            {['JavaScript coding', 'UI coding', 'Algo coding', '+2 more'].map(
              (label) => (
                <Badge key={label} label={label} size="xs" variant="neutral" />
              ),
            )}
          </div>
        ),
        href: '/prepare',
        icon: RiQuestionAnswerLine,
        itemKey: 'question-format',
        label: intl.formatMessage({
          defaultMessage: 'By question format',
          description: 'Practice for interviews question format',
          id: 'eUSr+T',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.practice_questions.question_format.click`,
            category: 'engagement',
            label: 'Focus areas',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Gain expertise in handling commonly asked question formats in front end interviews',
          description: 'Description for interview practice by question format',
          id: '9Bbo+p',
        }),
        type: 'popover-link',
      },
    ],
    label: intl.formatMessage({
      defaultMessage: 'Practice questions',
      description: 'Section title',
      id: 'qdOBuk',
    }),
    type: 'popover-list',
  } as const;
  const guides = {
    align: 'center',
    icon: RiBookOpenLine,
    itemKey: 'guides',
    items: [
      {
        href: guidesData['front-end-interview-playbook'].href,
        icon: guidesData['front-end-interview-playbook'].icon,
        itemKey: guidesData['front-end-interview-playbook'].key,
        label: guidesData['front-end-interview-playbook'].name,
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
            action: `${placement}.prepare.guides.feig.click`,
            category: 'engagement',
            label: 'Front End Interview Guidebook',
          });
        },
        sublabel: guidesData['front-end-interview-playbook'].description,
        type: 'popover-link',
      },
      {
        href: guidesData['front-end-system-design-playbook'].href,
        icon: guidesData['front-end-system-design-playbook'].icon,
        itemKey: guidesData['front-end-system-design-playbook'].key,
        label: guidesData['front-end-system-design-playbook'].name,
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.guides.fesdg.click`,
            category: 'engagement',
            label: 'Front End System Design Guidebook',
          });
        },
        sublabel: guidesData['front-end-system-design-playbook'].description,
        type: 'popover-link',
      },
      {
        href: guidesData['behavioral-interview-playbook'].href,
        icon: guidesData['behavioral-interview-playbook'].icon,
        itemKey: guidesData['behavioral-interview-playbook'].key,
        label: guidesData['behavioral-interview-playbook'].name,
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
            action: `${placement}.prepare.guides.big.click`,
            category: 'engagement',
            label: 'Behavioral Interview Guidebook',
          });
        },
        sublabel: guidesData['behavioral-interview-playbook'].description,
        type: 'popover-link',
      },
    ],
    label: intl.formatMessage({
      defaultMessage: 'Guides',
      description: 'Guidebooks category',
      id: 'RKER+g',
    }),
    type: 'popover-list',
  } as const;
  const practice: NavbarTopLevelItem = {
    align: 'center',
    // TODO: Adding the regex causes this item to be active during SSR for /prepare. Disabling first.
    // currentMatchRegex: /^(\/prepare\/(coding|quiz|system|behavioral))|\/questions\/|\/focus-areas\//,
    icon: RiTerminalWindowLine,
    itemKey: 'practice-questions',
    items: [recommendedPreparation, timeSavers, practiceQuestions, guides],
    label: intl.formatMessage({
      defaultMessage: 'Prepare',
      description: 'Prepare for interviews',
      id: 'oj/6Ow',
    }),
    position: 'start',
    type: 'popover-tabs',
  };
  const pricing = {
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
  } as const;

  return {
    dashboard,
    features,
    guides,
    practice,
    practiceQuestions,
    pricing,
    recommendedPreparation,
    timeSavers,
  };
}
