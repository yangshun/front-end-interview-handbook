'use client';

import { useIntl } from 'react-intl';

import { useGuidesData } from '~/data/Guides';
import { useQuestionFormatLists } from '~/data/QuestionFormats';

import type { FooterNavigation } from './Footer';
import Footer from './Footer';

function useFooterNavigation() {
  const intl = useIntl();
  const questionFormatLists = useQuestionFormatLists();
  const guides = useGuidesData();

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
          href: questionFormatLists.coding.href,
          key: 'questions.coding',
          name: questionFormatLists.coding.longName,
        },
        {
          href: questionFormatLists['system-design'].href,
          key: 'questions.system_design',
          name: questionFormatLists['system-design'].longName,
        },
        {
          href: questionFormatLists.quiz.href,
          key: 'questions.quiz',
          name: questionFormatLists.quiz.longName,
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
          href: guides['front-end-interview-guidebook'].href,
          key: guides['front-end-interview-guidebook'].key,
          name: guides['front-end-interview-guidebook'].name,
        },
        {
          href: guides['front-end-system-design-guidebook'].href,
          key: guides['front-end-system-design-guidebook'].key,
          name: guides['front-end-system-design-guidebook'].name,
        },
        {
          href: guides['behavioral-interview-guidebook'].href,
          key: guides['behavioral-interview-guidebook'].key,
          name: guides['behavioral-interview-guidebook'].name,
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
          href: '/prepare/one-week',
          key: 'one_week',
          name: intl.formatMessage({
            defaultMessage: '1 Week Plan',
            description: 'Link to one week study plan',
            id: 'i4MSQe',
          }),
        },
        {
          href: '/prepare/one-month',
          key: 'one_month',
          name: intl.formatMessage({
            defaultMessage: '1 Month Plan',
            description: 'Link to one month study plan',
            id: 'CBhQ13',
          }),
        },
        {
          href: '/prepare/three-months',
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
          href: '/pricing',
          key: 'pricing',
          name: intl.formatMessage({
            defaultMessage: 'Pricing',
            description: 'Link to pricing plans page',
            id: 't5L0yE',
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
        // { href: '/team', key: 'team', name: 'Our Team' },
        {
          href: '/contact',
          key: 'contact',
          name: intl.formatMessage({
            defaultMessage: 'Contact Us',
            description: 'Link to contact us page',
            id: '8iiFM+',
          }),
        },
        {
          href: '/affiliates',
          key: 'affiliates',
          name: intl.formatMessage({
            defaultMessage: 'Become an Affiliate',
            description: 'Link to affiliate marketing program page',
            id: 'XS6Jyn',
          }),
        },
        {
          href: '/jobs',
          key: 'hiring',
          name: intl.formatMessage({
            defaultMessage: "We're Hiring",
            description: 'Link to careers page',
            id: 'ivmSx0',
          }),
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

export default function FooterInterviews() {
  const navigation = useFooterNavigation();

  return <Footer navigation={navigation} />;
}