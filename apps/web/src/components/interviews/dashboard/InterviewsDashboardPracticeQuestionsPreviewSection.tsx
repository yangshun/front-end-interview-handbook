import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import InterviewsPageFeatures from '~/components/interviews/common/InterviewsPageFeatures';
import useInterviewsQuestionsFeatures from '~/components/interviews/common/useInterviewsQuestionsFeatures';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import { QuestionCountTotal } from '~/components/interviews/questions/listings/stats/QuestionCount';
import { FormattedMessage } from '~/components/intl';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import InterviewsDashboardPracticeQuestionsPreviewQuestionsList from './InterviewsDashboardPracticeQuestionsPreviewQuestionsList';

type Props = Readonly<{
  questions: {
    codingQuestions: ReadonlyArray<QuestionMetadata>;
    quizQuestions: ReadonlyArray<QuestionMetadata>;
    systemDesignQuestions: ReadonlyArray<QuestionMetadata>;
  };
}>;

export default function InterviewsDashboardPracticeQuestionsPreviewSection({
  questions,
}: Props) {
  const intl = useIntl();
  const questionFeatures = useInterviewsQuestionsFeatures();
  const features = [
    questionFeatures.solvedByExInterviewers,
    questionFeatures.testCases,
    questionFeatures.codeInBrowser,
  ];

  return (
    <div className={clsx('flex flex-col gap-12')}>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Heading className={themeTextColor} color="custom" level="heading5">
              <FormattedMessage
                defaultMessage="Practice Questions"
                description="All front end interview practice questions"
                id="tJ0eYV"
              />
            </Heading>
            <Text className="mb-8 mt-3 block" color="secondary" size="body2">
              <FormattedMessage
                defaultMessage="The largest question bank of {questionCount}+ practice questions for front end interviews."
                description="Description for practice questions section"
                id="NXVaMh"
                values={{
                  questionCount: QuestionCountTotal,
                }}
              />
            </Text>
            <InterviewsPageFeatures features={features} />
          </div>
          <Button
            className="hidden xl:flex"
            href="/questions"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'See all questions',
              description: 'Label for see all practice questions button',
              id: 'b7LUKd',
            })}
            prefetch={null}
            size="md"
            variant="secondary"
          />
        </div>
        <Divider />
      </div>
      <Section>
        <InterviewsDashboardPracticeQuestionsPreviewQuestionsList
          questions={questions}
        />
      </Section>
    </div>
  );
}
