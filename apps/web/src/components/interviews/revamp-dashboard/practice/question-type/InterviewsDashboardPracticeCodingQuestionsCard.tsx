import clsx from 'clsx';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import type {
  QuestionCodingFormat,
  QuestionFramework,
  QuestionLanguage,
  QuestionMetadata,
  QuestionSlug,
} from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionFrameworkIcon from '~/components/interviews/questions/metadata/QuestionFrameworkIcon';
import QuestionLanguageLabel from '~/components/interviews/questions/metadata/QuestionLanguageLabel';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGradientGreenYellow,
  themeGradientPinkPurple,
  themeGradientPurpleGreen,
} from '~/components/ui/theme';

import { categorizeQuestionsProgressByCodingFormat } from '~/db/QuestionsUtils';

import InterviewsDashboardPracticeCard from '../InterviewsDashboardPracticeCard';
import InterviewsDashboardProgress from '../../InterviewsDashboardProgress';

type Props = Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
  questionsProgress: ReadonlyArray<
    Readonly<{ format: string; id: string; slug: QuestionSlug }>
  > | null;
}>;

export default function InterviewsDashboardPracticeCodingQuestionsCard({
  questions,
  questionsProgress,
}: Props) {
  const intl = useIntl();
  const questionsFormat = useQuestionUserFacingFormatData();
  const codingQuestionsProgressAll =
    categorizeQuestionsProgressByCodingFormat(questionsProgress);
  const algoQuestions = questions.filter(
    (question) => question.format === 'algo',
  );
  const jsQuestions = questions.filter(
    (question) => question.format === 'javascript',
  );
  const uiQuestions = questions.filter(
    (question) => question.format === 'user-interface',
  );

  const questionsFormatsData: Record<
    QuestionCodingFormat,
    {
      completedQuestions: number;
      frameworks?: Array<QuestionFramework>;
      languages?: Array<QuestionLanguage>;
      themeGradient: string;
      title: string;
      totalQuestions: number;
    }
  > = {
    algo: {
      completedQuestions: codingQuestionsProgressAll.algo.size,
      languages: ['js', 'ts'],
      themeGradient: themeGradientGreenYellow.className,
      title: intl.formatMessage({
        defaultMessage: 'Data structures & algorithms',
        description: 'Title for coding format data structures & algo',
        id: 'qHCndx',
      }),
      totalQuestions: algoQuestions.length,
    },
    javascript: {
      completedQuestions: codingQuestionsProgressAll.javascript.size,
      languages: ['js', 'ts', 'html', 'css'],
      themeGradient: themeGradientPurpleGreen.className,
      title: intl.formatMessage({
        defaultMessage: 'Javascript utilities and APIs',
        description: 'Title for coding format utilities',
        id: 'qBLo3K',
      }),
      totalQuestions: jsQuestions.length,
    },
    'user-interface': {
      completedQuestions: codingQuestionsProgressAll['user-interface'].size,
      frameworks: ['angular', 'react', 'svelte', 'vanilla', 'vue'],
      themeGradient: themeGradientPinkPurple.className,
      title: intl.formatMessage({
        defaultMessage: 'User interfaces',
        description: 'Title for coding format user interface',
        id: 'HmKMx6',
      }),
      totalQuestions: uiQuestions.length,
    },
  };

  const questionsFormats = [
    questionsFormatsData.algo,
    questionsFormatsData.javascript,
    questionsFormatsData['user-interface'],
  ];

  return (
    <InterviewsDashboardPracticeCard
      description={intl.formatMessage({
        defaultMessage:
          'The bread and butter of technical coding interviews. For front end interviews, coding questions can be broken down into 3 types.',
        description: 'Description for coding questions',
        id: 'gJo+AD',
      })}
      href={questionsFormat.coding.href}
      icon={RiQuestionnaireLine}
      title={intl.formatMessage({
        defaultMessage: 'Coding questions',
        description: 'Title for coding questions',
        id: 'YBm903',
      })}>
      <div className="mt-4 flex flex-col gap-2">
        {questionsFormats.map((format) => (
          <div
            key={format.title}
            className={clsx(
              'flex flex-col gap-x-10 gap-y-2 xl:flex-row xl:gap-x-20',
              'rounded-lg',
              'px-4 py-3',
              themeBackgroundLayerEmphasized,
              ['border', themeBorderElementColor],
            )}>
            <div className="xl:w-[270px]">
              <Text color="subtitle" size="body2" weight="medium">
                {format.title}
              </Text>
            </div>

            <div className="flex flex-1 flex-col gap-x-10 gap-y-2 md:flex-row md:justify-between">
              {format.frameworks && (
                <>
                  <span className="sr-only" id="question-framework">
                    <FormattedMessage
                      defaultMessage="Question frameworks"
                      description="Screenreader text to indicate the question frameworks"
                      id="kUR6aL"
                    />
                  </span>
                  <div
                    aria-labelledby="question-framework"
                    className="flex gap-2">
                    {format.frameworks.map((framework) => (
                      <QuestionFrameworkIcon
                        key={framework}
                        className="size-6"
                        framework={framework}
                      />
                    ))}
                  </div>
                </>
              )}
              {format.languages && (
                <>
                  <span className="sr-only" id="question-language">
                    <FormattedMessage
                      defaultMessage="Question languages"
                      description="Screenreader text to indicate the question languages"
                      id="BHMys9"
                    />
                  </span>
                  <div
                    aria-labelledby="question-language"
                    className="flex gap-2">
                    {format.languages?.map((language) => (
                      <QuestionLanguageLabel
                        key={language}
                        className="dark:bg-neutral-900/40"
                        value={language}
                      />
                    ))}
                  </div>
                </>
              )}

              <InterviewsDashboardProgress
                completed={format.completedQuestions}
                progressClassName={format.themeGradient}
                title={format.title}
                total={format.totalQuestions}
                type="question"
              />
            </div>
          </div>
        ))}
      </div>
    </InterviewsDashboardPracticeCard>
  );
}
