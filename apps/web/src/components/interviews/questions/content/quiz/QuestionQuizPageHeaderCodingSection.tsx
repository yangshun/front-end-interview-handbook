import clsx from 'clsx';
import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri';

import {
  QuestionFrameworkLabels,
  QuestionLanguageLabels,
} from '~/data/QuestionCategories';

import type {
  QuestionFramework,
  QuestionLanguage,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import { themeTextSuccessColor } from '~/components/ui/theme';

type LanguageOrFramework = QuestionFramework | QuestionLanguage;

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

  const features = [
    {
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
          questionCount: 240,
        },
      ),
    },
    {
      key: 'browser-coding',
      label: intl.formatMessage({
        defaultMessage:
          'In-browser coding workspace similar to real interview environment',
        description: 'Label for browser-based coding environment',
        id: 'aA3ERo',
      }),
    },
    {
      key: 'solutions',
      label: intl.formatMessage({
        defaultMessage: 'Reference solutions from Big Tech Ex-interviewers',
        description: 'Label for coding questions solution',
        id: 'X7DOg7',
      }),
    },
    {
      key: 'test-cases',
      label: intl.formatMessage({
        defaultMessage: 'Automated test cases',
        description: 'Label for test cases in coding questions',
        id: '+3Kd8j',
      }),
    },
    {
      key: 'ui-questions-preview',
      label: intl.formatMessage({
        defaultMessage: 'Instantly preview your code for UI questions',
        description: 'Label for UI questions preview',
        id: 'Rvu+dQ',
      }),
    },
  ];

  return (
    <div>
      <Text size="body1" weight="bold">
        {intl.formatMessage(
          {
            defaultMessage:
              'Need to practice coding {languageOrFramework} interview questions?',
            description: 'Header for coding section in interview quiz page',
            id: 'RYk7d3',
          },
          { languageOrFramework: labels[languageOrFramework] },
        )}
      </Text>
      <Text className="mb-6 mt-2 block" color="secondary" size="body2">
        {intl.formatMessage({
          defaultMessage: 'We have everything you need:',
          description: 'Subheader for coding section in interview quiz page',
          id: '04/8m8',
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
          src="/img/interviews/quiz/js-coding.png"
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
            {/* TODO(quiz): Add redirection */}
            <Button
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
                  description: 'Label for free questions',
                  id: 'Uz8Qof',
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
