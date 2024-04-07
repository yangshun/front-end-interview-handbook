import InterviewsDashboardLayout from '~/components/interviews/dashboard/InterviewsDashboardLayout';

import { fetchQuestionsListCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardPageLayout({ children }: Props) {
  const [questionTotalAvailableCount] = await Promise.all([
    fetchQuestionsListCount(),
  ]);

  return (
    <InterviewsDashboardLayout
      questionTotalAvailableCount={questionTotalAvailableCount}>
      {children}
    </InterviewsDashboardLayout>
  );
}
