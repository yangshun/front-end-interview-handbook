import {
  RiCodeSSlashLine,
  RiHome3Line,
  RiPriceTag3Line,
  RiRocketLine,
  RiShiningLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

export default function useProjectsNavItems() {
  const intl = useIntl();

  const dashboard: NavbarPrimaryItem = {
    href: '/projects/dashboard',
    icon: RiHome3Line,
    itemKey: 'dashboard',
    label: intl.formatMessage({
      defaultMessage: 'Dashboard',
      description: 'Sidebar navigation label',
      id: 'R9G9bY',
    }),
    position: 'start',
    type: 'link',
  };
  const challenges: NavbarPrimaryItem = {
    href: '/projects/challenges',
    icon: RiRocketLine,
    itemKey: 'challenges',
    label: intl.formatMessage({
      defaultMessage: 'Project challenges',
      description: 'Sidebar navigation label',
      id: 'OelRg0',
    }),
    position: 'start',
    type: 'link',
  };
  const submissions: NavbarPrimaryItem = {
    href: '/projects/submissions',
    icon: RiCodeSSlashLine,
    itemKey: 'all-submissions',
    label: intl.formatMessage({
      defaultMessage: 'User submissions',
      description: 'Sidebar navigation label',
      id: 'e2P6am',
    }),
    position: 'start',
    type: 'link',
  };
  const features: NavbarPrimaryItem = {
    href: '/projects#features',
    icon: RiShiningLine,
    itemKey: 'features',
    label: intl.formatMessage({
      defaultMessage: 'Features',
      description: 'Sidebar navigation label',
      id: 'IveIL+',
    }),
    position: 'end',
    scrollToTop: false,
    type: 'link',
  };
  const pricing: NavbarPrimaryItem = {
    href: '/projects/pricing',
    icon: RiPriceTag3Line,
    itemKey: 'pricing',
    label: intl.formatMessage({
      defaultMessage: 'Pricing',
      description: 'Sidebar navigation label',
      id: '9qO5Il',
    }),
    position: 'end',
    type: 'link',
  };

  return { challenges, dashboard, features, pricing, submissions };
}
