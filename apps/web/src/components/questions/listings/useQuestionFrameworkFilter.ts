import { useIntl } from 'react-intl';

import { useUserPreferencesState } from '~/components/global/UserPreferencesProvider';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionCategory } from './types';
import type { QuestionFramework } from '../common/QuestionsTypes';
import { QuestionFrameworkLabels } from '../common/QuestionsTypes';

const FRAMEWORK_OPTIONS: ReadonlyArray<QuestionFramework> = [
  'react',
  'vanilla',
];

type Props = Readonly<{
  category: QuestionCategory;
}>;

export default function useQuestionFrameworkFilter({
  category,
}: Props): [Set<QuestionFramework>, QuestionFilter<QuestionFramework>] {
  const intl = useIntl();
  const [frameworkFilters, setFrameworkFilters] = useUserPreferencesState<
    Set<QuestionFramework>
  >(`${category}FrameworkFilters`, new Set());

  const frameworkFilterOptions: QuestionFilter<QuestionFramework> = {
    id: 'Framework',
    name: intl.formatMessage({
      defaultMessage: 'Framework',
      description: 'Question framework',
      id: 'xbmWBx',
    }),
    onChange: (value) => {
      const newFrameworks = new Set(frameworkFilters);

      newFrameworks.has(value)
        ? newFrameworks.delete(value)
        : newFrameworks.add(value);
      setFrameworkFilters(newFrameworks);
    },
    options: FRAMEWORK_OPTIONS.map((value) => ({
      label: QuestionFrameworkLabels[value],
      value,
    })),
  };

  return [frameworkFilters, frameworkFilterOptions];
}
