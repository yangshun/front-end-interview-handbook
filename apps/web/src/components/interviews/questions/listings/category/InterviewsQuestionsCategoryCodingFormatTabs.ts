import type {
  QuestionCodingFormat,
  QuestionLanguage,
} from '../../common/QuestionsTypes';

export const InterviewsQuestionsCategoryLanguageCodingFormatTabs: Record<
  QuestionLanguage,
  ReadonlyArray<QuestionCodingFormat>
> = {
  css: ['javascript', 'user-interface'],
  html: ['javascript', 'user-interface'],
  js: ['javascript', 'user-interface', 'algo'],
  ts: ['javascript', 'user-interface', 'algo'],
};
