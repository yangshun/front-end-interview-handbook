import {
  RiCodeSSlashLine,
  RiHome3Line,
  RiPriceTag3Line,
  RiRocketLine,
  RiShiningLine,
} from 'react-icons/ri';
import url from 'url';

import gtag from '~/lib/gtag';
import {
  SCROLL_HASH_PROJECTS_DASHBOARD,
  SCROLL_HASH_PROJECTS_FEATURES,
} from '~/hooks/useScrollToHash';

import { useIntl } from '~/components/intl';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

export default function useProjectsNavItems(placement: 'nav' | 'sidebar') {
  const intl = useIntl();

  const dashboard: NavbarTopLevelItem = {
    href: url.format({
      hash: SCROLL_HASH_PROJECTS_DASHBOARD,
      pathname: '/projects/dashboard',
    }),
    icon: RiHome3Line,
    id: 'dashboard',
    label: intl.formatMessage({
      defaultMessage: 'Dashboard',
      description: 'Sidebar navigation label',
      id: 'R9G9bY',
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
  const challenges: NavbarTopLevelItem = {
    href: '/projects/challenges',
    icon: RiRocketLine,
    id: 'challenges',
    label:
      placement === 'nav'
        ? intl.formatMessage({
            defaultMessage: 'Challenges',
            description: 'Sidebar navigation label',
            id: 'ej7o90',
          })
        : intl.formatMessage({
            defaultMessage: 'Project challenges',
            description: 'Sidebar navigation label',
            id: 'OelRg0',
          }),
    onClick: () => {
      gtag.event({
        action: `${placement}.challenges.click`,
        category: 'engagement',
        label: 'Projects challenges',
      });
    },
    position: 'start',
    type: 'link',
  };
  const submissions: NavbarTopLevelItem = {
    href: '/projects/submissions',
    icon: RiCodeSSlashLine,
    id: 'all-submissions',
    label:
      placement === 'nav'
        ? intl.formatMessage({
            defaultMessage: 'Submissions',
            description: 'Sidebar navigation label',
            id: 'uVAawC',
          })
        : intl.formatMessage({
            defaultMessage: 'User submissions',
            description: 'Sidebar navigation label',
            id: 'e2P6am',
          }),
    onClick: () => {
      gtag.event({
        action: `${placement}.submissions.click`,
        category: 'engagement',
        label: 'User submissions',
      });
    },
    position: 'start',
    type: 'link',
  };
  const features: NavbarTopLevelItem = {
    href: url.format({
      hash: SCROLL_HASH_PROJECTS_FEATURES,
      pathname: '/projects',
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
        category: 'engagement',
        label: 'Features',
      });
    },
    position: 'end',
    scroll: false,
    type: 'link',
  };
  const pricing: NavbarTopLevelItem = {
    href: '/projects/pricing',
    icon: RiPriceTag3Line,
    id: 'pricing',
    label: intl.formatMessage({
      defaultMessage: 'Pricing',
      description: 'Sidebar navigation label',
      id: '9qO5Il',
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

  return { challenges, dashboard, features, pricing, submissions };
}
