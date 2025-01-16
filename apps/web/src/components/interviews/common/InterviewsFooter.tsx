'use client';

import { useGuidesData } from '~/data/Guides';
import { useQuestionFormatsData } from '~/data/QuestionCategories';

import type { FooterNavigation } from '~/components/global/footers/Footer';
import Footer from '~/components/global/footers/Footer';
import { useIntl } from '~/components/intl';

function useFooterNavigation() {
  const intl = useIntl();
  const formats = useQuestionFormatsData();
  const guidesData = useGuidesData();

  const navigation: FooterNavigation = [
    {
      key: 'practice',
      links: [
        {
          href: '/get-started',
          key: 'get_started',
          name: intl.formatMessage({
            defaultMessage: 'Get Started',
            description: 'Link to get started page',
            id: '15O0qb',
          }),
        },
        {
          href: formats.javascript.href,
          key: formats.javascript.value,
          name: formats.javascript.label,
        },
        {
          href: formats['user-interface'].href,
          key: formats['user-interface'].value,
          name: formats['user-interface'].label,
        },
        {
          href: formats['system-design'].href,
          key: formats['system-design'].value,
          name: formats['system-design'].label,
        },
        {
          href: formats.quiz.href,
          key: formats.quiz.value,
          name: formats.quiz.label,
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Practice',
        description:
          'Section heading in footer for links to practice question pages',
        id: '3z2LJp',
      }),
    },
    {
      key: 'guides',
      links: [
        {
          href: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.href,
          key: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.key,
          name: guidesData.FRONT_END_INTERVIEW_PLAYBOOK.name,
        },
        {
          href: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.href,
          key: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.key,
          name: guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK.name,
        },
        {
          href: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.href,
          key: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.key,
          name: guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK.name,
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Guides',
        description: 'Section heading in footer for links to interview guides',
        id: 'sn/P86',
      }),
    },
    {
      key: 'preparationPlans',
      links: [
        {
          href: '/interviews/study-plans/one-week',
          key: 'one_week',
          name: intl.formatMessage({
            defaultMessage: '1 Week Plan',
            description: 'Link to one week study plan',
            id: 'i4MSQe',
          }),
        },
        {
          href: '/interviews/study-plans/one-month',
          key: 'one_month',
          name: intl.formatMessage({
            defaultMessage: '1 Month Plan',
            description: 'Link to one month study plan',
            id: 'CBhQ13',
          }),
        },
        {
          href: '/interviews/study-plans/three-months',
          key: 'three_months',
          name: intl.formatMessage({
            defaultMessage: '3 Months Plan',
            description: 'Link to three months study plan',
            id: 'PGFsFr',
          }),
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Study Plans',
        description:
          'Section heading in footer for links to study plans (i.e. recommended order to study and practice based on specific timelines e.g. prepare in 1 week, 1 month or 3 months)',
        id: '8klsso',
      }),
    },
    {
      key: 'company',
      links: [
        {
          href: '/interviews/pricing',
          key: 'pricing',
          name: intl.formatMessage({
            defaultMessage: 'Pricing',
            description: 'Link to pricing plans page',
            id: 't5L0yE',
          }),
        },
        {
          href: '/interviews/roadmap',
          key: 'interviews-roadmap',
          name: intl.formatMessage({
            defaultMessage: 'Roadmap',
            description: 'Link to roadmap page',
            id: '7VXf2Y',
          }),
        },
        {
          href: '/about',
          key: 'about',
          name: intl.formatMessage({
            defaultMessage: 'About',
            description: "Link to company's about page",
            id: '+5JohH',
          }),
        },
        {
          href: '/team',
          key: 'team',
          name: intl.formatMessage({
            defaultMessage: 'Team',
            description: "Link to company's team page",
            id: 'w9U/8b',
          }),
        },
        {
          href: '/contact',
          key: 'contact',
          name: intl.formatMessage({
            defaultMessage: 'Contact us',
            description: 'Link to contact us page',
            id: '5pRXcv',
          }),
        },
        {
          href: '/affiliates',
          key: 'affiliates',
          name: intl.formatMessage({
            defaultMessage: 'Become an affiliate',
            description: 'Link to affiliate marketing program page',
            id: 'IZH9WZ',
          }),
        },
        {
          href: '/jobs',
          key: 'hiring',
          name: intl.formatMessage({
            defaultMessage: 'Careers',
            description: 'Link to careers page',
            id: 'JMDUrK',
          }),
        },
        {
          href: '/blog',
          key: 'blog',
          name: intl.formatMessage({
            defaultMessage: 'Blog',
            description: 'Link to blog page',
            id: '7lppmr',
          }),
        },
        {
          href: 'https://medium.com/@greatfrontend',
          key: 'medium',
          name: 'Medium',
        },
        {
          href: 'https://dev.to/greatfrontend',
          key: 'dev',
          name: 'DEV Community',
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Company',
        description:
          'Section heading in footer for links to company-related pages like pricing, about, contact us, affiliate, etc.',
        id: 'CBU+k0',
      }),
    },
  ];

  return navigation;
}

export default function InterviewsFooter() {
  const navigation = useFooterNavigation();

  return <Footer navigation={navigation} />;
}
