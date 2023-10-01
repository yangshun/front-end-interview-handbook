'use client';

import { useState } from 'react';
import { useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import type {
  QuestionMetadata,
  QuestionUserInterfaceV2,
} from '~/components/questions/common/QuestionsTypes';
import Anchor from '~/components/ui/Anchor';
import Banner from '~/components/ui/Banner';
import UserInterfaceCodingWorkspaceSection from '~/components/workspace/user-interface/UserInterfaceCodingWorkspaceSection';

import logEvent from '~/logging/logEvent';

import MarketingCodeMirrorTheme from '../coding/MarketingCodeMirrorTheme';
import type { QuestionFramework } from '../../questions/common/QuestionsTypes';

export type EmbedUIQuestion = Readonly<{
  angular: QuestionUserInterfaceV2;
  metadata: QuestionMetadata;
  react: QuestionUserInterfaceV2;
  svelte: QuestionUserInterfaceV2;
  vanilla: QuestionUserInterfaceV2;
  vue: QuestionUserInterfaceV2;
}>;

type Props = Readonly<{
  question: EmbedUIQuestion;
}>;

export default function MarketingEmbedUIQuestion({ question }: Props) {
  const intl = useIntl();
  const [framework, setFramework] = useState<QuestionFramework>('react');

  return (
    <div className="relative flex h-full w-full flex-col gap-3">
      <UserInterfaceCodingWorkspaceSection
        key={framework}
        activeTabScrollIntoView={false}
        canViewPremiumContent={false}
        embed={true}
        mode="practice"
        nextQuestions={[]}
        question={question[framework]}
        similarQuestions={[]}
        theme={MarketingCodeMirrorTheme}
        timeoutLoggerInstance="marketing.embed.ui"
        onFrameworkChange={(value) => {
          setFramework(value);
        }}
      />
      <Anchor
        href={question.metadata.href}
        target="_blank"
        variant="unstyled"
        onClick={() => {
          gtag.event({
            action: `homepage.hero.embed.user_interface.try_out.click`,
            category: 'engagement',
            label:
              'Click here to try out the actual workspace instead of this embed',
          });
          logEvent('click', {
            element: 'Homepage UI question embed',
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
