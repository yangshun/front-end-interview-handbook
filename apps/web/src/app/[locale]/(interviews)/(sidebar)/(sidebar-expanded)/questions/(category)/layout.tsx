'use client';

import {
  useQuestionFrameworksData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

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
          languages.js,
          frameworks.react,
          frameworks.angular,
          frameworks.vue,
          frameworks.svelte,
          languages.css,
          languages.html,
          languages.ts,
        ]}
      />
      <Container
        className="py-8 xl:py-12"
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          '--global-sticky-height':
            'calc(var(--navbar-height) + var(--navbar-border) + var(--banner-height) + var(--subnav-height))',
        }}
        width="app">
        {children}
      </Container>
    </>
  );
}
