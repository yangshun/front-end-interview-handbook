import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
} from '~/components/interviews/questions/common/QuestionsTypes';

type TestFocusState = {
  filePath: string;
  index: number;
  specParts: Array<string>;
};

type JavaScriptWorkspaceSliceState = {
  language: QuestionCodingWorkingLanguage;
  question: QuestionJavaScript;
  testFocus: TestFocusState | null;
};

export const initialJavaScriptWorkspaceState: JavaScriptWorkspaceSliceState = {
  language: 'js',
  question: {} as QuestionJavaScript,
  testFocus: null,
};

const javascriptWorkspaceSlice = createSlice({
  initialState: initialJavaScriptWorkspaceState,
  name: 'javascript-workspace',
  reducers: {
    clearTestFocus(state) {
      state.testFocus = null;
    },
    focusOnTest(state, action: PayloadAction<TestFocusState>) {
      state.testFocus = action.payload;
    },
    setLanguage(state, action: PayloadAction<QuestionCodingWorkingLanguage>) {
      state.language = action.payload;
    },
  },
});

export const { clearTestFocus, focusOnTest, setLanguage } =
  javascriptWorkspaceSlice.actions;
export default javascriptWorkspaceSlice.reducer;
