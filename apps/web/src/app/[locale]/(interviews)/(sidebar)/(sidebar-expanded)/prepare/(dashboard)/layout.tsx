import InterviewsDashboardLayout from '~/components/interviews/dashboard/InterviewsDashboardLayout';

import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsListCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardPageLayout({ children }: Props) {
  const [questionTotalAvailableCount, focusAreas, studyPlans] =
    await Promise.all([
      fetchQuestionsListCount(),
      fetchInterviewsStudyLists('focus-area'),
      fetchInterviewsStudyLists('study-plan'),
    ]);

  return (
    <InterviewsDashboardLayout
      focusAreas={focusAreas}
      questionTotalAvailableCount={questionTotalAvailableCount}
      studyPlans={studyPlans}>
      {children}
    </InterviewsDashboardLayout>
  );
}
