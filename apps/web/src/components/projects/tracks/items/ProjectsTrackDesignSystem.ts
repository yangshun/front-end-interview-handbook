import { RiBrush2Line } from 'react-icons/ri';

import type { ThemeGradient } from '~/components/ui/theme';

const gradient: ThemeGradient<'#e25cbc', '#ae3277'> = {
  className: 'bg-[linear-gradient(133.77deg,_#e25cbc_0%,_#ae3277_97.95%)]',
  endColor: '#ae3277',
  startColor: '#e25cbc',
};

export function getProjectsTrackThemeDesignSystem() {
  return {
    gradient,
    icon: RiBrush2Line,
  };
}
