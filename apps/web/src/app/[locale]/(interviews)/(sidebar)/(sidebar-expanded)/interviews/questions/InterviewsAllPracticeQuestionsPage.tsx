'use client';

import clsx from 'clsx';
import type { InterviewsListingBottomContent } from 'contentlayer/generated';
import {
  RiTestTubeLine,
  RiVerifiedBadgeLine,
  RiWindow2Line,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import InterviewsFrameworkAndLanguageSection from '~/components/interviews/questions/listings/practice-questions/InterviewsFrameworkAndLanguageSection';
import InterviewsQuestionFormatsSection from '~/components/interviews/questions/listings/practice-questions/InterviewsQuestionFormatsSection';
import MDXContent from '~/components/mdx/MDXContent';
import Container from '~/components/ui/Container';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
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

export default function InterviewsAllPracticeQuestionsPage({
  questions,
  bottomContent,
}: Props) {
  const intl = useIntl();

  const user = useUser();
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
    {
      icon: RiWindow2Line,
      label: intl.formatMessage({
        defaultMessage: 'Code in browser',
        description: 'Features for all practice questions page',
        id: 'c4TqOR',
      }),
    },
    {
      icon: RiVerifiedBadgeLine,
      label: intl.formatMessage({
        defaultMessage: 'Official solutions',
        description: 'Features for all practice questions page',
        id: 'vlMgF6',
      }),
    },
    {
      icon: RiTestTubeLine,
      label: intl.formatMessage({
        defaultMessage: 'Test cases',
        description: 'Features for all practice questions page',
        id: 'vncIYl',
      }),
    },
  ];

  return (
    <Container className={clsx('flex flex-col', 'py-10', 'gap-y-12')}>
      <div>
        <div className="flex flex-col gap-4">
          <Heading level="heading4">
            {intl.formatMessage({
              defaultMessage: 'Front end interview questions',
              description: 'Title of all practice questions page',
              id: 'o8bpfE',
            })}
          </Heading>
          <Text className="block" color="subtitle" size="body1" weight="medium">
            {intl.formatMessage({
              defaultMessage:
                'Practice questions for specific frameworks, languages or question formats.',
              description: 'Description for all practice questions page',
              id: 'W45B/T',
            })}
          </Text>
        </div>
        {/* Features */}
        <div className="mt-10">
          <InterviewsPageFeatures features={features} />
        </div>

        <Divider className="mt-8" />
      </div>

      <Section>
        <InterviewsQuestionFormatsSection
          guidesProgress={guidesProgress ?? []}
          questions={questions}
          questionsProgress={questionsProgress ?? []}
        />
        <InterviewsFrameworkAndLanguageSection
          questions={questions}
          questionsProgress={questionsProgress ?? []}
        />
      </Section>

      {bottomContent && (
        <>
          <Divider className="my-8" />
          <Section>
            <MDXContent mdxCode={bottomContent.body.code} />
          </Section>
        </>
      )}
    </Container>
  );
}
