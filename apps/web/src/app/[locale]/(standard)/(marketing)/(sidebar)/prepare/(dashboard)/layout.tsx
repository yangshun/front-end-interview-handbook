import DashboardLayout from '~/components/dashboard/DashboardLayout';

import { fetchQuestionsListCount } from '~/db/QuestionsListReader';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function DashboardPageLayout({ children }: Props) {
  const [questionTotalAvailableCount] = await Promise.all([
    fetchQuestionsListCount(),
  ]);

  return (
    <DashboardLayout questionTotalAvailableCount={questionTotalAvailableCount}>
      {children}
    </DashboardLayout>
  );
}
