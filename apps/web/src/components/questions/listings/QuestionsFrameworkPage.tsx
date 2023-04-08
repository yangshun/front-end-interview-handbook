'use client';

import type { ReactNode } from 'react';

import PromoBanner from '~/components/global/banners/PromoBanner';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionsCodingListWithFilters from '~/components/questions/listings/QuestionsCodingListWithFilters';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import QuestionCategoryTitleSection from './QuestionCategoryTitleSection';

type Props = Readonly<{
  description: string;
  framework: QuestionFramework;
  logo?: ReactNode;
  questionList: ReadonlyArray<QuestionMetadata>;
  title: string;
}>;

export default function QuestionsFrameworkPage({
  description,
  framework,
  logo,
  questionList,
  title,
}: Props) {
  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-10 py-12 pt-6" variant="normal">
        <QuestionCategoryTitleSection
          category="react"
          description={description}
          logo={logo}
          title={title}
        />
        <Section>
          <QuestionsCodingListWithFilters
            framework={framework}
            mode="framework"
            questions={questionList}
          />
        </Section>
      </Container>
    </>
  );
}
