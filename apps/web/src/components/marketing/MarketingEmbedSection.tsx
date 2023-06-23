import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import gtag from '~/lib/gtag';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import MarketingEmbedJavaScriptQuestion from './embed/MarketingEmbedJavaScriptQuestion';
import MarketingEmbedQuizQuestion from './embed/MarketingEmbedQuizQuestion';
import MarketingEmbedSystemDesignQuestion from './embed/MarketingEmbedSystemDesignQuestion';
import type { EmbedUIQuestion } from './embed/MarketingEmbedUIQuestion';
import MarketingEmbedUIQuestion from './embed/MarketingEmbedUIQuestion';
import MarketingHeroBrowserWindowFrame from './MarketingHeroBrowserWindowFrame';
import MarketingQuestionCardMarquee from './MarketingQuestionCardMarquee';
import RiJavaScriptLine from '../icons/remix/RiJavaScriptLine';
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '../questions/common/QuestionsTypes';
import Heading from '../ui/Heading';

const mockQuestion: QuestionMetadata = {
  author: null,
  companies: [],
  created: 0,
  difficulty: 'medium',
  duration: 0,
  excerpt:
    'Implement a stack data structure containing the common stack methods',
  featured: false,
  format: 'quiz',
  frameworkDefault: null,
  frameworks: [],
  href: '/dev__/scrapbook',
  importance: 'high',
  languages: ['js', 'ts'],
  nextQuestions: [],
  premium: false,
  published: false,
  ranking: 0,
  similarQuestions: [],
  slug: 'stack',
  title: 'Stack',
};

const mockQuestions = Array.from({ length: 10 }, (_, i) => ({
  ...mockQuestion,
  slug: `${mockQuestion.title}${i}`,
  title: `${mockQuestion.title} ${i}`,
}));

function useTabs() {
  const intl = useIntl();
  const questionFormat = useQuestionFormatLists();

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
      icon: RiJavaScriptLine,
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      icon: questionFormat['system-design'].icon,
      label: intl.formatMessage({
        defaultMessage: 'System Design',
        description: 'System Design question',
        id: 'zXN8kB',
      }),
      value: 'system-design',
    },
    {
      icon: questionFormat.quiz.icon,
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

export default function MarketingEmbedSection({
  javaScriptEmbedExample,
  uiEmbedExample,
}: Readonly<{
  javaScriptEmbedExample: QuestionJavaScript;
  uiEmbedExample: EmbedUIQuestion;
}>) {
  const intl = useIntl();
  const tabs = useTabs();
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <Container className={clsx('relative flex flex-col gap-y-8 pt-24 pb-12')}>
      <div className="flex flex-col gap-y-2">
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
      <MarketingQuestionCardMarquee
        periodSeconds={60}
        questions={mockQuestions}
        rows={1}
      />
      <div className="mx-auto">
        <Button
          href="/questions"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'View full questions list',
            description: 'Link to questions page',
            id: '+Eg6gK',
          })}
          size="lg"
          variant="secondary"
        />
      </div>
    </Container>
  );
}
