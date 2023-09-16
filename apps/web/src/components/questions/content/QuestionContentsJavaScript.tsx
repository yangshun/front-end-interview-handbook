import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import JavaScriptTestCodesEmitter from './JavaScriptTestCodesEmitter';
import QuestionCodingWorkingLanguageSelect from './QuestionCodingWorkingLanguageSelect';
import QuestionCompanies from './QuestionCompanies';
import QuestionContentProse from './QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from './QuestionContentsJavaScriptTestsCode';
import type { QuestionContentsSection } from './QuestionContentsSectionTabs';
import QuestionContentsSectionTabs from './QuestionContentsSectionTabs';
import QuestionNextQuestions from './QuestionNextQuestions';
import QuestionSimilarQuestions from './QuestionSimilarQuestions';
import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
  QuestionMetadata,
} from '../common/QuestionsTypes';
import useQuestionLogEventCopyContents from '../common/useQuestionLogEventCopyContents';
import QuestionMetadataSection from '../metadata/QuestionMetadataSection';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  hasCompletedQuestion: boolean;
  isQuestionLocked: boolean;
  language: QuestionCodingWorkingLanguage;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onChangeLanguage: (lang: QuestionCodingWorkingLanguage) => void;
  question: QuestionJavaScript;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function QuestionContentsJavaScript({
  canViewPremiumContent,
  language,
  onChangeLanguage,
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
        <header className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Heading level="heading5">{metadata.title}</Heading>
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
          {/* Only render if there's a TypeScript skeleton available */}
          {question.skeleton?.js && question.skeleton?.ts && (
            <QuestionCodingWorkingLanguageSelect
              value={language}
              onChange={(value) => {
                onChangeLanguage(value);
              }}
            />
          )}
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
              <Divider />
              <QuestionCompanies
                canViewPremiumContent={canViewPremiumContent}
                companies={metadata.companies}
              />
            </>
          )}
        {nextQuestions.length > 0 && (
          <>
            <Divider />
            <QuestionNextQuestions questions={nextQuestions} />
          </>
        )}
        {similarQuestions.length > 0 && (
          <>
            <Divider />
            <QuestionSimilarQuestions questions={similarQuestions} />
          </>
        )}
      </Section>
    </div>
  );
}
