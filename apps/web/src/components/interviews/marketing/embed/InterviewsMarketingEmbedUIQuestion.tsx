'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import gtag from '~/lib/gtag';

import type {
  InterviewsQuestionInfo,
  InterviewsQuestionItemUserInterface,
  InterviewsQuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import UserInterfaceCodingWorkspaceWriteup from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceWriteup';

import logEvent from '~/logging/logEvent';

import type { QuestionFramework } from '../../questions/common/QuestionsTypes';

export type EmbedUIQuestion = Readonly<{
  frameworks: {
    angular: InterviewsQuestionItemUserInterface;
    react: InterviewsQuestionItemUserInterface;
    svelte: InterviewsQuestionItemUserInterface;
    vanilla: InterviewsQuestionItemUserInterface;
    vue: InterviewsQuestionItemUserInterface;
  };
  info: InterviewsQuestionInfo;
  metadata: InterviewsQuestionMetadata;
}>;

type Props = Readonly<{
  question: EmbedUIQuestion;
}>;

const UserInterfaceCodingWorkspaceSection = dynamic(
  () =>
    import(
      '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceSection'
    ),
  {
    loading: () => (
      <div className="flex grow items-center justify-center">Loading...</div>
    ),
    ssr: false,
  },
);

export default function InterviewsMarketingEmbedUIQuestion({
  question,
}: Props) {
  const intl = useIntl();
  const [framework, setFramework] = useState<QuestionFramework>('react');
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  return (
    <div
      className={clsx(
        'flex size-full flex-col',
        'bg-neutral-50 dark:bg-neutral-950',
      )}>
      <div className="relative flex h-0 grow flex-col lg:py-3">
        {laptopAndAbove ? (
          <UserInterfaceCodingWorkspaceSection
            key={framework}
            activeTabScrollIntoView={false}
            canViewPremiumContent={false}
            embed={true}
            mode="practice"
            nextQuestions={[]}
            question={question.frameworks[framework]}
            similarQuestions={[]}
            timeoutLoggerInstance="marketing.embed.ui"
            onFrameworkChange={setFramework}
          />
        ) : (
          <UserInterfaceCodingWorkspaceWriteup
            canViewPremiumContent={false}
            contentType="description"
            environment="embed"
            framework={framework}
            info={question.info}
            metadata={question.metadata}
            mode="practice"
            nextQuestions={[]}
            showAd={false}
            similarQuestions={[]}
            writeup={question.frameworks[framework].description}
            onFrameworkChange={setFramework}
          />
        )}
      </div>
      <Anchor
        href={question.metadata.href}
        target="_blank"
        variant="unstyled"
        onClick={() => {
          gtag.event({
            action: `homepage.hero.embed.user_interface.try_out.click`,
            category: 'engagement',
            label: 'Click here to try out the actual workspace',
          });
          logEvent('click', {
            element: 'Homepage UI question embed',
            label: 'Click here to try out the actual workspace',
            namespace: 'interviews',
          });
        }}>
        <Banner size="xs">
          {intl.formatMessage({
            defaultMessage: 'Click here to try out the actual workspace',
            description: 'Button label within embed',
            id: 'yQr+jJ',
          })}
        </Banner>
      </Anchor>
    </div>
  );
}
