'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';

import { trpc } from '~/hooks/trpc';

import InterviewsPageHeader from '~/components/interviews/common/InterviewsPageHeader';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsFrameworkAndLanguageSection from '~/components/interviews/questions/listings/practice/InterviewsFrameworkAndLanguageSection';
import InterviewsQuestionFormatsSection from '~/components/interviews/questions/listings/practice/InterviewsQuestionFormatsSection';
import { useIntl } from '~/components/intl';
import MDXContent from '~/components/mdx/MDXContent';
import Divider from '~/components/ui/Divider';
import Section from '~/components/ui/Heading/HeadingContext';

import { useUser } from '@supabase/auth-helpers-react';

type AnchorSection = 'formats' | 'frameworks';

type Props = Readonly<{
  anchorSection?: AnchorSection;
  bottomContent?: InterviewsListingBottomContent;
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    frameworkQuestions: Record<
      QuestionFramework,
      ReadonlyArray<QuestionMetadata>
    >;
    languageQuestions: Record<
      QuestionLanguage,
      ReadonlyArray<QuestionMetadata>
    >;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
}>;

export default function InterviewsPracticeQuestionsPage({
  questions,
  bottomContent,
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
          <InterviewsQuestionFormatsSection
            guidesProgress={guidesProgress ?? []}
            questions={questions}
            questionsProgress={questionsProgress ?? []}
          />
          <InterviewsFrameworkAndLanguageSection
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
