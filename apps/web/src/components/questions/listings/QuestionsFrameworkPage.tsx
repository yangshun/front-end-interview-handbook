'use client';

import PromoBanner from '~/components/global/PromoBanner';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionsCodingListWithFilters from '~/components/questions/listings/QuestionsCodingListWithFilters';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import QuestionCategoryTitleSection from './QuestionCategoryTitleSection';

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
  return (
    <>
      <PromoBanner />
      <Container className="grid gap-y-10 py-8 md:py-12" variant="normal">
        <Section>
          <QuestionCategoryTitleSection category="react" />
        </Section>
        <hr />
        <div className="grid gap-y-4">
          <Heading className="text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </Heading>
          <Text className="max-w-3xl" color="secondary" display="block">
            {description}
          </Text>
        </div>
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
