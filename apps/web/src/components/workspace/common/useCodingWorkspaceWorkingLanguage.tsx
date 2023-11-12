import { useLocalStorage } from 'usehooks-ts';

import type { QuestionCodingWorkingLanguage } from '~/components/interviews/questions/common/QuestionsTypes';

export default function useCodingWorkspaceWorkingLanguage() {
  return useLocalStorage<QuestionCodingWorkingLanguage>(
    'gfe:coding:language',
    'js',
  );
}
