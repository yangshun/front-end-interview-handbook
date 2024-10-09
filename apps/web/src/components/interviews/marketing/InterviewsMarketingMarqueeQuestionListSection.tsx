import type { ReactNode } from 'react';
import { RiArrowRightLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import InterviewsMarketingQuestionCardMarquee from './InterviewsMarketingQuestionCardMarquee';
import type { QuestionMetadata } from '../questions/common/QuestionsTypes';

type Props = Readonly<{
  description: ReactNode;
  href: string;
  questions: ReadonlyArray<QuestionMetadata>;
  title: ReactNode;
  titleLines?: 1 | 2;
}>;

export default function InterviewsMarketingMarqueeQuestionListSection({
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
        <Text className="block" color="secondary" size="body1">
          {description}
        </Text>
      </div>
      <div className="flex flex-col items-center gap-8">
        <InterviewsMarketingQuestionCardMarquee
          periodSeconds={60}
          questions={questions}
          rows={2}
          titleLines={titleLines}
        />
        <Button
          href={href}
          icon={RiArrowRightLine}
          label="View full questions list"
          prefetch={null}
          size="md"
          variant="secondary"
        />
      </div>
    </div>
  );
}
