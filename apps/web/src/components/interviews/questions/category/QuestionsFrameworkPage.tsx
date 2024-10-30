'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import QuestionCategoryTitleSection from '~/components/interviews/questions/category/QuestionCategoryTitleSection';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionListingFeaturedQuestions from '~/components/interviews/questions/listings/auxilliary/QuestionListingFeaturedQuestions';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';

import QuestionsCategoryNavbar from './QuestionsCategoryNavbar';

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
    <>
      {INTERVIEWS_REVAMP_2024 && (
        <QuestionsCategoryNavbar category={framework} />
      )}
      <Container
        className={clsx(
          'flex flex-col',
          'gap-y-8 md:gap-y-10 2xl:gap-y-12',
          INTERVIEWS_REVAMP_2024 ? 'py-12' : 'py-4 md:py-6 lg:py-8 xl:py-16',
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
          <QuestionsUnifiedListWithFiltersAndProgress
            filterNamespace={`framework:${framework}`}
            framework={framework}
            mode="framework"
            questionCompletionCount={questionCompletionCount}
            questions={questionList}
          />
        </Section>
      </Container>
    </>
  );
}
