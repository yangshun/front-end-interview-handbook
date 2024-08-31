import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { FormattedMessage } from 'react-intl';

import type { FocusAreas } from '~/data/focus-areas/FocusAreas';
import type { PreparationPlans } from '~/data/plans/PreparationPlans';

import type {
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import InterviewsDashboardPrepareByCompanySection from './InterviewsDashboardPrepareByCompanySection';
import InterviewsDashboardStudyPlansSection from './InterviewsDashboardStudyPlansSection';
import InterviewsDashboardPracticeQuestionsSection from './practice/InterviewsDashboardPracticeQuestionsSection';

import type { LearningSession } from '@prisma/client';

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
  focusAreas: FocusAreas;
  preparationPlans: PreparationPlans;
  questionListSessions: Array<
    LearningSession & { _count: { progress: number } }
  >;
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
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardMoreLearningSection({
  companyGuides,
  preparationPlans,
  questions,
  focusAreas,
  questionListSessions,
  questionsProgress,
}: Props) {
  return (
    <Section>
      <div className={clsx('flex flex-col gap-12')}>
        <Text color="subtitle" size="body2" weight="medium">
          <FormattedMessage
            defaultMessage="With extra time, continue working on the lists below depending on your needs!"
            description="Label for more learning section"
            id="gTOYrn"
          />
        </Text>
        <Divider />
        <div className="flex flex-col gap-3">
          <Heading className={themeTextColor} color="custom" level="heading5">
            <FormattedMessage
              defaultMessage="More time-savers"
              description="Label for more time savers"
              id="DK7QZb"
            />
          </Heading>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Some 'shortcuts' you might take if you're short on time."
              description="Description for time savers"
              id="TkHQtk"
            />
          </Text>
        </div>
        <InterviewsDashboardPrepareByCompanySection
          companyGuides={companyGuides}
          questionListSessions={questionListSessions}
        />
        <InterviewsDashboardStudyPlansSection
          preparationPlans={preparationPlans}
          questionListSessions={questionListSessions}
        />
        <Divider />
        <InterviewsDashboardPracticeQuestionsSection
          focusAreas={focusAreas}
          questionListSessions={questionListSessions}
          questions={questions}
          questionsProgress={questionsProgress}
        />
      </div>
    </Section>
  );
}
