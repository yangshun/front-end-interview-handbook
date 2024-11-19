import clsx from 'clsx';
import { useId } from 'react';
import { RiCodeSSlashLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import QuestionLanguageIcon from './QuestionLanguageIcon';
import type { QuestionLanguage } from '../common/QuestionsTypes';

type Props = Readonly<{
  languages: ReadonlyArray<QuestionLanguage>;
  showIcon?: boolean;
}>;

export default function QuestionLanguages({
  languages,
  showIcon = false,
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
            <QuestionLanguageIcon key={language} language={language} />
          ))}
        </div>
      </div>
    </Tooltip>
  );
}
