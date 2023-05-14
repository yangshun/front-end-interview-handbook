import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionFilter } from './QuestionFilterType';
import type {
  QuestionLanguage,
  QuestionUserFacingFormat,
} from '../common/QuestionsTypes';

const LANGUAGE_OPTIONS: ReadonlyArray<{
  label: string;
  value: QuestionLanguage;
}> = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
];

type Props = Readonly<{
  userFacingFormat: QuestionUserFacingFormat;
}>;

export default function useQuestionLanguageFilter({
  userFacingFormat,
}: Props): [Set<QuestionLanguage>, QuestionFilter<QuestionLanguage>] {
  const intl = useIntl();
  const [languageFilters, setLanguageFilters] =
    useSessionStorageForSets<QuestionLanguage>(
      `gfe:${userFacingFormat}:language-filter`,
      new Set(),
    );

  const LanguageFilterOptions: QuestionFilter<QuestionLanguage> = {
    id: 'language',
    matches: (question) =>
      languageFilters.size === 0 ||
      question.languages.some((language) => languageFilters.has(language)),
    name: intl.formatMessage({
      defaultMessage: 'Language',
      description: 'Question programming language',
      id: 'q9FxEg',
    }),
    onChange: (value) => {
      const newLanguages = new Set(languageFilters);

      newLanguages.has(value)
        ? newLanguages.delete(value)
        : newLanguages.add(value);
      setLanguageFilters(newLanguages);
    },
    options: LANGUAGE_OPTIONS,
  };

  return [languageFilters, LanguageFilterOptions];
}
