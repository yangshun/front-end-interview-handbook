import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type {
  QuestionFramework,
  QuestionUserFacingFormat,
} from '~/components/questions/common/QuestionsTypes';
import { QuestionFrameworkLabels } from '~/components/questions/common/QuestionsTypes';

import type { QuestionFilter } from '../QuestionFilterType';

const FRAMEWORK_OPTIONS: ReadonlyArray<QuestionFramework> = [
  'react',
  'vanilla',
];

type Props = Readonly<{
  userFacingFormat: QuestionUserFacingFormat;
}>;

export default function useQuestionFrameworkFilter({
  userFacingFormat,
}: Props): [Set<QuestionFramework>, QuestionFilter<QuestionFramework>] {
  const intl = useIntl();
  const [frameworkFilters, setFrameworkFilters] =
    useSessionStorageForSets<QuestionFramework>(
      `gfe:${userFacingFormat}:framework-filter`,
      new Set(),
    );

  const frameworkFilterOptions: QuestionFilter<QuestionFramework> = {
    id: 'Framework',
    matches: (question) =>
      frameworkFilters.size === 0 ||
      question.frameworks.some((frameworkItem) =>
        frameworkFilters.has(frameworkItem.framework),
      ),
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
