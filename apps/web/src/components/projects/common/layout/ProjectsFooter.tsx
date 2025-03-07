'use client';

import url from 'url';

import { SCROLL_HASH_PROJECTS_FEATURES } from '~/hooks/useScrollToHash';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';

import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { FooterNavigation } from '~/components/global/footers/Footer';
import Footer from '~/components/global/footers/Footer';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';

function useFooterNavigation() {
  const intl = useIntl();
  const { advertise } = useCommonNavItems();

  const navigation: FooterNavigation = [
    {
      key: 'product',
      links: [
        {
          href: url.format({
            hash: SCROLL_HASH_PROJECTS_FEATURES,
            pathname: '/projects',
          }),
          key: 'features',
          name: intl.formatMessage({
            defaultMessage: 'Features',
            description: 'Link to features page',
            id: 'xEvm93',
          }),
        },
        {
          href: '/projects#faq',
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
        {
          href: '/projects/roadmap',
          key: 'projects-roadmap',
          name: intl.formatMessage({
            defaultMessage: 'Roadmap',
            description: 'Link to roadmap page',
            id: '7VXf2Y',
          }),
        },
      ],
      title: intl.formatMessage({
        defaultMessage: 'Product',
        description: 'Section heading in footer',
        id: 'PR+tvh',
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
        defaultMessage: 'Platform',
        description:
          'Section heading in Projects footer for links practice-related pages',
        id: 'NE6GPR',
      }),
    },
    {
      key: 'explore',
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
        defaultMessage: 'Explore',
        description: 'Section heading in footer',
        id: 'XMbtCr',
      }),
    },
    {
      key: 'company',
      links: [
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
        ...(SPONSORSHIPS_AVAILABLE
          ? [
              {
                href: advertise.href!,
                key: advertise.id,
                name: advertise.label,
                nameAddOn: (
                  <Badge
                    label={intl.formatMessage({
                      defaultMessage: 'New',
                      description: 'Badge label for new',
                      id: 'Aem5n7',
                    })}
                    size="xs"
                    variant="primary"
                  />
                ),
              },
            ]
          : []),
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
