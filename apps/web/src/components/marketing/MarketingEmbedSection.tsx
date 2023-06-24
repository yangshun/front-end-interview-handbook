import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightLine, RiJavascriptLine } from 'react-icons/ri';
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
import type {
  QuestionJavaScript,
  QuestionMetadata,
} from '../questions/common/QuestionsTypes';
import Heading from '../ui/Heading';

function MarketingEmbedSectionBackground(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      height="1627"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 1627"
      width="1440"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <rect
        fill="#070708"
        height="918"
        transform="translate(0 332)"
        width="1440"
      />
      <g opacity="0.1">
        <g filter="url(#filter0_f_401_77475)">
          <ellipse
            cx="195.373"
            cy="477.218"
            fill="#2D2DB6"
            rx="195.373"
            ry="477.218"
            transform="matrix(-0.866025 0.5 0.5 0.866025 1170.92 451.586)"
          />
        </g>
        <g filter="url(#filter1_f_401_77475)">
          <ellipse
            cx="123.013"
            cy="445.261"
            fill="#761D6D"
            rx="123.013"
            ry="445.261"
            transform="matrix(-0.866025 0.5 0.5 0.866025 1143.73 540.043)"
          />
        </g>
        <g filter="url(#filter2_f_401_77475)">
          <path
            d="M1089.8 597.597C1119.74 645.295 1179.91 732.162 1212.81 789.138C1336.54 1003.45 1380.91 1206.06 1380.91 1206.06C1380.91 1206.06 1237.26 1043.43 1113.52 829.116C1073.11 759.112 1024.12 699.76 994.03 641.528L1089.8 597.597Z"
            fill="#C7C7FE"
          />
        </g>
      </g>
      <g opacity="0.2">
        <g filter="url(#filter3_f_401_77475)">
          <path
            d="M593 885.791L42 328L197.958 862.98L593 885.791Z"
            fill="#3C3CF2"
          />
        </g>
        <g filter="url(#filter4_f_401_77475)">
          <path
            d="M477.266 698.413L59.1289 334.539L308.096 811.725L287.349 664.898L477.266 698.413Z"
            fill="#CA31BB"
            fill-opacity="0.8"
          />
        </g>
      </g>
      <defs>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="1327.16"
          id="filter0_f_401_77475"
          width="1062.69"
          x="708.982"
          y="298.978">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_77475"
            stdDeviation="119.405"
          />
        </filter>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="1139.29"
          id="filter1_f_401_77475"
          width="851.943"
          x="833.855"
          y="417.509">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_77475"
            stdDeviation="89.554"
          />
        </filter>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="751.754"
          id="filter2_f_401_77475"
          width="530.167"
          x="922.386"
          y="525.953">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_77475"
            stdDeviation="35.8216"
          />
        </filter>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="1212.71"
          id="filter3_f_401_77475"
          width="1205.92"
          x="-285.46"
          y="0.540009">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_77475"
            stdDeviation="163.73"
          />
        </filter>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="913.799"
          id="filter4_f_401_77475"
          width="854.75"
          x="-159.178"
          y="116.232">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur_401_77475"
            stdDeviation="109.153"
          />
        </filter>
      </defs>
    </svg>
  );
}

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
      icon: RiJavascriptLine,
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
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 bottom-0 h-full w-full">
        <MarketingEmbedSectionBackground className="h-full w-full invert dark:invert-0" />
      </div>
      <Container className={clsx('relative flex flex-col gap-y-8 pt-24 pb-12')}>
        <div className="flex flex-col gap-y-6">
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
    </div>
  );
}
