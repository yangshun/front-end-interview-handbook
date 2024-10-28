import InterviewsDashboardLayout from '~/components/interviews/dashboard/InterviewsDashboardLayout';

import { fetchInterviewsStudyLists } from '~/db/contentlayer/InterviewsStudyListReader';
import { fetchQuestionsListCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardPageLayout({ children }: Props) {
  const [questionTotalAvailableCount, focusAreas] = await Promise.all([
    fetchQuestionsListCount(),
    fetchInterviewsStudyLists('focus-area'),
  ]);

  return (
    <InterviewsDashboardLayout
      focusAreas={focusAreas}
      questionTotalAvailableCount={questionTotalAvailableCount}>
      {children}
    </InterviewsDashboardLayout>
  );
}
