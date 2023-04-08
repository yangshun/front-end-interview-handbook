import { useIntl } from 'react-intl';

import { useUserPreferencesState } from '~/components/global/UserPreferencesProvider';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCategory } from './types';
import type { QuestionLanguage } from '../common/QuestionsTypes';

const LANGUAGE_OPTIONS: ReadonlyArray<{
  label: string;
  value: QuestionLanguage;
}> = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'js' },
];

type Props = Readonly<{
  category: QuestionCategory;
}>;

export default function useQuestionLanguageFilter({
  category,
}: Props): [Set<QuestionLanguage>, QuestionFilter<QuestionLanguage>] {
  const intl = useIntl();
  const [languageFilters, setLanguageFilters] = useUserPreferencesState<
    Set<QuestionLanguage>
  >(`${category}LanguageFilters`, new Set());

  const LanguageFilterOptions: QuestionFilter<QuestionLanguage> = {
    id: 'language',
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
