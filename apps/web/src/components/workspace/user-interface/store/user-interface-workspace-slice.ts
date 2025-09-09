import { createSlice } from '@reduxjs/toolkit';

import type { QuestionUserInterface } from '~/components/interviews/questions/common/QuestionsTypes';

type UserInterfaceWorkspaceSliceState = {
  question: QuestionUserInterface;
};

export const initialUserInterfaceWorkspaceState: UserInterfaceWorkspaceSliceState =
  {
    question: {} as QuestionUserInterface,
  };

const userInterfaceWorkspaceSlice = createSlice({
  initialState: initialUserInterfaceWorkspaceState,
  name: 'user-interface-workspace',
  reducers: {},
});

export default userInterfaceWorkspaceSlice.reducer;
