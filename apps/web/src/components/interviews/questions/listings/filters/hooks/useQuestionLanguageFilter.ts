import { useState } from 'react';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import type { QuestionLanguage } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';

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
  initialValue?: ReadonlyArray<QuestionLanguage>;
  namespace?: string;
}>;

export default function useQuestionLanguageFilter(
  props?: Props,
): [Set<QuestionLanguage>, QuestionFilter<QuestionLanguage>] {
  const { initialValue, namespace } = props || {};
  const intl = useIntl();
  const [languageState, setLanguageState] = useState(
    new Set<QuestionLanguage>(initialValue),
  );
  const [languageFSessionStorage, setLanguageSessionStorage] =
    useGreatStorageLocal<Set<QuestionLanguage>>(
      `qns:${namespace}:filter:language`,
      new Set(initialValue),
      {
        ttl: 24 * 60 * 60,
      },
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
