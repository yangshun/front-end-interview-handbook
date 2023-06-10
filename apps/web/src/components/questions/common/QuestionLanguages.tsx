import { useId } from 'react';
import { FormattedMessage } from 'react-intl';

import type { TextVariant } from '~/components/ui/Text';

import QuestionLanguageLabel from './QuestionLanguageLabel';
import type { QuestionLanguage } from './QuestionsTypes';

import { CodeBracketIcon } from '@heroicons/react/24/outline';
type Props = Readonly<{
  languages: ReadonlyArray<QuestionLanguage>;
  showIcon?: boolean;
  variant?: TextVariant;
}>;

export default function QuestionLanguages({
  languages,
  showIcon = false,
  variant = 'body3',
}: Props) {
  const id = useId();

  return (
    <div className="flex items-center">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Languages"
          description="Screenreader text to indicate the Programming Languages section"
          id="FAtaOX"
        />
      </span>
      {showIcon && (
        <CodeBracketIcon
          aria-hidden="true"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-400"
        />
      )}
      <div aria-labelledby={id} className="flex items-center space-x-2">
        {languages.map((language) => (
          <QuestionLanguageLabel
            key={language}
            value={language}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
