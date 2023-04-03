'use client';

import TextPairing from '~/components/common/TextPairing';
import PromoBanner from '~/components/global/PromoBanner';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionsCodingListWithFilters from '~/components/questions/listings/QuestionsCodingListWithFilters';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import QuestionCategoryTitleSection from './QuestionCategoryTitleSection';
import useScrollToElement from './useScrollToElement';

type Props = Readonly<{
  description: string;
  framework: QuestionFramework;
  questionList: ReadonlyArray<QuestionMetadata>;
  title: string;
}>;

export default function QuestionsFrameworkPage({
  description,
  framework,
  questionList,
  title,
}: Props) {
  // Keep this component in sync with QuestionsCategoryPage.
  const listSectionRef = useScrollToElement<HTMLHRElement>('#list', 100);

  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-10 py-12 pt-6" variant="normal">
        <Section>
          <QuestionCategoryTitleSection category="react" />
        </Section>
        <hr ref={listSectionRef} />
        <TextPairing description={description} size="md" title={title} />
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
