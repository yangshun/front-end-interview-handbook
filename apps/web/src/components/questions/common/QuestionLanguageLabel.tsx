import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';

import type { QuestionLanguage } from './QuestionsTypes';

const LanguageLabelClasses: Record<QuestionLanguage, string> = {
  css: 'bg-sky-500 text-white',
  html: 'bg-orange-600 text-white',
  js: 'bg-yellow-500 text-black',
  ts: 'bg-[#3178c6] text-white',
};

type Props = Readonly<{
  children?: ReactNode;
  size?: TextSize;
  value: QuestionLanguage;
}>;

export default function QuestionLanguageLabel({
  children,
  value,
  size = 'body3',
}: Props) {
  return (
    <Text
      className={clsx(
        'inline-flex items-center rounded px-2 py-0.5',
        LanguageLabelClasses[value],
      )}
      color="inherit"
      size={size}
      weight="bold">
      {children ?? value.toLocaleUpperCase()}
    </Text>
  );
}
