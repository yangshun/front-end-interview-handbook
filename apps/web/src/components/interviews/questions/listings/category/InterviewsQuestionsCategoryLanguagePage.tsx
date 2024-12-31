'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import {
  useQuestionFormatsData,
  useQuestionLanguagesData,
} from '~/data/QuestionCategories';

import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
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
  | 'description'
  | 'features'
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
          href: languages[language].href,
          label: intl.formatMessage({
            defaultMessage: 'Coding',
            description: 'Question format',
            id: 'eJU0PN',
          }),
          value: 'coding',
        },
        {
          href: `${languages[language].href}/quiz`,
          label: questionFormats.quiz.label,
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
          .map(({ value, seoValue, label, icon: Icon, tooltip }) => {
            const isSelected = value === codingFormat.value;
            const href = isSelected
              ? languages[language].href
              : `${languages[language].href}/${seoValue}`;

            return (
              <FilterButton
                key={value}
                href={href}
                icon={Icon}
                label={label}
                selected={isSelected}
                tooltip={tooltip}
              />
            );
          })}
      </div>
    );
  })();

  const questionFeatures = useInterviewsQuestionsFeatures();
  const features = [
    questionFeatures.solvedByExInterviewers,
    questionFeatures.testCases,
    questionFeatures.codeInBrowser,
  ];

  return (
    <div className="flex flex-col gap-20">
      <InterviewsQuestionsCategoryPage
        categoryTabs={categoryTabs}
        description={languages[language].getDescription(totalQuestionsCount)}
        features={features}
        formatTabs={codingFormatTabs}
        listType={{ type: 'language', value: language }}
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
