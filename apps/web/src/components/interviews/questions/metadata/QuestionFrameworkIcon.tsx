import clsx from 'clsx';
import type { CSSProperties } from 'react';

import AngularLogo from '~/components/icons/AngularLogo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import ReactLogo from '~/components/icons/ReactLogo';
import SvelteLogo from '~/components/icons/SvelteLogo';
import VueLogo from '~/components/icons/VueLogo';

import type { QuestionFramework } from '../common/QuestionsTypes';

const frameworkIcons: Record<
  QuestionFramework,
  Readonly<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    style?: CSSProperties;
  }>
> = {
  angular: { icon: AngularLogo, style: { transform: 'scale(1.1)' } },
  react: { icon: ReactLogo, style: { fill: 'rgb(20, 158, 202)' } },
  svelte: { icon: SvelteLogo, style: { color: '#ff3e00' } },
  vanilla: { icon: HTML5Logo },
  vue: { icon: VueLogo },
};

type Props = Readonly<{
  className?: string;
  framework: QuestionFramework;
}>;

export default function QuestionFrameworkIcon({ className, framework }: Props) {
  const { icon: Icon, style: iconStyle } = frameworkIcons[framework];

  return <Icon className={clsx('size-5', className)} style={iconStyle} />;
}
