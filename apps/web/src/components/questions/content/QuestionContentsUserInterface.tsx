import { useIntl } from 'react-intl';

import { useQuestionTechnologyLists } from '~/data/QuestionFormats';

import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Select from '~/components/ui/Select';
import type { TabItem } from '~/components/ui/Tabs';
import Tabs from '~/components/ui/Tabs';

import { useI18nRouter } from '~/next-i18nostic/src';

import QuestionCompanies from './QuestionCompanies';
import QuestionContentProse from './QuestionContentProse';
import QuestionNextQuestions from './QuestionNextQuestions';
import QuestionSimilarQuestions from './QuestionSimilarQuestions';
import QuestionMetadataSection from '../common/QuestionMetadataSection';
import type {
  QuestionFramework,
  QuestionMetadata,
  QuestionUserInterface,
} from '../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../common/useQuestionLogEventCopyContents';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  hasCompletedQuestion: boolean;
  isQuestionLocked: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionUserInterface;
  section: QuestionContentsUserInterfaceSection;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export type QuestionContentsUserInterfaceSection = 'description' | 'solution';

function restParamForDescription(
  frameworkDefault: QuestionFramework | null,
  framework: QuestionFramework,
) {
  return framework === (frameworkDefault ?? 'vanilla') ? '' : framework;
}

function restParamForSolution(
  frameworkDefault: QuestionFramework | null,
  framework: QuestionFramework,
) {
  return (
    framework === (frameworkDefault ?? 'vanilla')
      ? ['solution']
      : [framework, 'solution']
  ).join('/');
}

export default function QuestionContentsUserInterface({
  canViewPremiumContent,
  hasCompletedQuestion,
  isQuestionLocked,
  question,
  section,
  nextQuestions,
  similarQuestions,
}: Props) {
  const intl = useIntl();
  const router = useI18nRouter();
  const questionTechnologyLists = useQuestionTechnologyLists();
  const { description, framework, metadata, solution } = question;
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const SECTIONS: ReadonlyArray<TabItem<QuestionContentsUserInterfaceSection>> =
    [
      {
        href: `/questions/user-interface/${
          question.metadata.slug
        }/${restParamForDescription(metadata.frameworkDefault, framework)}`,
        label: intl.formatMessage({
          defaultMessage: 'Description',
          description: 'Header for the question description section',
          id: 'NZo2FG',
        }),
        value: 'description',
      },
      {
        href: `/questions/user-interface/${
          question.metadata.slug
        }/${restParamForSolution(metadata.frameworkDefault, framework)}`,
        label: intl.formatMessage({
          defaultMessage: 'Solution',
          description: 'Header for the question solution section',
          id: 'px5rU7',
        }),
        value: 'solution',
      },
    ];

  return (
    <div ref={copyRef} className="space-y-8">
      <section className="mt-8 flex h-full min-w-0 flex-1 flex-col lg:order-last">
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Heading level="heading5">
              <span>
                {metadata.title}
                {section === 'solution' && ' Solution'}
              </span>
            </Heading>
            {hasCompletedQuestion && (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Completed',
                  description:
                    'Label indicating that the question has been completed by the user',
                  id: '94oFfy',
                })}
                variant="success"
              />
            )}
          </div>
          <Select
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Framework',
              description:
                'Label for the selection dropdown used to select the framework to use for the question',
              id: 'eeWLAW',
            })}
            options={question.metadata.frameworks.map((frameworkItem) => ({
              label: questionTechnologyLists[frameworkItem.framework].name,
              value: frameworkItem.framework,
            }))}
            size="sm"
            value={question.framework}
            onChange={(value) => {
              const frameworkValue = value as QuestionFramework;
              const frameworkItem = question.metadata.frameworks.find(
                ({ framework: frameworkItemValue }) =>
                  frameworkItemValue === frameworkValue,
              );

              if (frameworkItem == null) {
                return;
              }
              router.push(
                `/questions/user-interface/${metadata.slug}/${
                  section === 'description'
                    ? restParamForDescription(
                        metadata.frameworkDefault,
                        frameworkValue,
                      )
                    : restParamForSolution(
                        metadata.frameworkDefault,
                        frameworkValue,
                      )
                }`,
              );
            }}
          />
        </header>
      </section>
      <Section>
        <QuestionMetadataSection metadata={metadata} />
        <div className="mt-3 sm:mt-4">
          <div>
            <nav className="-mb-px flex space-x-4">
              <Tabs
                label={intl.formatMessage({
                  defaultMessage: 'Select question section',
                  description:
                    'Label for tabs to select question section to display in the coding workspace (e.g. solutions, tests, or others)',
                  id: 'KaGCVb',
                })}
                size="sm"
                tabs={SECTIONS}
                value={section}
              />
            </nav>
          </div>
        </div>
        <div>
          {(() => {
            switch (section) {
              case 'description':
                return (
                  <QuestionContentProse
                    contents={description}
                    isContentsHidden={isQuestionLocked}
                  />
                );
              case 'solution':
                return (
                  <QuestionContentProse
                    contents={solution}
                    isContentsHidden={isQuestionLocked}
                  />
                );
            }
          })()}
        </div>
        {!isQuestionLocked &&
          metadata.companies &&
          metadata.companies.length > 0 && (
            <>
              <hr />
              <QuestionCompanies
                canViewPremiumContent={canViewPremiumContent}
                question={metadata}
              />
            </>
          )}
        {nextQuestions.length > 0 && (
          <>
            <hr />
            <QuestionNextQuestions questions={nextQuestions} />
          </>
        )}
        {similarQuestions.length > 0 && (
          <>
            <hr />
            <QuestionSimilarQuestions questions={similarQuestions} />
          </>
        )}
      </Section>
    </div>
  );
}
