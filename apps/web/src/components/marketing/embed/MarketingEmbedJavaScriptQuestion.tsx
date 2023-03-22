import { useEffect, useState } from 'react';

import gtag from '~/lib/gtag';
import { useResizablePaneDivider } from '~/hooks/useResizablePaneDivider';

import QuestionMetadataSection from '~/components/questions/common/QuestionMetadataSection';
import QuestionPaneDivider from '~/components/questions/common/QuestionPaneDivider';
import QuestionPaywallSmall from '~/components/questions/common/QuestionPaywallSmall';
import type { QuestionJavaScript } from '~/components/questions/common/QuestionsTypes';
import JavaScriptTestCodesEmitter from '~/components/questions/content/JavaScriptTestCodesEmitter';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionContentsJavaScriptTestsCode from '~/components/questions/content/QuestionContentsJavaScriptTestsCode';
import type { QuestionContentsSection } from '~/components/questions/content/QuestionContentsSectionTabs';
import QuestionContentsSectionTabs from '~/components/questions/content/QuestionContentsSectionTabs';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import Button from '~/components/ui/Button';

import JavaScriptWorkspace from '../../questions/editor/JavaScriptWorkspace';

import { ListBulletIcon } from '@heroicons/react/24/outline';

export default function MarketingEmbedJavaScriptQuestion({
  javaScriptEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
}>) {
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
          className="overflow-y-scroll border-slate-200 md:border-r"
          id="left-section">
          <div className="space-y-4 py-4 px-4">
            <div className="text-xl font-semibold sm:text-2xl">
              {javaScriptEmbedExample.metadata.title}
            </div>
            <QuestionMetadataSection
              metadata={javaScriptEmbedExample.metadata}
              showAuthor={false}
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
                            Companies
                          </div>
                          <QuestionPaywallSmall
                            subtitle="Purchase premium to see companies which ask this question."
                            title="Premium Feature"
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
          <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-2">
            <Button
              addonPosition="start"
              href="/prepare/coding"
              icon={ListBulletIcon}
              label="All Questions"
              size="sm"
              variant="tertiary"
            />
          </div>
        </div>
        <QuestionPaneDivider onMouseDown={(event) => startDrag(event)} />
        <JavaScriptWorkspace
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
        }}>
        <Banner size="xs">
          Click here to try out the actual workspace instead of this embed.
        </Banner>
      </Anchor>
    </div>
  );
}
