import clsx from 'clsx';
import { useId } from 'react';
import { RiCodeSSlashLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import QuestionLanguageLabel from './QuestionLanguageLabel';
import type { QuestionLanguage } from '../common/QuestionsTypes';

type Props = Readonly<{
  languages: ReadonlyArray<QuestionLanguage>;
  showIcon?: boolean;
  size?: TextSize;
}>;

export default function QuestionLanguages({
  languages,
  showIcon = false,
  size = 'body3',
}: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Languages',
    description: 'Programming languages used for the question',
    id: 'Gps//z',
  });

  return (
    <Tooltip asChild={true} label={label}>
      <div className="flex items-center gap-x-1.5">
        <span className="sr-only" id={id}>
          {label}
        </span>
        {showIcon && (
          <RiCodeSSlashLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
          />
        )}
        <div aria-labelledby={id} className="flex items-center gap-x-2">
          {languages.map((language) => (
            <QuestionLanguageLabel
              key={language}
              size={size}
              value={language}
            />
          ))}
        </div>
      </div>
    </Tooltip>
  );
}
