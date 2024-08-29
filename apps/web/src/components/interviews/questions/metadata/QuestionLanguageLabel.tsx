import clsx from 'clsx';
import type { ReactNode } from 'react';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';

import type { QuestionLanguage } from '../common/QuestionsTypes';

const LanguageLabelClasses: Record<QuestionLanguage, string> = {
  css: 'bg-sky-500 text-white dark:bg-neutral-800 dark:text-sky-500',
  html: 'bg-orange-600 text-white dark:bg-neutral-800 dark:text-orange-600',
  js: 'bg-yellow-500 text-black dark:bg-neutral-800 dark:text-yellow-500',
  ts: 'bg-[#3178c6] text-white dark:bg-neutral-800 dark:text-[#3178c6]',
};

type Props = Readonly<{
  children?: ReactNode;
  className?: string;
  size?: TextSize;
  value: QuestionLanguage;
}>;

export default function QuestionLanguageLabel({
  children,
  value,
  size = 'body3',
  className,
}: Props) {
  return (
    <Text
      className={clsx(
        'inline-flex items-center rounded px-2 py-0.5',
        LanguageLabelClasses[value],
        className,
      )}
      color="inherit"
      size={size}
      weight="bold">
      {children ?? value.toLocaleUpperCase()}
    </Text>
  );
}
