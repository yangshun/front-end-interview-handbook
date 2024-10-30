'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import type { ReactNode } from 'react';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';

import QuestionCategoryTitleSection from '~/components/interviews/questions/category/QuestionCategoryTitleSection';
import type {
  QuestionFormat,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionListingFeaturedQuestions from '~/components/interviews/questions/listings/auxilliary/QuestionListingFeaturedQuestions';
import QuestionsUserFacingFormatTabs from '~/components/interviews/questions/listings/filters/QuestionsUserFacingFormatsTabs';
import QuestionsQuizListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsQuizListWithFiltersAndProgress';
import QuestionsUnifiedListWithFiltersAndProgress from '~/components/interviews/questions/listings/items/QuestionsUnifiedListWithFiltersAndProgress';
import type { QuestionListCategory } from '~/components/interviews/questions/listings/types';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionCompletionCount } from '~/db/QuestionsCount';
import { useI18nRouter } from '~/next-i18nostic/src';

import QuestionsCategoryNavbar from './QuestionsCategoryNavbar';

// The higher the more important.
const codingFormatRankingForNonJavaScript: Record<QuestionFormat, number> = {
  algo: 0,
  javascript: 1,
  quiz: 4,
  'system-design': 3,
  'user-interface': 2,
};

const CategoryFilters: Record<
  QuestionListCategory,
  Readonly<{
    filterPredicate?: (format: QuestionFormat) => boolean;
    orderComparator?: (a: QuestionFormat, b: QuestionFormat) => number;
  }>
> = {
  css: {
    filterPredicate: (format) => format !== 'algo',
    orderComparator: (a, b) =>
      codingFormatRankingForNonJavaScript[b] -
      codingFormatRankingForNonJavaScript[a],
  },
  html: {
    filterPredicate: (format) => format !== 'algo',
    orderComparator: (a, b) =>
      codingFormatRankingForNonJavaScript[b] -
      codingFormatRankingForNonJavaScript[a],
  },
  js: {},
};

type Props = QuestionListProps &
  Readonly<{
    bottomContent?: InterviewsListingBottomContent;
    description: string;
    featuredQuestions: ReadonlyArray<QuestionMetadata>;
    featuredSectionTitle: string;
    logo: ReactNode;
    pageTitle: string;
    titleAddOnText?: string;
  }>;

type QuestionListProps = Readonly<{
  category: QuestionListCategory;
  codingFormat: QuestionFormat | null;
  codingQuestions: ReadonlyArray<QuestionMetadata>;
  format: QuestionUserFacingFormat | null;
  questionCompletionCount?: QuestionCompletionCount;
  quizQuestions: ReadonlyArray<QuestionMetadata>;
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
  const filterNamespace = `category:${category}:${format}`;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="w-full overflow-x-auto">
        <QuestionsUserFacingFormatTabs
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
          filterNamespace={filterNamespace}
          questionCompletionCount={questionCompletionCount}
          questions={quizQuestions}
        />
      )}
      {format === 'coding' && (
        <QuestionsUnifiedListWithFiltersAndProgress
          filterNamespace={filterNamespace}
          formatFiltersFilterPredicate={
            CategoryFilters[category].filterPredicate
          }
          formatFiltersOrderComparator={
            CategoryFilters[category].orderComparator
          }
          initialFormat={codingFormat}
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
  bottomContent,
}: Props) {
  return (
    <>
      {INTERVIEWS_REVAMP_2024 && (
        <QuestionsCategoryNavbar category={category} />
      )}
      <Container
        className={clsx(
          'flex flex-col',
          'gap-y-8 md:gap-y-10 2xl:gap-y-12',
          INTERVIEWS_REVAMP_2024 ? 'py-12' : 'py-4 md:py-6 lg:py-8 xl:py-16',
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
        {bottomContent && (
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        )}
      </Container>
    </>
  );
}
