import { RiAdvertisementLine, RiPagesLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useIntl } from '~/components/intl';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

export default function useCommonNavItems() {
  const intl = useIntl();

  const blog: NavbarTopLevelItem = {
    href: '/blog',
    icon: RiPagesLine,
    id: 'blog',
    label: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'Link to blog',
      id: 'pBR3LI',
    }),
    onClick: () => {
      gtag.event({
        action: `nav.blog.click`,
        category: 'engagement',
        label: 'Blog',
      });
    },
    position: 'start',
    type: 'link',
  };

  const advertise: NavbarTopLevelItem = {
    href: '/advertise-with-us',
    icon: RiAdvertisementLine,
    id: 'advertise',
    label: intl.formatMessage({
      defaultMessage: 'Advertise with us',
      description: 'Link to advertise with us',
      id: '9OVmVF',
    }),
    onClick: () => {
      gtag.event({
        action: `nav.advertise.click`,
        category: 'engagement',
        label: 'Advertise with us',
      });
    },
    position: 'start',
    type: 'link',
  };

  return {
    advertise,
    blog,
  };
}
