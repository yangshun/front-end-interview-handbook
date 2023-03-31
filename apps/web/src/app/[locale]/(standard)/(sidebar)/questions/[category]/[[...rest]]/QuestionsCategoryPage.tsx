'use client';

import { useI18nRouter } from 'next-i18nostic';

import TextPairing from '~/components/common/TextPairing';
import PromoBanner from '~/components/global/PromoBanner';
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
import useScrollToElement from '~/components/questions/listings/useScrollToElement';
import Container from '~/components/ui/Container';
import Section from '~/components/ui/Heading/HeadingContext';

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
  pageTitle: string;
  quizQuestions: ReadonlyArray<QuestionQuizMetadata>;
}>;

function QuestionsList({
  codingFormat,
  format: formatParam,
  category: categoryParam,
  codingQuestions,
  quizQuestions,
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
        <QuestionsQuizListWithFilters mode="topic" questions={quizQuestions} />
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
          questions={codingQuestions}
        />
      )}
    </div>
  );
}

export default function QuestionsCategoryPage({
  codingFormat,
  format,
  category,
  pageTitle,
  description,
  codingQuestions,
  quizQuestions,
}: Props) {
  // Keep this component in sync with QuestionsFrameworkPage.
  const listSectionRef = useScrollToElement<HTMLHRElement>('#list', 100);

  return (
    <>
      <PromoBanner sticky={true} />
      <Container className="grid gap-y-10 py-8 md:py-12" variant="normal">
        <Section>
          <QuestionCategoryTitleSection category={category} />
        </Section>
        <hr ref={listSectionRef} />
        <TextPairing description={description} size="md" title={pageTitle} />
        <Section>
          <QuestionsList
            key={category}
            category={category}
            codingFormat={codingFormat}
            codingQuestions={codingQuestions}
            description={description}
            format={format}
            pageTitle={pageTitle}
            quizQuestions={quizQuestions}
          />
        </Section>
      </Container>
    </>
  );
}
