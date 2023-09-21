'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import QuestionCategoryTitleSection from '~/components/questions/category/QuestionCategoryTitleSection';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/questions/common/QuestionsTypes';
import QuestionListingFeaturedQuestions from '~/components/questions/listings/auxilliary/QuestionListingFeaturedQuestions';
import QuestionsCodingListWithFiltersAndProgress from '~/components/questions/listings/items/QuestionsCodingListWithFiltersAndProgress';
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
        'py-6 lg:py-8',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
        // Workaround to make inner contents always 1080px on >= lg screens
        'lg:!max-w-[calc(1080px_+_4rem)] xl:!max-w-[calc(1080px_+_7.5rem)]',
      )}
      variant="normal">
      <QuestionCategoryTitleSection
        category="react"
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
