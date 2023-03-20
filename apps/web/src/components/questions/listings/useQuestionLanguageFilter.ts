import { useState } from 'react';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionLanguage } from '../common/QuestionsTypes';

const LANGUAGE_OPTIONS: ReadonlyArray<{
  label: string;
  value: QuestionLanguage;
}> = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
];

export default function useQuestionLanguageFilter(): [
  Set<QuestionLanguage>,
  QuestionFilter<QuestionLanguage>,
] {
  const [languageFilters, setLanguageFilters] = useState<Set<QuestionLanguage>>(
    new Set(),
  );

  const LanguageFilterOptions: QuestionFilter<QuestionLanguage> = {
    id: 'language',
    name: 'Language',
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
