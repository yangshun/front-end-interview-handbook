import {
  RiArrowRightLine,
  RiBugLine,
  RiFolder4Line,
  RiGlobalLine,
  RiNodeTree,
  RiQuestionnaireLine,
  RiShieldKeyholeLine,
} from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Marquee from '~/components/ui/Marquee';
import Text from '~/components/ui/Text';

import type { QuestionMetadata } from '../questions/common/QuestionsTypes';
import QuestionCard from '../questions/listings/auxilliary/QuestionCard';
import QuestionListingTopicFilters from '../questions/listings/filters/QuestionListingTopicFilters';

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
  key: i,
  title: `${mockQuestion.title} ${i}`,
}));

function QuestionCardMarquee() {
  return (
    <div className="grid grid-cols-1 self-stretch">
      <Marquee periodSeconds={60} startEndGap={16}>
        <div className="grid grid-flow-col grid-rows-2 gap-4 whitespace-normal motion-reduce:pl-[80px]">
          {mockQuestions.map((metadata) => (
            <div
              key={metadata.key}
              className="h-auto w-[250px] even:[transform:translateX(-80px)]">
              <QuestionCard metadata={metadata} showArrow={false} />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}

export default function MarketingMarqueeQuestionListSection() {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col gap-1">
        <Heading level="heading3">
          Javascript questions{' '}
          <Text
            className="text-xl"
            color="secondary"
            size="custom"
            weight="bold">
            (with TypeScript support)
          </Text>
        </Heading>
        <Text color="secondary">
          Practice coding out common library APIs, utilities, data structures
          and algorithms in JavaScript or TypeScript
        </Text>
      </div>
      <div className="flex flex-col items-center gap-8">
        <QuestionListingTopicFilters
          section={{
            id: '',
            matches: () => true,
            name: '',
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onChange: () => {},
            options: [
              {
                icon: RiFolder4Line,
                label: 'All topics',
                value: 'all-topics',
              },
              {
                icon: RiGlobalLine,
                label: 'Internationalization',
                value: 'internationalization',
              },
              {
                icon: RiShieldKeyholeLine,
                label: 'Security',
                value: 'security',
              },
              {
                icon: RiBugLine,
                label: 'Testing',
                value: 'Testing',
              },
              {
                icon: RiFolder4Line,
                label: 'All questions',
                value: 'all-questions',
              },
              {
                icon: RiGlobalLine,
                label: 'Coding',
                value: 'coding',
              },
              {
                icon: RiQuestionnaireLine,
                label: 'Quiz',
                value: 'quiz',
              },
              {
                icon: RiNodeTree,
                label: 'System design',
                value: 'system-design',
              },
            ],
          }}
          values={new Set<string>()}
        />
        <QuestionCardMarquee />
        <Button
          icon={RiArrowRightLine}
          label="View full questions list"
          size="md"
          variant="secondary"
        />
      </div>
    </div>
  );
}
