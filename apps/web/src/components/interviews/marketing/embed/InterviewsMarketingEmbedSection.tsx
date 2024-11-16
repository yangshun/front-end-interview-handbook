'use client';

import clsx from 'clsx';
import {
  easeIn,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import gtag from '~/lib/gtag';

import { useQuestionFormatsData } from '~/data/QuestionLists';

import { useIntl } from '~/components/intl';
import Container from '~/components/ui/Container';
import FilterButton from '~/components/ui/FilterButton/FilterButton';

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
  const formats = useQuestionFormatsData();

  const tabs = [
    {
      icon: formats['user-interface'].icon,
      label: formats['user-interface'].briefName,
      value: formats['user-interface'].value,
    },
    {
      icon: formats.javascript.icon,
      label: formats.javascript.briefName,
      value: formats.javascript.value,
    },
    {
      icon: formats['system-design'].icon,
      label: formats['system-design'].briefName,
      value: formats['system-design'].value,
    },
    {
      icon: formats.quiz.icon,
      label: formats.quiz.briefName,
      value: formats.quiz.value,
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
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, {
    amount: 'some',
    once: true,
  });
  const showContents = useInView(containerRef, {
    amount: 0.2,
    once: true,
  });
  const { scrollYProgress } = useScroll({
    offset: ['start end', 'start start'],
    target: containerRef,
  });

  const animationStartScrollProgress = 0.2;
  const animationEndScrollProgress = isTablet ? 0.7 : 0.5;

  const rotateX = useTransform(
    scrollYProgress,
    [animationStartScrollProgress, animationEndScrollProgress],
    [isMobile ? 0 : 28, 0],
    { ease: easeIn },
  );
  const scaleX = useTransform(
    scrollYProgress,
    [animationStartScrollProgress, animationEndScrollProgress],
    [isMobile ? 1 : 0.8, 1],
    { ease: easeIn },
  );
  const scaleY = useTransform(
    scrollYProgress,
    [animationStartScrollProgress, animationEndScrollProgress],
    [isMobile ? 1 : 0.8, 1],
    { ease: easeIn },
  );
  const opacity = useTransform(
    scrollYProgress,
    [animationStartScrollProgress, animationEndScrollProgress],
    [isMobile ? 1 : 0.5, 1],
  );
  const marginBottom = useTransform(
    scrollYProgress,
    [animationStartScrollProgress, animationEndScrollProgress],
    [-50, 0],
  );

  const perspectiveTransform = useTransform(
    [rotateX, scaleX, scaleY],
    ([rotateXValue, scaleXValue, scaleYValue]) =>
      `perspective(1000px) rotateX(${rotateXValue}deg) scaleX(${scaleXValue}) scaleY(${scaleYValue})`,
  );

  return (
    <div
      ref={containerRef}
      className={clsx(
        'relative overflow-hidden pb-10 lg:pb-12',
        'transition-opacity',
        'duration-1000',
        'delay-1000',
        isVisible ? 'opacity-100' : 'opacity-0',
        'scroll-mt-16',
      )}>
      <Container
        className={clsx('relative', 'flex flex-col gap-y-8')}
        width="screen-xl">
        <motion.div
          style={{
            marginBottom,
            opacity,
            scaleX,
            scaleY,
            transform: perspectiveTransform,
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
          }}>
          <InterviewsMarketingHeroBrowserWindowFrame>
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
        </motion.div>
        <nav
          aria-label={intl.formatMessage({
            defaultMessage: 'Select question format',
            description:
              'Label for tabs to select sample interview question format',
            id: '50kzzq',
          })}
          className="flex justify-center gap-2">
          {tabs.map((tab) => (
            <FilterButton
              key={tab.value}
              label={tab.label}
              selected={selectedTab === tab.value}
              onClick={() => {
                gtag.event({
                  action: `homepage.hero.embed.${tab.value}.click`,
                  category: 'engagement',
                  label: tab.value,
                });
                setSelectedTab(tab.value);
                containerRef.current?.scrollIntoView({
                  behavior:
                    // Coding workspace contains some scrolling interaction as well, which
                    // interferes with a smooth scrollIntoView(), so for embed of workspaces
                    // we scroll instantly.
                    tab.value === 'javascript' || tab.value === 'user-interface'
                      ? 'auto'
                      : 'smooth',
                });
              }}
            />
          ))}
        </nav>
      </Container>
    </div>
  );
}
