'use client';

import { useQuestionTechnologyLists } from '~/data/QuestionFormats';

import QuestionsSubnav from '~/components/interviews/questions/common/QuestionsSubnav';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
  const technology = useQuestionTechnologyLists();

  return (
    <>
      <QuestionsSubnav
        items={[
          technology.react,
          technology.angular,
          technology.vue,
          technology.svelte,
          technology.js,
          technology.css,
          technology.html,
          technology.ts,
        ]}
      />
      <Container className="py-8 xl:py-12" width="app">
        {children}
      </Container>
    </>
  );
}
