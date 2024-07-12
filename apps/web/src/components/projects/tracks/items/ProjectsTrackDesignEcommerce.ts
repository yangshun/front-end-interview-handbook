import { RiShoppingBag3Line } from 'react-icons/ri';

import type { ThemeGradient } from '~/components/ui/theme';

const gradient: ThemeGradient<'#4F86C1', '#7275BA'> = {
  className: 'bg-[linear-gradient(133.77deg,_#4F86C1_0%,_#7275BA_97.95%)]',
  endColor: '#7275BA',
  startColor: '#4F86C1',
};

export function getProjectsTrackThemeEcommerce() {
  return {
    gradient,
    icon: RiShoppingBag3Line,
  };
}
