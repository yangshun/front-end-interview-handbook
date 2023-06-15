'use client';

import type { ReactNode } from 'react';

import PromoBanner from '~/components/global/banners/PromoBanner';
import type {
  QuestionCodingFormat,
  QuestionMetadata,
  QuestionQuizMetadata,
  QuestionUserFacingFormat,
} from '~/components/questions/common/QuestionsTypes';
import QuestionCategoryTitleSection from '~/components/questions/listings/QuestionCategoryTitleSection';
import QuestionsCodingListWithFilters from '~/components/questions/listings/QuestionsCodingListWithFilters';
import QuestionsFormatTabs from '~/components/questions/listings/QuestionsFormatsTabs';
import QuestionsQuizListWithFilters from '~/components/questions/listings/QuestionsQuizListWithFilters';
import type { QuestionListCategory } from '~/components/questions/listings/types';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { useI18nRouter } from '~/next-i18nostic/src';

// The higher the more important.
const codingFormatRankingForNonJavaScript: Record<
  QuestionCodingFormat,
  number
> = {
  'data-structures-algorithms': 0,
  'user-interface': 2,
  utilities: 1,
};

const CategoryFilters: Record<
  QuestionListCategory,
  Readonly<{
    filterPredicate?: (format: QuestionCodingFormat) => boolean;
    orderComparator?: (
      a: QuestionCodingFormat,
      b: QuestionCodingFormat,
    ) => number;
  }>
> = {
  css: {
    filterPredicate: (format) => format !== 'data-structures-algorithms',
    orderComparator: (a, b) =>
      codingFormatRankingForNonJavaScript[b] -
      codingFormatRankingForNonJavaScript[a],
  },
  html: {
    filterPredicate: (format) => format !== 'data-structures-algorithms',
    orderComparator: (a, b) =>
      codingFormatRankingForNonJavaScript[b] -
      codingFormatRankingForNonJavaScript[a],
  },
  js: {},
};

type Props = Readonly<{
  category: QuestionListCategory;
  codingFormat: QuestionCodingFormat | null;
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  description: string;
  format: QuestionUserFacingFormat | null;
  logo: ReactNode;
  pageTitle: string;
  questionCompletionCount?: QuestionCompletionCount;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
}>;

function QuestionsList({
  codingFormat,
  format: formatParam,
  category: categoryParam,
  codingQuestions,
  quizQuestions,
  questionCompletionCount,
}: Props) {
  // Set defaults here since rewrites from don't work properly
  // in Next.js 13 and some params can be missing if it's from
  // a rewritten URL. Only reproducible in prod :/
  const category = categoryParam ?? 'js';
  const format: QuestionUserFacingFormat = formatParam ?? 'coding';
  const router = useI18nRouter();

  return (
    <div className="space-y-8">
      <div className="w-full overflow-x-auto">
        <QuestionsFormatTabs
          formats={['coding', 'quiz']}
          value={format}
          onSelect={(formatValue) => {
            router.push(
              `/questions/${category}/${[formatValue ?? ''].filter(Boolean)}`,
            );
          }}
        />
      </div>
      {format === 'quiz' && (
        <QuestionsQuizListWithFilters
          mode="topic"
          questionCompletionCount={questionCompletionCount}
          questions={quizQuestions}
        />
      )}
      {format === 'coding' && (
        <QuestionsCodingListWithFilters
          codingFormatFiltersFilterPredicate={
            CategoryFilters[category].filterPredicate
          }
          codingFormatFiltersOrderComparator={
            CategoryFilters[category].orderComparator
          }
          initialCodingFormat={codingFormat}
          questionCompletionCount={questionCompletionCount}
          questions={codingQuestions}
        />
      )}
    </div>
  );
}

export default function QuestionsCategoryPage({
  category,
  codingFormat,
  format,
  logo,
  pageTitle,
  description,
  codingQuestions,
  quizQuestions,
  questionCompletionCount,
}: Props) {
  return (
    <>
      <PromoBanner sticky={true} />
      <Container className="grid gap-y-12 pb-12 pt-6" variant="normal">
        <QuestionCategoryTitleSection
          category={category}
          count={codingQuestions.length + quizQuestions.length}
          description={description}
          logo={logo}
          title={pageTitle}
        />
        <Section>
          <QuestionsList
            key={category}
            category={category}
            codingFormat={codingFormat}
            codingQuestions={codingQuestions}
            description={description}
            format={format}
            logo={logo}
            pageTitle={pageTitle}
            questionCompletionCount={questionCompletionCount}
            quizQuestions={quizQuestions}
          />
        </Section>
      </Container>
    </>
  );
}
