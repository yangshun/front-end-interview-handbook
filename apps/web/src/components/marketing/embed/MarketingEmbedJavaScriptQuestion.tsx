import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScriptV2,
} from '~/components/questions/common/QuestionsTypes';
import JavaScriptTestCodesEmitter from '~/components/questions/content/JavaScriptTestCodesEmitter';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import JavaScriptCodingWorkspaceSection from '~/components/workspace/javascript/JavaScriptCodingWorkspaceSection';

import logEvent from '~/logging/logEvent';

export default function MarketingEmbedJavaScriptQuestion({
  javaScriptEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScriptV2;
}>) {
  const [language, setLanguage] = useState<QuestionCodingWorkingLanguage>('js');
  const intl = useIntl();

  useEffect(() => {
    function showTestCasesSection(
      params: Readonly<{
        index: number;
        path: ReadonlyArray<string>;
      }>,
    ) {
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
    <div className="relative flex h-full w-full flex-col gap-3">
      <JavaScriptCodingWorkspaceSection
        canViewPremiumContent={false}
        embed={true}
        language={language}
        nextQuestions={[]}
        question={javaScriptEmbedExample}
        similarQuestions={[]}
        timeoutLoggerInstance="marketing.embed.js"
        onLanguageChange={setLanguage}
      />
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
