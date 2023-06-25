import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiListUnordered } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';
import { useResizablePaneDivider } from '~/hooks/useResizablePaneDivider';

import QuestionPaneDivider from '~/components/questions/common/QuestionPaneDivider';
import QuestionPaywallSmall from '~/components/questions/common/QuestionPaywallSmall';
import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
} from '~/components/questions/common/QuestionsTypes';
import JavaScriptTestCodesEmitter from '~/components/questions/content/JavaScriptTestCodesEmitter';
import QuestionCodingWorkingLanguageSelect from '~/components/questions/content/QuestionCodingWorkingLanguageSelect';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from '~/components/questions/content/QuestionContentsJavaScriptTestsCode';
import type { QuestionContentsSection } from '~/components/questions/content/QuestionContentsSectionTabs';
import QuestionContentsSectionTabs from '~/components/questions/content/QuestionContentsSectionTabs';
import QuestionMetadataSection from '~/components/questions/metadata/QuestionMetadataSection';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBackgroundColor, themeLineColor } from '~/components/ui/theme';

import logEvent from '~/logging/logEvent';

import JavaScriptWorkspace from '../../questions/editor/JavaScriptWorkspace';

export default function MarketingEmbedJavaScriptQuestion({
  javaScriptEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
}>) {
  const [language, setLanguage] = useState<QuestionCodingWorkingLanguage>('js');
  const intl = useIntl();
  const { startDrag, size: leftPaneWidth } = useResizablePaneDivider(400);
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
    <div aria-hidden={true} className="relative flex h-full w-full flex-col">
      <style>{`@media (min-width:1024px) {
        #left-section { width: ${leftPaneWidth}px; }
      }`}</style>
      <div className="h-0 grow sm:flex">
        <div
          className={clsx('overflow-y-scroll md:border-r', themeLineColor)}
          id="left-section">
          <div className="flex flex-col gap-y-4 p-4">
            <div className="flex justify-between">
              <Text
                className="text-base font-semibold sm:text-xl"
                size="custom">
                {javaScriptEmbedExample.metadata.title}
              </Text>
              <QuestionCodingWorkingLanguageSelect
                value={language}
                onChange={(value) => {
                  setLanguage(value);
                }}
              />
            </div>
            <QuestionMetadataSection
              elements={['author', 'languages']}
              metadata={javaScriptEmbedExample.metadata}
            />
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
                      <div className="space-y-4">
                        <QuestionContentProse
                          contents={javaScriptEmbedExample.description}
                        />
                        <div className="space-y-2">
                          <div className="text-base font-medium sm:text-lg">
                            {intl.formatMessage({
                              defaultMessage: 'Companies',
                              description: 'Companies section label',
                              id: '5rd3TN',
                            })}
                          </div>
                          <QuestionPaywallSmall
                            subtitle={intl.formatMessage({
                              defaultMessage:
                                'Purchase premium to see companies which ask this question.',
                              description:
                                'Subtitle for paywall over information about companies that asked the question',
                              id: 'vp4zbB',
                            })}
                            title={intl.formatMessage({
                              defaultMessage: 'Premium Feature',
                              description:
                                'Title for paywall over information about companies that asked the question',
                              id: 'BPE/qv',
                            })}
                          />
                        </div>
                      </div>
                    );

                  case 'solution':
                    return (
                      <QuestionContentProse
                        contents={javaScriptEmbedExample.solution}
                      />
                    );

                  case 'tests':
                    return (
                      <QuestionContentsJavaScriptTestsCode
                        contents={javaScriptEmbedExample.tests}
                      />
                    );
                }
              })()}
            </div>
          </div>
          <div
            className={clsx(
              'flex items-center justify-between border-t bg-white px-4 py-2',
              themeBackgroundColor,
              themeLineColor,
            )}>
            <Button
              addonPosition="start"
              href="/prepare/coding"
              icon={RiListUnordered}
              label={intl.formatMessage({
                defaultMessage: 'All Questions',
                description: 'Link label to access all questions',
                id: 'm9168P',
              })}
              size="xs"
              variant="secondary"
            />
          </div>
        </div>
        <QuestionPaneDivider onMouseDown={(event) => startDrag(event)} />
        <JavaScriptWorkspace
          key={language}
          language={language}
          layout="horizontal"
          // Don't need show next questions for embed.
          nextQuestions={[]}
          persistCode={false}
          question={javaScriptEmbedExample}
          showCompletionButton={false}
          showToolbar={false}
        />
      </div>
      <Anchor
        href={javaScriptEmbedExample.metadata.href}
        target="_blank"
        variant="unstyled"
        onClick={() => {
          gtag.event({
            action: `homepage.hero.embed.javascript.try_out.click`,
            category: 'engagement',
            label:
              'Click here to try out the actual workspace instead of this embed',
          });
          logEvent('click', {
            element: 'Homepage JavaScript embed',
            label:
              'Click here to try out the actual workspace instead of this embed',
          });
        }}>
        <Banner size="xs">
          {intl.formatMessage({
            defaultMessage:
              'Click here to try out the actual workspace instead of this embed.',
            description: 'Button label within embed',
            id: 'Cjz59k',
          })}
        </Banner>
      </Anchor>
    </div>
  );
}
