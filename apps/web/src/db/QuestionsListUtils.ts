import type { InterviewsStudyList } from 'contentlayer/generated';
import type { IntlShape } from 'react-intl';

import {
  getQuestionFormatsData,
  getQuestionFrameworksData,
  getQuestionLanguagesData,
} from '~/data/QuestionCategories';

import { fetchInterviewsAllStudyLists } from './contentlayer/InterviewsStudyListReader';

function reduceStudyListData(studyList: ReadonlyArray<InterviewsStudyList>) {
  return studyList.map(
    (item) =>
      ({
        label: item.name,
        type: 'study-list',
        value: item.slug,
      }) as const,
  );
}

export async function fetchQuestionLists(intl: IntlShape) {
  const studyLists = await fetchInterviewsAllStudyLists();

  const formatsData = getQuestionFormatsData(intl);
  const frameworksData = getQuestionFrameworksData(intl);
  const languagesData = getQuestionLanguagesData(intl);

  return {
    companies: reduceStudyListData(studyLists.companies),
    focusAreas: reduceStudyListData(studyLists.focusAreas),
    formats: Object.values(formatsData).map(
      ({ label, value }) =>
        ({
          label,
          type: 'format',
          value,
        }) as const,
    ),
    frameworks: Object.values(frameworksData).map(
      ({ label, value }) =>
        ({
          label,
          type: 'framework',
          value,
        }) as const,
    ),
    languages: Object.values(languagesData).map(
      ({ label, value }) =>
        ({
          label,
          type: 'language',
          value,
        }) as const,
    ),
    studyPlans: reduceStudyListData(studyLists.studyPlans),
  };
}
