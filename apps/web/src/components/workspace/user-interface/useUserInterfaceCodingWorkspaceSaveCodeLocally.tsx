import { useEffect } from 'react';

import type { QuestionUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';

import { useUserInterfaceCodingWorkspaceSelector } from './store/hooks';
import { saveUserInterfaceQuestionCodeLocally } from './UserInterfaceCodingWorkspaceCodeStorage';

export default function useUserInterfaceCodingWorkspaceSaveCodeLocally(
  question: QuestionUserInterface,
) {
  const { files } = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current,
  );
  const currentOpenedSolution = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.solution.currentOpenedSolution,
  );

  useEffect(() => {
    if (currentOpenedSolution == null) {
      saveUserInterfaceQuestionCodeLocally(question, files);
    }
  }, [currentOpenedSolution, question, files]);
}
