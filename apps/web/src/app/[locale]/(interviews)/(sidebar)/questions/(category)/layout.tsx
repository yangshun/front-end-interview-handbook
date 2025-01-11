import QuestionsFrameworkLanguageLayout from '~/components/interviews/questions/common/QuestionsFrameworkLanguageLayout';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  return (
    <QuestionsFrameworkLanguageLayout>
      {children}
    </QuestionsFrameworkLanguageLayout>
  );
}
