import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import gtag from '~/lib/gtag';

import type {
  QuestionCodingWorkingLanguage,
  QuestionJavaScript,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import JavaScriptCodingWorkspaceDescription from '~/components/workspace/javascript/JavaScriptCodingWorkspaceDescription';

import logEvent from '~/logging/logEvent';

const JavaScriptCodingWorkspaceSection = dynamic(
  () =>
    import(
      '~/components/workspace/javascript/JavaScriptCodingWorkspaceSection'
    ),
  {
    loading: () => (
      <div className="flex grow items-center justify-center">Loading...</div>
    ),
    ssr: false,
  },
);

export default function InterviewsMarketingEmbedJavaScriptQuestion({
  javaScriptEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
}>) {
  const [language, setLanguage] = useState<QuestionCodingWorkingLanguage>('js');
  const intl = useIntl();
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  return (
    <div className="size-full relative flex flex-col">
      {laptopAndAbove ? (
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
      ) : (
        <JavaScriptCodingWorkspaceDescription
          canViewPremiumContent={false}
          description={javaScriptEmbedExample.description}
          metadata={javaScriptEmbedExample.metadata}
          nextQuestions={[]}
          similarQuestions={[]}
        />
      )}
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
            namespace: 'interviews',
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
