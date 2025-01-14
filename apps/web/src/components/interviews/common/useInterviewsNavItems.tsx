import {
  RiBookOpenLine,
  RiBuilding2Line,
  RiCalendar2Line,
  RiCodeSSlashLine,
  RiFocus2Line,
  RiHome3Line,
  RiListCheck3,
  RiPriceTag3Line,
  RiReactjsFill,
  RiShiningLine,
  RiTerminalWindowLine,
  RiThumbUpLine,
  RiTimeLine,
} from 'react-icons/ri';
import url from 'url';

import gtag from '~/lib/gtag';
import { SCROLL_HASH_INTERVIEWS_FEATURES } from '~/hooks/useScrollToHash';

import { useGuidesData } from '~/data/Guides';
import {
  useQuestionFormatsData,
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import SidebarPremiumChip from '~/components/global/sidebar/SidebarPremiumChip';
import { StudyPlanIcons } from '~/components/interviews/questions/content/study-list/StudyListUtils';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import InterviewsPremiumBadge from './InterviewsPremiumBadge';
import { QuestionCountTotal } from '../questions/listings/stats/QuestionCount';

export default function useInterviewsNavItems(placement: 'nav' | 'sidebar') {
  const intl = useIntl();

  const guidesData = useGuidesData();
  const formatsData = useQuestionFormatsData();
  const frameworksData = useQuestionFrameworksData();
  const languagesData = useQuestionLanguagesData();

  const dashboard = {
    currentMatchRegex: /\/interviews\/dashboard$/,
    href: '/interviews/dashboard',
    icon: RiHome3Line,
    id: 'dashboard',
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
  const getStarted = {
    currentMatchRegex: /\/interviews\/get-started$/,
    href: '/interviews/get-started',
    icon: RiHome3Line,
    id: 'get-started',
    label: intl.formatMessage({
      defaultMessage: 'Get started',
      description: 'Link to get started page',
      id: '60XjnL',
    }),
    onClick: () => {
      gtag.event({
        action: `${placement}.get-started.click`,
        category: 'engagement',
        label: 'Get started',
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
    id: 'features',
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
    currentMatchRegex: new RegExp(
      `(/blind75|/gfe75|${guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href}|${guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href})`,
      'i',
    ),
    icon: RiThumbUpLine,
    id: 'questions-types',
    // TODO(interviews): consolidate with "recommended prep strategy" dropdown menu.
    items: [
      {
        href: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href,
        icon: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.icon,
        id: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.key,
        label: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name,
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.feig.click`,
            category: 'engagement',
            label: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name,
          });
        },
        showAsNumber: true,
        sublabel: intl.formatMessage({
          defaultMessage: 'Quick start guide to front end interviews',
          description: 'Description of front end interview playbook',
          id: '1Q18c8',
        }),
        type: 'popover-link',
      },
      {
        href: '/interviews/gfe75',
        icon: StudyPlanIcons.gfe75,
        id: 'gfe75',
        label: 'GFE 75',
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.gfe75.click`,
            category: 'engagement',
            label: 'GreatFrontEnd 75',
          });
        },
        showAsNumber: true,
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
        icon: StudyPlanIcons.blind75,
        id: 'blind75',
        label: 'Blind 75',
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.blind75.click`,
            category: 'engagement',
            label: 'Blind 75',
          });
        },
        showAsNumber: true,
        sublabel: intl.formatMessage({
          defaultMessage:
            'Famed list of the 75 most important algorithm questions',
          description: 'Description of Blind 75',
          id: 'uGbcAo',
        }),
        type: 'popover-link',
      },
      {
        href: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href,
        icon: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.icon,
        id: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.key,
        label: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.name,
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.recommended.fesdg.click`,
            category: 'engagement',
            label: 'Front End System Design',
          });
        },
        showAsNumber: true,
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
      defaultMessage: 'Recommended strategy',
      description: 'Recommended interview preparation resources',
      id: 'atvqCE',
    }),
    type: 'popover-list',
  } as const;
  const timeSavers = {
    align: 'center',
    currentMatchRegex: /^\/interviews\/(study-plans|company|focus-areas)/,
    icon: RiTimeLine,
    id: 'time-savers',
    items: [
      {
        addOnElement: <SidebarPremiumChip />,
        currentMatchRegex: /^\/interviews\/study-plans/,
        href: '/interviews/study-plans',
        icon: RiCalendar2Line,
        id: 'study-plans',
        label: intl.formatMessage({
          defaultMessage: 'Study plans',
          description: 'Interviews study plans',
          id: 'htx1cR',
        }),
        labelAddon: <InterviewsPremiumBadge size="xs" />,
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
        addOnElement: <SidebarPremiumChip />,
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
            <Badge label="+6 more" size="xs" variant="neutral-active" />
          </div>
        ),
        currentMatchRegex: /^\/interviews\/company/,
        href: '/interviews/company',
        icon: RiBuilding2Line,
        id: 'company-guide',
        label: intl.formatMessage({
          defaultMessage: 'Company guides',
          description: 'Company interview guides',
          id: 'Kj5nRS',
        }),
        labelAddon: <InterviewsPremiumBadge size="xs" />,
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.time_savers.company_guides.click`,
            category: 'engagement',
            label: 'Company guides',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Prepare for specific companies with known questions and insider tips.',
          description: 'Description for company interview guides',
          id: 'BCP1Ce',
        }),
        type: 'popover-link',
      },
      {
        addOnElement: <SidebarPremiumChip />,
        bottomEl: (
          <div className="flex flex-wrap gap-2">
            {[
              'Polyfills',
              'Async',
              'Design Systems',
              'Accessibility',
              '+8 more',
            ].map((label) => (
              <Badge
                key={label}
                label={label}
                size="xs"
                variant="neutral-active"
              />
            ))}
          </div>
        ),
        currentMatchRegex: /^\/interviews\/focus-areas/,
        href: '/interviews/focus-areas',
        icon: RiFocus2Line,
        id: 'focus-areas',
        label: intl.formatMessage({
          defaultMessage: 'Focus areas',
          description: 'Interview preparation focus areas',
          id: 'Y0QGFG',
        }),
        labelAddon: <InterviewsPremiumBadge size="xs" />,
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
    currentMatchRegex: /\/questions/,
    icon: RiListCheck3,
    id: 'practice-questions',
    items: [
      {
        bottomEl: (
          <div className="flex flex-wrap gap-2">
            {['Coding', 'System design', 'Quiz'].map((label) => (
              <Badge
                key={label}
                label={label}
                size="xs"
                variant="neutral-active"
              />
            ))}
          </div>
        ),
        currentMatchRegex:
          /^\/questions$|^\/questions\/system-design$|^\/questions\/quiz$/,
        href: '/questions',
        icon: RiListCheck3,
        id: 'question-all',
        label: intl.formatMessage({
          defaultMessage: 'All practice questions',
          description: 'Practice for interviews question',
          id: 'YC+V97',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.practice_questions.all.click`,
            category: 'engagement',
            label: 'All practice questions',
          });
        },
        sublabel: intl.formatMessage(
          {
            defaultMessage:
              'The largest bank of {questionCount}+ practice questions for front end interviews',
            description:
              'Description for interview practice by question format',
            id: 'vqaDA5',
          },
          {
            questionCount: QuestionCountTotal,
          },
        ),
        type: 'popover-link',
      },
      {
        bottomEl: (
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Vue', 'Angular', 'Svelte', '+3 more'].map(
              (label) => (
                <Badge
                  key={label}
                  label={label}
                  size="xs"
                  variant="neutral-active"
                />
              ),
            )}
          </div>
        ),
        currentMatchRegex: new RegExp(
          `^(${[
            ...Object.values(frameworksData).map(
              (frameworkData) => frameworkData.href,
            ),
            ...Object.values(languagesData).map(
              (languageData) => languageData.href,
            ),
          ].join('|')})`,
          'i',
        ),
        href: languagesData.js.href,
        icon: RiReactjsFill,
        id: 'question-framework',
        label: intl.formatMessage({
          defaultMessage: 'Frameworks / languages',
          description: 'Front end frameworks or language',
          id: 'pHQFA0',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.practice_questions.frameworks.click`,
            category: 'engagement',
            label: 'Frameworks / Languages',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Targeted practice in specific front end frameworks and languages',
          description:
            'Description for interviews practice by frameworks and languages',
          id: 'tk7bcb',
        }),
        type: 'popover-link',
      },
      {
        bottomEl: (
          <div className="flex flex-wrap gap-2">
            {[
              'JavaScript functions',
              'UI coding',
              'Algo coding',
              '+2 more',
            ].map((label) => (
              <Badge
                key={label}
                label={label}
                size="xs"
                variant="neutral-active"
              />
            ))}
          </div>
        ),
        currentMatchRegex: new RegExp(
          `^(${Object.values(formatsData)
            .map((formatData) => formatData.href)
            .join('|')})`,
          'i',
        ),
        href: formatsData['user-interface'].href,
        icon: RiCodeSSlashLine,
        id: 'question-format',
        label: intl.formatMessage({
          defaultMessage: 'Question formats',
          description: 'Practice for interviews question format',
          id: 'OijcrF',
        }),
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.practice_questions.question_format.click`,
            category: 'engagement',
            label: 'Question formats',
          });
        },
        sublabel: intl.formatMessage({
          defaultMessage:
            'Targeted practice in specific question formats for front end interviews',
          description: 'Description for interview practice by question format',
          id: 'u5SlWb',
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
    id: 'guides',
    items: [
      {
        href: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href,
        icon: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.icon,
        id: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.key,
        label: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name,
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
        sublabel: intl.formatMessage({
          defaultMessage: 'Quick start guide to front end interviews',
          description: 'Description of front end interview playbook',
          id: '1Q18c8',
        }),
        type: 'popover-link',
      },
      {
        href: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href,
        icon: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.icon,
        id: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.key,
        label: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.name,
        onClick: () => {
          gtag.event({
            action: `${placement}.prepare.guides.fesdg.click`,
            category: 'engagement',
            label: 'Front End System Design Guidebook',
          });
        },
        sublabel: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.description,
        type: 'popover-link',
      },
      {
        href: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.href,
        icon: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.icon,
        id: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.key,
        label: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.name,
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
        sublabel: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.description,
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
    icon: RiTerminalWindowLine,
    id: 'practice-questions',
    items: [practiceQuestions, recommendedPreparation, timeSavers, guides],
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
    id: 'pricing',
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
    getStarted,
    guides,
    practice,
    practiceQuestions,
    pricing,
    recommendedPreparation,
    timeSavers,
  };
}
