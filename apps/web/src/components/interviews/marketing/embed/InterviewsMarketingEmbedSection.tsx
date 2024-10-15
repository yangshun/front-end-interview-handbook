'use client';

import clsx from 'clsx';
import { useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { RiJavascriptFill } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import { useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import InterviewsMarketingEmbedJavaScriptQuestion from './InterviewsMarketingEmbedJavaScriptQuestion';
import type { EmbedUIQuestion } from './InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingEmbedUIQuestion from './InterviewsMarketingEmbedUIQuestion';
import InterviewsMarketingHeroBrowserWindowFrame from './InterviewsMarketingHeroBrowserWindowFrame';
import type { QuestionJavaScript } from '../../questions/common/QuestionsTypes';

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
  javaScriptEmbedExample,
  uiEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
  uiEmbedExample: EmbedUIQuestion;
}>) {
  const intl = useIntl();
  const tabs = useTabs();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const containerRef = useRef(null);
  const isVisible = useInView(containerRef, {
    amount: 'some',
    once: true,
  });
  const showContents = useInView(containerRef, {
    amount: 0.5,
    once: true,
  });

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative scale-95 pb-24 lg:pb-32',
        'transition-opacity',
        'duration-1000',
        'delay-1000',
        isVisible ? 'opacity-100' : 'opacity-0',
      )}>
      <Container
        className={clsx('relative flex flex-col gap-y-8')}
        variant="screen-2xl">
        <InterviewsMarketingHeroBrowserWindowFrame
          className={clsx(
            showContents
              ? 'animate__animated animate__flipUp'
              : 'flipUp--initial',
          )}>
          <div className="lg:h-[600px]">
            {showContents && (
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
      </Container>
    </div>
  );
}
