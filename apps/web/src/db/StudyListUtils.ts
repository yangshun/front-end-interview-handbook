import type { InterviewsStudyList } from 'contentlayer/generated';

import { fetchInterviewsAllStudyLists } from './contentlayer/InterviewsStudyListReader';

export async function fetchStudyListsSelectorData() {
  const studyLists = await fetchInterviewsAllStudyLists();

  function reduceStudyListData(studyList: ReadonlyArray<InterviewsStudyList>) {
    return studyList.map((item) => ({ listKey: item.slug, name: item.name }));
  }

  const focusAreas = reduceStudyListData(studyLists.focusAreas);
  const companies = reduceStudyListData(studyLists.companies);
  const studyPlans = reduceStudyListData(studyLists.studyPlans);

  return { companies, focusAreas, studyPlans };
}
