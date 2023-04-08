import type { QuestionFramework } from '../common/QuestionsTypes';

// This type is not meant to have a 1:1 mapping with languages, it can be any arbitrary topic.
export type QuestionListCategory = 'css' | 'html' | 'js';
export type QuestionPageCategory =
  | 'behavioral'
  | 'coding'
  | 'quiz'
  | 'systemDesign';
export type QuestionCategory =
  | QuestionFramework
  | QuestionListCategory
  | QuestionPageCategory;
