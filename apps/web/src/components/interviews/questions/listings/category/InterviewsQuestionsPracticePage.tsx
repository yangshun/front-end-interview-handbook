'use client';

import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { trpc } from '~/hooks/trpc';

import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type {
  InterviewsQuestionItemMinimal,
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsQuestionsFormatsSection from '~/components/interviews/questions/listings/category/InterviewsQuestionsFormatsSection';
import InterviewsQuestionsFrameworkAndLanguageSection from '~/components/interviews/questions/listings/category/InterviewsQuestionsFrameworkAndLanguageSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

type AnchorSection = 'formats' | 'frameworks';

type Props = Readonly<{
  anchorSection?: AnchorSection;
  bottomContent?: InterviewsListingBottomContent;
  questions: {
    codingQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<InterviewsQuestionItemMinimal>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<InterviewsQuestionItemMinimal>
    >;
    quizQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
    systemDesignQuestions: ReadonlyArray<InterviewsQuestionItemMinimal>;
  };
}>;

export default function InterviewsQuestionsPracticePage({
  bottomContent,
  questions,
}: Props) {
  const intl = useIntl();

  const user = useUser();
  const questionFeatures = useInterviewsQuestionsFeatures();
  const { data: questionsProgress } = trpc.questionProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const { data: guidesProgress } = trpc.guideProgress.getAll.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );

  const features = [
    questionFeatures.codeInBrowser,
    questionFeatures.officialSolutions,
    questionFeatures.testCases,
  ];

  return (
    <div className={clsx('flex flex-col', 'gap-y-10')}>
      <InterviewsPageHeader
        description={intl.formatMessage({
          defaultMessage:
            'Practice questions for specific frameworks, languages or question formats.',
          description: 'Description for all practice questions page',
          id: 'W45B/T',
        })}
        features={features}
        title={intl.formatMessage({
          defaultMessage: 'Front end interview questions',
          description: 'Title of all practice questions page',
          id: 'o8bpfE',
        })}
      />
      <Section>
        <div className="flex flex-col gap-12">
          <InterviewsQuestionsFormatsSection
            guidesProgress={guidesProgress ?? []}
            questions={questions}
            questionsProgress={questionsProgress ?? []}
          />
          <InterviewsQuestionsFrameworkAndLanguageSection
            questions={questions}
            questionsProgress={questionsProgress ?? []}
          />
        </div>
      </Section>
      {bottomContent && (
        <>
          <Divider className="my-10" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </div>
  );
}
