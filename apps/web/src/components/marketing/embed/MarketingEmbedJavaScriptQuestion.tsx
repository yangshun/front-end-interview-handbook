import { useState } from 'react';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
} from '~/components/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import JavaScriptCodingWorkspaceDescription from '~/components/workspace/javascript/JavaScriptCodingWorkspaceDescription';
import JavaScriptCodingWorkspaceSection from '~/components/workspace/javascript/JavaScriptCodingWorkspaceSection';

import logEvent from '~/logging/logEvent';

export default function MarketingEmbedJavaScriptQuestion({
  javaScriptEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
}>) {
  const [language, setLanguage] = useState<QuestionCodingWorkingLanguage>('js');
  const intl = useIntl();

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="h-0 grow overflow-y-auto lg:hidden">
        <JavaScriptCodingWorkspaceDescription
          canViewPremiumContent={false}
          description={javaScriptEmbedExample.description}
          metadata={javaScriptEmbedExample.metadata}
          nextQuestions={[]}
          similarQuestions={[]}
        />
      </div>
      <div className="hidden lg:contents">
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