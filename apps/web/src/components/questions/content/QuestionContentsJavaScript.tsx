import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import JavaScriptTestCodesEmitter from './JavaScriptTestCodesEmitter';
import QuestionCompanies from './QuestionCompanies';
import QuestionContentProse from './QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from './QuestionContentsJavaScriptTestsCode';
import type { QuestionContentsSection } from './QuestionContentsSectionTabs';
import QuestionContentsSectionTabs from './QuestionContentsSectionTabs';
import QuestionNextQuestions from './QuestionNextQuestions';
import QuestionSimilarQuestions from './QuestionSimilarQuestions';
import QuestionMetadataSection from '../common/QuestionMetadataSection';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../common/useQuestionLogEventCopyContents';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  hasCompletedQuestion: boolean;
  isQuestionLocked: boolean;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  question: QuestionJavaScript;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function QuestionContentsJavaScript({
  canViewPremiumContent,
  hasCompletedQuestion,
  isQuestionLocked,
  similarQuestions,
  nextQuestions,
  question,
}: Props) {
  // Remember to update the MarketingEmbed as well.
  const intl = useIntl();
  const { description, metadata, solution, tests } = question;
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const [selectedSection, setSelectedSection] =
    useState<QuestionContentsSection>('description');

  useEffect(() => {
    function showTestCasesSection(
      params: Readonly<{
        index: number;
        path: ReadonlyArray<string>;
      }>,
    ) {
      setSelectedSection('tests');
      setTimeout(() => {
        JavaScriptTestCodesEmitter.emit('focus_on_test', params);
      }, 100);
    }
    JavaScriptTestCodesEmitter.on('show_test_cases', showTestCasesSection);

    return () => {
      JavaScriptTestCodesEmitter.off('show_test_cases', showTestCasesSection);
    };
  }, []);

  return (
    <div ref={copyRef} className="space-y-8">
      <section className="mt-8 flex h-full min-w-0 flex-1 flex-col lg:order-last">
        <header>
          <div className="flex items-center space-x-4">
            <Heading className="text-3xl font-bold leading-6 text-slate-900">
              <span>{metadata.title}</span>
            </Heading>
            {hasCompletedQuestion && (
              <Badge
                label={intl.formatMessage({
                  defaultMessage: 'Completed',
                  description:
                    'Label indicating that the question has been completed',
                  id: 'iIQL6V',
                })}
                variant="success"
              />
            )}
          </div>
        </header>
      </section>
      <Section>
        <QuestionMetadataSection metadata={metadata} />
        <div className="mt-3 sm:mt-4">
          <QuestionContentsSectionTabs
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
          />
        </div>
        <div>
          {(() => {
            switch (selectedSection) {
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
              case 'tests':
                return (
                  <QuestionContentsJavaScriptTestsCode
                    contents={tests}
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
