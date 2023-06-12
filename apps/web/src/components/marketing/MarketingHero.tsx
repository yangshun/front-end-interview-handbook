import clsx from 'clsx';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import TabsHero from '~/components/ui/Tabs/TabsHero';

import MarketingEmbedJavaScriptQuestion from './embed/MarketingEmbedJavaScriptQuestion';
import MarketingEmbedQuizQuestion from './embed/MarketingEmbedQuizQuestion';
import MarketingEmbedSystemDesignQuestion from './embed/MarketingEmbedSystemDesignQuestion';
import type { EmbedUIQuestion } from './embed/MarketingEmbedUIQuestion';
import MarketingEmbedUIQuestion from './embed/MarketingEmbedUIQuestion';
import MarketingHeroBrowserWindowFrame from './MarketingHeroBrowserWindowFrame';
import AmazonLogo from '../icons/AmazonLogo';
import GoogleLogo from '../icons/GoogleLogo';
import MetaLogo from '../icons/MetaLogo';
import type { QuestionJavaScript } from '../questions/common/QuestionsTypes';

function useTabs() {
  const intl = useIntl();
  const tabs = [
    {
      label: intl.formatMessage({
        defaultMessage: 'UI / Components',
        description: 'User interface component questions',
        id: 'UCAeM0',
      }),
      value: 'user-interface',
    },
    {
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'System Design',
        description: 'System Design question',
        id: 'zXN8kB',
      }),
      value: 'system-design',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Quiz',
        description: 'Quiz questions',
        id: 'qXxpdK',
      }),
      value: 'quiz',
    },
  ];

  return tabs;
}

export default function MarketingHeroNew({
  javaScriptEmbedExample,
  uiEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
  uiEmbedExample: EmbedUIQuestion;
}>) {
  const tabs = useTabs();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);
  const intl = useIntl();

  return (
    <div className="relative overflow-hidden bg-white bg-cover">
      <img
        alt=""
        aria-hidden={true}
        className="origin=[0_100%] absolute w-full will-change-transform"
        src="/img/marketing/hero.jpg"
        style={{
          height: 300,
          opacity: '20%',
          top: '30%',
          transform: `skewY(-6deg)`,
        }}
      />
      <div className="relative pt-0 pb-8 sm:pb-16 md:pb-20">
        <div className={clsx('mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:pt-24')}>
          <div className="text-center">
            <div className="space-y-4 pb-6 text-xs font-medium text-neutral-400 sm:text-sm lg:space-y-5 lg:pb-8 lg:text-sm">
              <p>
                <FormattedMessage
                  defaultMessage="Contributed by ex-interviewers at"
                  description="Text above logos on Hero section of HomePage. To let users know that ex-interviewers at the stated companies have contributed expertise to this platform."
                  id="aQKVD4"
                />
              </p>
              <span className="flex items-center justify-center space-x-6 lg:space-x-8">
                <GoogleLogo
                  className="h-[1.5rem] text-neutral-500 lg:h-[2.1rem]"
                  title={intl.formatMessage({
                    defaultMessage: 'Google logo',
                    description: 'Google company logo',
                    id: 'da4RLj',
                  })}
                />
                <AmazonLogo
                  className="mt-1 h-6 text-neutral-500 lg:mt-2 lg:h-7"
                  title={intl.formatMessage({
                    defaultMessage: 'Amazon logo',
                    description: 'Amazon company logo',
                    id: 'nai6YT',
                  })}
                />
                <MetaLogo
                  className="h-4 text-neutral-500 lg:mb-2 lg:h-5"
                  title={intl.formatMessage({
                    defaultMessage: 'Meta logo',
                    description: 'Meta company logo',
                    id: 'a8ETQr',
                  })}
                />
              </span>
            </div>
            <Heading className="mx-auto max-w-7xl" level="heading1">
              <FormattedMessage
                defaultMessage="The ultimate <span>Front End Interview</span> <span2>preparation platform</span2>."
                description="Title of Hero section on Homepage. To describe the product in 1 line so that users understand it immediately."
                id="8q3l4q"
                values={{
                  span: (chunks) => (
                    <span className="from-brand-dark my-1 inline-block bg-gradient-to-l to-pink-500 bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  ),
                  span2: (chunks) => (
                    <span className="whitespace-nowrap">{chunks}</span>
                  ),
                }}
              />
            </Heading>
            <p className="mx-auto mt-8 max-w-md text-base text-neutral-700 sm:text-lg md:mt-12 md:max-w-3xl md:text-xl xl:text-xl">
              <FormattedMessage
                defaultMessage="We help you ace every front end interview by <strong>mastering your fundamentals</strong>. <span>Built by</span> ex-FAANG Senior Front End Engineers."
                description="Subtitle for Hero section on Homepage. Explains in more detail what the product does in order to attract the user to read on."
                id="AGwpnL"
                values={{
                  span: (chunks) => (
                    <span className="whitespace-nowrap">{chunks}</span>
                  ),
                  strong: (chunks) => (
                    <strong className="whitespace-nowrap">{chunks}</strong>
                  ),
                }}
              />
            </p>
          </div>
        </div>
      </div>
      <div className={clsx('relative')}>
        <Container>
          <div className="mx-auto flex items-center">
            <p className="mb-4 hidden w-1/4 justify-end text-base text-neutral-500 sm:px-4 sm:text-sm md:text-base lg:text-xl xl:flex">
              <FormattedMessage
                defaultMessage="Try our questions here:"
                description="Text appearing next to the tabs of the embed on the Hero section of the Homepage. Only appears on very wide screens. Explains to the user that they can try out our interview practice questions directly right here."
                id="nuO9Ny"
              />
            </p>
            <div className="mx-auto flex w-3/4 grow px-4 pb-4 sm:px-6">
              <TabsHero
                label={intl.formatMessage({
                  defaultMessage: 'Select question format',
                  description:
                    'Label for tabs to select sample interview question format',
                  id: '50kzzq',
                })}
                tabs={tabs}
                value={selectedTab}
                onSelect={(newTab) => {
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
        </Container>
        <Container className="pb-16">
          <MarketingHeroBrowserWindowFrame>
            <div style={{ height: 500 }}>
              {selectedTab === 'user-interface' && (
                <MarketingEmbedUIQuestion question={uiEmbedExample} />
              )}
              {selectedTab === 'javascript' && (
                <MarketingEmbedJavaScriptQuestion
                  javaScriptEmbedExample={javaScriptEmbedExample}
                />
              )}
              {selectedTab === 'system-design' && (
                <MarketingEmbedSystemDesignQuestion />
              )}
              {selectedTab === 'quiz' && <MarketingEmbedQuizQuestion />}
            </div>
          </MarketingHeroBrowserWindowFrame>
        </Container>
      </div>
    </div>
  );
}
