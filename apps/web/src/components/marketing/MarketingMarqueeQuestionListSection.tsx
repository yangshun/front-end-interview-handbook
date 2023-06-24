import type { ReactNode } from 'react';
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
import Text from '~/components/ui/Text';

import MarketingQuestionCardMarquee from './MarketingQuestionCardMarquee';
import type { QuestionMetadata } from '../questions/common/QuestionsTypes';
import QuestionListingTopicFilters from '../questions/listings/filters/QuestionListingTopicFilters';

type Props = Readonly<{
  description: ReactNode;
  href: string;
  questions: ReadonlyArray<QuestionMetadata>;
  title: ReactNode;
  titleLines?: 1 | 2;
}>;

export default function MarketingMarqueeQuestionListSection({
  description,
  href,
  questions,
  title,
  titleLines = 1,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex max-w-prose flex-col gap-1 text-center">
        <Heading level="heading3">{title}</Heading>
        <Text color="secondary" display="block">
          {description}
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
        <MarketingQuestionCardMarquee
          periodSeconds={60}
          questions={questions}
          rows={2}
          titleLines={titleLines}
        />
        <Button
          href={href}
          icon={RiArrowRightLine}
          label="View full questions list"
          size="md"
          variant="secondary"
        />
      </div>
    </div>
  );
}
