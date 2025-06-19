import type {
  QuestionListTypeData,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';

export function questionsListTabsConfig(
  listType: QuestionListTypeData | null | undefined,
): ReadonlyArray<QuestionPracticeFormat> | null {
  if (listType == null) {
    return null;
  }

  switch (listType.type) {
    case 'practice': {
      return ['coding', 'system-design', 'quiz'];
    }
    case 'language': {
      return listType.tab ? ['coding', 'quiz'] : null;
    }
    case 'framework': {
      switch (listType.value) {
        case 'react': {
          return listType.tab ? ['coding', 'quiz'] : null;
        }
        default: {
          return null;
        }
      }
    }
    case 'study-list':
    case 'format': {
      return null;
    }
  }
}
