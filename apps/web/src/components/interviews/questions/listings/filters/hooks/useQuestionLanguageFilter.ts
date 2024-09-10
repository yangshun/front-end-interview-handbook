import { useState } from 'react';
import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { QuestionLanguage } from '~/components/interviews/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

const LANGUAGE_OPTIONS: ReadonlyArray<{
  label: string;
  value: QuestionLanguage;
}> = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
];

type Props = Readonly<{
  namespace?: string;
}>;

export default function useQuestionLanguageFilter({
  namespace,
}: Props): [Set<QuestionLanguage>, QuestionFilter<QuestionLanguage>] {
  const intl = useIntl();
  const [languageState, setLanguageState] = useState(
    new Set<QuestionLanguage>(),
  );
  const [languageFSessionStorage, setLanguageSessionStorage] =
    useSessionStorageForSets<QuestionLanguage>(
      `gfe:${namespace}:language-filter`,
      new Set(),
    );

  // Conditionally select which hook's state to use
  const languageFilters = namespace ? languageFSessionStorage : languageState;
  const setLanguageFilters = namespace
    ? setLanguageSessionStorage
    : setLanguageState;

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
    onClear: () => {
      setLanguageFilters(new Set());
    },
    options: LANGUAGE_OPTIONS,
    setValues: setLanguageFilters,
  };

  return [languageFilters, LanguageFilterOptions];
}
