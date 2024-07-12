import { RiShapesLine } from 'react-icons/ri';

import type { ThemeGradient } from '~/components/ui/theme';

const gradient: ThemeGradient<'#7F32DA', '#490FD7'> = {
  className: 'bg-[linear-gradient(133.77deg,_#7F32DA_0%,_#490FD7_97.95%)]',
  endColor: '#490FD7',
  startColor: '#7F32DA',
};

export function getProjectsTrackThemeApps() {
  return {
    gradient,
    icon: RiShapesLine,
  };
}
