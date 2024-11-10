'use client';

import { useQuestionFormatsData } from '~/data/QuestionLists';

import QuestionsSubnav from '~/components/interviews/questions/common/QuestionsSubnav';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  const formats = useQuestionFormatsData();

  return (
    <>
      <QuestionsSubnav
        items={[
          formats.javascript,
          formats['user-interface'],
          formats.algo,
          formats.quiz,
          formats['system-design'],
        ]}
      />
      <Container className="py-8 xl:py-12" width="app">
        {children}
      </Container>
    </>
  );
}
