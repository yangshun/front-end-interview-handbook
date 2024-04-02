'use client';

import { useIntl } from 'react-intl';

import type { FooterNavigation } from '~/components/global/footers/Footer';
import Footer from '~/components/global/footers/Footer';

function useFooterNavigation() {
  const intl = useIntl();

  const navigation: FooterNavigation = [
    {
      key: 'main',
      // TODO(projects): find out correct links.
      links: [
        {
          href: '/projects?mode=beginner',
          key: 'beginner',
          name: intl.formatMessage({
            defaultMessage: 'For Beginners',
            description: 'Link to Projects homepage for beginners',
            id: '9New5b',
          }),
        },
        {
          href: '/projects?mode=experienced',
          key: 'experienced',
          name: intl.formatMessage({
            defaultMessage: 'For Experienced',
            description: 'Link to Projects homepage for experienced users',
            id: 'wnzGbx',
          }),
        },
        {
          href: '/projects?mode=portfolio',
          key: 'portfolio',
          name: intl.formatMessage({
            defaultMessage: 'For Portfolios',
            description: 'Link to Projects homepage for portfolios',
            id: 'n/3FHx',
          }),
        },
        {
          href: '/projects?mode=sideProject',
          key: 'side-project',
          name: intl.formatMessage({
            defaultMessage: 'For Side Projects',
            description: 'Link to Projects homepage for side projects',
            id: 'lspF70',
          }),
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Main',
        description:
          'Section heading in Projects footer for links to home page',
        id: 'QdCE6p',
      }),
    },
    {
      key: 'info',
      links: [
        {
          href: '/projects#features',
          key: 'features',
          name: intl.formatMessage({
            defaultMessage: 'Features',
            description: 'Link to features page',
            id: 'xEvm93',
          }),
        },
        {
          href: '#',
          key: 'faq',
          name: intl.formatMessage({
            defaultMessage: 'FAQ',
            description: 'Link to FAQ page',
            id: 'u3bYHM',
          }),
        },
        {
          href: '/projects/pricing',
          key: 'pricing',
          name: intl.formatMessage({
            defaultMessage: 'Pricing',
            description: 'Link to pricing page',
            id: 'EITf7R',
          }),
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Info',
        description:
          'Section heading in Projects footer for links to more information',
        id: 'txe6H8',
      }),
    },
    {
      key: 'practice',
      links: [
        {
          href: '/projects/dashboard',
          key: 'dashboard',
          name: intl.formatMessage({
            defaultMessage: 'Dashboard',
            description: 'Link to dashboard',
            id: 'aqtrYi',
          }),
        },
        {
          href: '/projects/challenges',
          key: 'projects',
          name: intl.formatMessage({
            defaultMessage: 'Challenges',
            description: 'Link to all projects challenges page',
            id: 'e/31yG',
          }),
        },
        {
          href: '/projects/submissions',
          key: 'submissions',
          name: intl.formatMessage({
            defaultMessage: 'Submissions',
            description: 'Link to submissions page',
            id: 'B9vupD',
          }),
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Practice',
        description:
          'Section heading in Projects footer for links practice-related pages',
        id: '6ZmcXv',
      }),
    },
    {
      key: 'company',
      links: [
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

export default function FooterProjects() {
  const navigation = useFooterNavigation();

  return <Footer navigation={navigation} />;
}
