'use client';

import {
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionLists';

import QuestionsSubnav from '~/components/interviews/questions/common/QuestionsSubnav';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  const frameworks = useQuestionFrameworksData();
  const languages = useQuestionLanguagesData();

  return (
    <>
      <QuestionsSubnav
        items={[
          frameworks.react,
          frameworks.angular,
          frameworks.vue,
          frameworks.svelte,
          languages.js,
          languages.css,
          languages.html,
          languages.ts,
        ]}
      />
      <Container className="py-8 xl:py-12" width="app">
        {children}
      </Container>
    </>
  );
}
