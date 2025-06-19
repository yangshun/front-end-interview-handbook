import type {
  QuestionFramework,
  QuestionListTypeData,
  QuestionPracticeFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';

export function questionsLanguageTabs() {
  return ['coding', 'quiz'] as const;
}

export function questionsFrameworkTabs(framework: QuestionFramework) {
  switch (framework) {
    case 'react': {
      return ['coding', 'quiz'] as const;
    }
    default: {
      return null;
    }
  }
}

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
      return listType.tab ? questionsLanguageTabs() : null;
    }
    case 'framework': {
      switch (listType.value) {
        case 'react': {
          return listType.tab ? questionsFrameworkTabs('react') : null;
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
