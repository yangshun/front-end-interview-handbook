'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import QuestionCategoryTitleSection from '~/components/interviews/questions/category/QuestionCategoryTitleSection';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionListingFeaturedQuestions from '~/components/interviews/questions/listings/auxilliary/QuestionListingFeaturedQuestions';
import QuestionsCodingListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsCodingListWithFiltersAndProgress';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

type Props = Readonly<{
  description: string;
  featuredQuestions: ReadonlyArray<QuestionMetadata>;
  featuredSectionTitle: string;
  framework: QuestionFramework;
  logo?: ReactNode;
  questionCompletionCount?: QuestionCompletionCount;
  questionList: ReadonlyArray<QuestionMetadata>;
  title: string;
  titleAddOnText?: string;
}>;

export default function QuestionsFrameworkPage({
  description,
  featuredQuestions,
  featuredSectionTitle,
  framework,
  logo,
  questionCompletionCount,
  questionList,
  title,
  titleAddOnText,
}: Props) {
  return (
    <Container
      className={clsx(
        'flex flex-col',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
        'py-4 md:py-6 lg:py-8 xl:py-16',
      )}
      variant="normal">
      <QuestionCategoryTitleSection
        category={framework}
        count={questionList.length}
        description={description}
        logo={logo}
        title={title}
        titleAddOnText={titleAddOnText}
      />
      <Section>
        <QuestionListingFeaturedQuestions
          questions={featuredQuestions}
          title={featuredSectionTitle}
        />
        <QuestionsCodingListWithFiltersAndProgress
          framework={framework}
          mode="framework"
          namespace={`${framework}-quiz`}
          questionCompletionCount={questionCompletionCount}
          questions={questionList}
        />
      </Section>
    </Container>
  );
}
