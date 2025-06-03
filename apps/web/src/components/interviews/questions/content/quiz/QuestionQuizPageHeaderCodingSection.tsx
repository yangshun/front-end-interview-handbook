import clsx from 'clsx';
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri';

import {
  QuestionFrameworkLabels,
  QuestionFrameworkRawToSEOMapping,
  QuestionLanguageLabels,
  QuestionLanguageRawToSEOMapping,
} from '~/data/QuestionCategories';

import type {
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import {
  QuestionCountCSSCoding,
  QuestionCountHTMLCoding,
  QuestionCountJavaScriptCoding,
  QuestionCountReactCoding,
  QuestionCountTypeScriptCoding,
} from '~/components/interviews/questions/listings/stats/QuestionCount';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

import { roundQuestionCountToNearestTen } from '~/db/QuestionsUtils';

type LanguageOrFramework =
  | Extract<QuestionFramework, 'react'>
  | QuestionLanguage;

type Props = Readonly<{
  languageOrFramework: LanguageOrFramework;
}>;

export default function QuestionQuizPageHeaderCodingSection({
  languageOrFramework,
}: Props) {
  const intl = useIntl();

  const labels: Record<LanguageOrFramework, string> = {
    ...QuestionLanguageLabels,
    ...QuestionFrameworkLabels,
  };

  const codingFeatures = useCodingFeatures(languageOrFramework);

  const features = [
    codingFeatures.questions,
    codingFeatures['browser-coding'],
    codingFeatures.solutions,
    codingFeatures['test-cases'],
    ...(languageOrFramework === 'js'
      ? [codingFeatures['code-preview']]
      : [codingFeatures['ui-preview']]),
  ];

  const codingQuestionsHref = Object.keys(
    QuestionFrameworkRawToSEOMapping,
  ).includes(languageOrFramework)
    ? `/questions/${QuestionFrameworkRawToSEOMapping[languageOrFramework as QuestionFramework]}`
    : `/questions/${QuestionLanguageRawToSEOMapping[languageOrFramework as QuestionLanguage]}`;

  function getImageSrc(value: LanguageOrFramework) {
    switch (value) {
      case 'js':
        return '/img/interviews/quiz/js-coding.png';
      case 'ts':
        return '/img/interviews/quiz/ts-coding.png';
      case 'html':
        return '/img/interviews/quiz/html-coding.png';
      case 'css':
        return '/img/interviews/quiz/css-coding.png';
      default:
        return '/img/interviews/quiz/react-coding.png';
    }
  }

  return (
    <div>
      <Text size="body1" weight="bold">
        {intl.formatMessage(
          {
            defaultMessage:
              "If you're looking for {languageOrFramework} coding questions -",
            description: 'Header for coding section in interview quiz page',
            id: 'GPQg5j',
          },
          { languageOrFramework: labels[languageOrFramework] },
        )}
      </Text>
      <Text className="mb-6 mt-2 block" color="secondary" size="body2">
        {intl.formatMessage({
          defaultMessage: "We've got you covered as well, with:",
          description: 'Subheader for coding section in interview quiz page',
          id: 'P6sA19',
        })}
      </Text>
      <div className="flex flex-col gap-6 sm:flex-row">
        <Img
          alt={intl.formatMessage({
            defaultMessage: 'Javascript coding',
            description: 'Alt text for ads in content placement preview',
            id: 'ofJOh2',
          })}
          className={clsx(
            'object-cover object-left',
            'h-full w-full sm:h-[196px] sm:w-[234px] lg:w-[343px]',
          )}
          src={getImageSrc(languageOrFramework)}
        />
        <div className="space-y-6">
          <ul className="flex flex-col gap-2.5" role="list">
            {features.map((item) => (
              <li key={item.key} className="flex items-center gap-x-2">
                <RiCheckLine
                  aria-hidden="true"
                  className={clsx('size-3.5 shrink-0', themeTextSuccessColor)}
                />
                <Text color="secondary" size="body2">
                  {item.label}
                </Text>
              </li>
            ))}
          </ul>
          <div className="space-x-6">
            <Button
              href={codingQuestionsHref}
              icon={RiArrowRightLine}
              label={intl.formatMessage({
                defaultMessage: 'Get Started',
                description: 'Label for get started button',
                id: 'XCqQUO',
              })}
              size="sm"
              variant="primary"
            />
            <Text color="secondary" size="body3">
              {intl.formatMessage(
                {
                  defaultMessage: 'Join {engineersCount}+ engineers',
                  description: 'Label for total engineers using the platform',
                  id: 'jL6ul2',
                },
                { engineersCount: '50,000' },
              )}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

function useCodingFeatures(languageOrFramework: LanguageOrFramework) {
  const intl = useIntl();
  const labels: Record<LanguageOrFramework, string> = {
    ...QuestionLanguageLabels,
    ...QuestionFrameworkLabels,
  };
  const questionCount: Record<LanguageOrFramework, number> = {
    css: QuestionCountCSSCoding,
    html: QuestionCountHTMLCoding,
    js: QuestionCountJavaScriptCoding,
    react: QuestionCountReactCoding,
    ts: QuestionCountTypeScriptCoding,
  };

  return {
    'browser-coding': {
      key: 'browser-coding',
      label: intl.formatMessage({
        defaultMessage:
          'In-browser coding workspace that mimics real interview conditions',
        description: 'Label for browser-based coding environment',
        id: 'YEEd13',
      }),
    },
    'code-preview': {
      key: 'ui-questions-preview',
      label: intl.formatMessage({
        defaultMessage: 'Instantly preview your code for UI questions',
        description: 'Label for code preview features',
        id: 'zI3w61',
      }),
    },
    questions: {
      key: 'questions',
      label: intl.formatMessage(
        {
          defaultMessage:
            '{questionCount}+ {languageOrFramework} Coding Questions',
          description: 'Number of questions in coding section',
          id: 'jrT2Ow',
        },
        {
          languageOrFramework: labels[languageOrFramework],
          questionCount: roundQuestionCountToNearestTen(
            questionCount[languageOrFramework],
          ),
        },
      ),
    },
    solutions: {
      key: 'solutions',
      label: intl.formatMessage({
        defaultMessage:
          'Reference solutions from ex-interviewers at Big Tech companies',
        description: 'Label for coding questions solution',
        id: '71Hlcg',
      }),
    },
    'test-cases': {
      key: 'test-cases',
      label: intl.formatMessage({
        defaultMessage: 'One-click automated, transparent test cases',
        description: 'Label for test cases in coding questions',
        id: 'Q891Ht',
      }),
    },
    'ui-preview': {
      key: 'ui-questions-preview',
      label: intl.formatMessage({
        defaultMessage: 'Instant UI preview for UI-related questions',
        description: 'Label for code preview features',
        id: '2TPnld',
      }),
    },
  };
}
