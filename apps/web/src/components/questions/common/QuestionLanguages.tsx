import { useId } from 'react';
import { RiCodeSSlashLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import type { TextSize } from '~/components/ui/Text';

import QuestionLanguageLabel from './QuestionLanguageLabel';
import type { QuestionLanguage } from './QuestionsTypes';

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
        <RiCodeSSlashLine
          aria-hidden="true"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-400"
        />
      )}
      <div aria-labelledby={id} className="flex items-center space-x-2">
        {languages.map((language) => (
          <QuestionLanguageLabel key={language} size={size} value={language} />
        ))}
      </div>
    </div>
  );
}
