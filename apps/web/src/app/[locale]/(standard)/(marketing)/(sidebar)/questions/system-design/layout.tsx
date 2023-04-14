import QuestionsSystemDesignContentLayout from '~/components/questions/content/system-design/SystemDesignLayoutSidebar';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function SystemDesignContentLayout({ children }: Props) {
  return (
    <QuestionsSystemDesignContentLayout>
      {children}
    </QuestionsSystemDesignContentLayout>
  );
}
