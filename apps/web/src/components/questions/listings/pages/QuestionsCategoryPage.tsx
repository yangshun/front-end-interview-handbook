'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

import type {
  QuestionCodingFormat,
  QuestionMetadata,
  QuestionQuizMetadata,
  QuestionUserFacingFormat,
} from '~/components/questions/common/QuestionsTypes';
import QuestionListingFeaturedQuestions from '~/components/questions/listings/auxilliary/QuestionListingFeaturedQuestions';
import QuestionsFormatTabs from '~/components/questions/listings/filters/QuestionsFormatsTabs';
import QuestionCategoryTitleSection from '~/components/questions/listings/headers/QuestionCategoryTitleSection';
import QuestionsCodingListWithFiltersAndProgress from '~/components/questions/listings/items/QuestionsCodingListWithFiltersAndProgress';
import QuestionsQuizListWithFiltersAndProgress from '~/components/questions/listings/items/QuestionsQuizListWithFiltersAndProgress';
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

type Props = QuestionListProps &
  Readonly<{
    description: string;
    featuredQuestions: ReadonlyArray<QuestionMetadata>;
    featuredSectionTitle: string;
    logo: ReactNode;
    pageTitle: string;
    titleAddOnText?: string;
  }>;

type QuestionListProps = Readonly<{
  category: QuestionListCategory;
  codingFormat: QuestionCodingFormat | null;
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  format: QuestionUserFacingFormat | null;
  questionCompletionCount?: QuestionCompletionCount;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
}>;

function QuestionsList({
  category: categoryParam,
  codingFormat,
  codingQuestions,
  format: formatParam,
  questionCompletionCount,
  quizQuestions,
}: Pick<
  Props,
  | 'category'
  | 'codingFormat'
  | 'codingQuestions'
  | 'format'
  | 'questionCompletionCount'
  | 'quizQuestions'
>) {
  // Set defaults here since rewrites from don't work properly
  // in Next.js 13 and some params can be missing if it's from
  // a rewritten URL. Only reproducible in prod :/
  const category = categoryParam ?? 'js';
  const format: QuestionUserFacingFormat = formatParam ?? 'coding';
  const router = useI18nRouter();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full overflow-x-auto">
        <QuestionsFormatTabs
          formats={['coding', 'quiz']}
          value={format}
          onSelect={(formatValue) => {
            // TODO: Change to href instead.
            router.push(
              `/questions/${category}/${[formatValue ?? ''].filter(Boolean)}`,
            );
          }}
        />
      </div>
      {format === 'quiz' && (
        <QuestionsQuizListWithFiltersAndProgress
          mode="topic"
          namespace={`${category}-quiz`}
          questionCompletionCount={questionCompletionCount}
          questions={quizQuestions}
        />
      )}
      {format === 'coding' && (
        <QuestionsCodingListWithFiltersAndProgress
          codingFormatFiltersFilterPredicate={
            CategoryFilters[category].filterPredicate
          }
          codingFormatFiltersOrderComparator={
            CategoryFilters[category].orderComparator
          }
          initialCodingFormat={codingFormat}
          namespace={`${category}-coding`}
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
  codingQuestions,
  description,
  featuredQuestions,
  featuredSectionTitle,
  format,
  logo,
  pageTitle,
  quizQuestions,
  questionCompletionCount,
  titleAddOnText,
}: Props) {
  return (
    <Container
      className={clsx(
        'flex flex-col',
        'py-4 md:py-6 lg:py-8',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
      )}
      variant="normal">
      <QuestionCategoryTitleSection
        category={category}
        count={codingQuestions.length + quizQuestions.length}
        description={description}
        logo={logo}
        title={pageTitle}
        titleAddOnText={titleAddOnText}
      />
      <Section>
        <QuestionListingFeaturedQuestions
          questions={featuredQuestions}
          title={featuredSectionTitle}
        />
        <QuestionsList
          key={category}
          category={category}
          codingFormat={codingFormat}
          codingQuestions={codingQuestions}
          format={format}
          questionCompletionCount={questionCompletionCount}
          quizQuestions={quizQuestions}
        />
      </Section>
    </Container>
  );
}
