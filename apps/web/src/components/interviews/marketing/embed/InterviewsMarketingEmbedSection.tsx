'use client';

import clsx from 'clsx';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { RiArrowRightLine, RiJavascriptFill } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import { FormattedMessage, useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsMarketingEmbedJavaScriptQuestion from './InterviewsMarketingEmbedJavaScriptQuestion';
import type { EmbedUIQuestion } from './InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingEmbedUIQuestion from './InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingHeroBrowserWindowFrame from './InterviewsMarketingHeroBrowserWindowFrame';
import InterviewsMarketingQuestionCardMarquee from '../InterviewsMarketingQuestionCardMarquee';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '../../questions/common/QuestionsTypes';

const MarketingEmbedSystemDesignQuestion = dynamic(
  () => import('./InterviewsMarketingEmbedSystemDesignQuestion'),
  {
    loading: () => (
      <div className="flex h-[600px] grow items-center justify-center" />
    ),
    ssr: false,
  },
);
const MarketingEmbedQuizQuestion = dynamic(
  () => import('./InterviewsMarketingEmbedQuizQuestion'),
  {
    loading: () => (
      <div className="flex h-[600px] grow items-center justify-center" />
    ),
    ssr: false,
  },
);

function useTabs() {
  const intl = useIntl();
  const questionFormat = useQuestionUserFacingFormatData();

  const tabs = [
    {
      icon: questionFormat.coding.icon,
      label: intl.formatMessage({
        defaultMessage: 'UI / Components',
        description: 'User interface component questions',
        id: 'UCAeM0',
      }),
      value: 'user-interface',
    },
    {
      icon: RiJavascriptFill,
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      icon: questionFormat['system-design'].icon,
      label: questionFormat['system-design'].name,
      value: 'system-design',
    },
    {
      icon: questionFormat.quiz.icon,
      label: questionFormat.quiz.name,
      value: 'quiz',
    },
  ];

  return tabs;
}

export default function InterviewsMarketingEmbedSection({
  featuredQuestions,
  javaScriptEmbedExample,
  uiEmbedExample,
}: Readonly<{
  featuredQuestions: ReadonlyArray<QuestionMetadata>;
  javaScriptEmbedExample: QuestionJavaScript;
  uiEmbedExample: EmbedUIQuestion;
}>) {
  const intl = useIntl();
  const tabs = useTabs();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const containerRef = useRef(null);
  const showEmbed = useInView(containerRef, {
    amount: 0.5,
    once: true,
  });

  return (
    <div ref={containerRef} className="relative pb-24 pt-16 lg:pb-32">
      <Container
        className={clsx('relative flex flex-col gap-y-8')}
        variant="screen-2xl">
        <div className="flex flex-col gap-y-4 lg:gap-y-6">
          <Heading className="mx-auto" level="heading6">
            <FormattedMessage
              defaultMessage="Try our questions here"
              description="Text appearing next to the tabs of the embed on the Hero section of the Homepage. Only appears on very wide screens. Explains to the user that they can try out our interview practice questions directly right here."
              id="qhHM6u"
            />
          </Heading>
          <div className="flex justify-center">
            <TabsUnderline
              display="inline"
              label={intl.formatMessage({
                defaultMessage: 'Select question format',
                description:
                  'Label for tabs to select sample interview question format',
                id: '50kzzq',
              })}
              tabs={tabs}
              value={selectedTab}
              onSelect={(newTab: string) => {
                gtag.event({
                  action: `homepage.hero.embed.${newTab}.click`,
                  category: 'engagement',
                  label: newTab,
                });
                setSelectedTab(newTab);
              }}
            />
          </div>
        </div>
        <InterviewsMarketingHeroBrowserWindowFrame
          className={clsx(
            showEmbed ? 'animate__animated animate__flipUp' : 'flipUp--initial',
          )}>
          <div className="lg:h-[600px]">
            {showEmbed && (
              <>
                {selectedTab === 'user-interface' && (
                  <InterviewsMarketingEmbedUIQuestion
                    question={uiEmbedExample}
                  />
                )}
                {selectedTab === 'javascript' && (
                  <InterviewsMarketingEmbedJavaScriptQuestion
                    javaScriptEmbedExample={javaScriptEmbedExample}
                  />
                )}
                {selectedTab === 'system-design' && (
                  <MarketingEmbedSystemDesignQuestion />
                )}
                {selectedTab === 'quiz' && <MarketingEmbedQuizQuestion />}
              </>
            )}
          </div>
        </InterviewsMarketingHeroBrowserWindowFrame>
        {featuredQuestions.length > 0 && (
          <InterviewsMarketingQuestionCardMarquee
            periodSeconds={120}
            questions={featuredQuestions}
            rows={1}
          />
        )}
        <div className="mx-auto">
          <Button
            href="/questions"
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'View full questions list',
              description: 'Link to questions page',
              id: '+Eg6gK',
            })}
            size="md"
            variant="secondary"
          />
        </div>
      </Container>
    </div>
  );
}
