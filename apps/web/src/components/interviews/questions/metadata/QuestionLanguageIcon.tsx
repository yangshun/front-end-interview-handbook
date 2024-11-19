import clsx from 'clsx';
import type { CSSProperties } from 'react';

import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import TypeScriptLogo from '~/components/icons/TypeScriptLogo';

import type { QuestionLanguage } from '../common/QuestionsTypes';

const languageIcons: Record<
  QuestionLanguage,
  Readonly<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    style?: CSSProperties;
  }>
> = {
  css: { icon: CSS3Logo },
  html: { icon: HTML5Logo },
  js: { icon: JavaScriptLogo, style: { borderRadius: 2 } },
  ts: { icon: TypeScriptLogo },
};

type Props = Readonly<{
  className?: string;
  language: QuestionLanguage;
}>;

export default function QuestionLanguageIcon({ language, className }: Props) {
  const { icon: Icon, style: iconStyle } = languageIcons[language];

  return <Icon className={clsx('size-5', className)} style={iconStyle} />;
}
