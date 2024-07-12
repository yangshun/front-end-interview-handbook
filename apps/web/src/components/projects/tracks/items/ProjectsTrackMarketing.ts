import { RiPagesLine } from 'react-icons/ri';

import type { ThemeGradient } from '~/components/ui/theme';

const gradient: ThemeGradient<'#AEDB71', '#70AC46'> = {
  className: 'bg-[linear-gradient(133.77deg,_#AEDB71_0%,_#70AC46_97.95%)]',
  endColor: '#70AC46',
  startColor: '#AEDB71',
};

export function getProjectsTrackThemeMarketing() {
  return {
    gradient,
    icon: RiPagesLine,
  };
}
