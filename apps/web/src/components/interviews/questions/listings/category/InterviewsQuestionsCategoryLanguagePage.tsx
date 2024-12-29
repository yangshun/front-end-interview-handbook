'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import {
  useQuestionFormatsData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsQuestionsCategoryPage from './InterviewsQuestionsCategoryPage';
import type {
  QuestionCodingFormat,
  QuestionLanguage,
  QuestionMetadata,
  QuestionUserFacingFormat,
} from '../../common/QuestionsTypes';

type Props = Omit<
  React.ComponentProps<typeof InterviewsQuestionsCategoryPage>,
  | 'category'
  | 'categoryValue'
  | 'description'
  | 'formatTabs'
  | 'questionList'
  | 'searchPlaceholder'
  | 'title'
> &
  Readonly<{
    bottomContent?: InterviewsListingBottomContent;
    codingFormat?: Readonly<{
      options: ReadonlyArray<QuestionCodingFormat>;
      value?: QuestionCodingFormat;
    }>;
    language: QuestionLanguage;
    questions: ReadonlyArray<QuestionMetadata>;
    totalQuestionsCount: number;
    userFacingFormat?: QuestionUserFacingFormat;
  }>;

export default function InterviewsQuestionsCategoryLanguagePage({
  codingFormat,
  language,
  questions,
  bottomContent,
  userFacingFormat = 'coding',
  totalQuestionsCount,
  ...props
}: Props) {
  const intl = useIntl();
  const languages = useQuestionLanguagesData();
  const questionFormats = useQuestionFormatsData();

  const categoryTabs = (
    <TabsUnderline
      size="sm"
      tabs={[
        {
          href: `/questions/${language}`,
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          }),
          value: 'coding',
        },
        {
          href: `/questions/${language}/quiz`,
          label: intl.formatMessage({
            defaultMessage: 'Quiz',
            description: 'Question format',
            id: 'doY6Fg',
          }),
          value: 'quiz',
        },
      ]}
      value={userFacingFormat ?? 'coding'}
    />
  );

  const codingFormatTabs = (() => {
    if (codingFormat == null) {
      return null;
    }

    return (
      <div className={clsx('flex flex-wrap items-center gap-2')}>
        {[
          questionFormats.javascript,
          questionFormats['user-interface'],
          questionFormats.algo,
        ]
          .filter(({ value }) =>
            codingFormat.options.find((fmt) => fmt === value),
          )
          .map(({ value, label, icon: Icon, tooltip }) => (
            <FilterButton
              key={value}
              href={`/questions/${language}/${value}`}
              icon={Icon}
              label={label}
              selected={value === codingFormat.value}
              tooltip={tooltip}
            />
          ))}
      </div>
    );
  })();

  return (
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        category="language"
        categoryTabs={categoryTabs}
        categoryValue={language}
        description={languages[language].getDescription(totalQuestionsCount)}
        formatTabs={codingFormatTabs}
        questionList={questions}
        searchPlaceholder={languages[language].getSearchPlaceholder(
          totalQuestionsCount,
        )}
        selectedCategoryTab={userFacingFormat}
        title={languages[language].longName}
        {...props}
      />
      {bottomContent && (
        <>
          <Divider />
          <MDXContent
            components={{
              QuestionsCount: () => <span>{totalQuestionsCount}</span>,
            }}
            mdxCode={bottomContent.body.code}
          />
        </>
      )}
    </div>
  );
}
