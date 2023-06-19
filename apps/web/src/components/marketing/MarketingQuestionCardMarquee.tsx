import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import Marquee from '~/components/ui/Marquee';

import type { QuestionMetadata } from '../questions/common/QuestionsTypes';
import QuestionCard from '../questions/listings/auxilliary/QuestionCard';

type Props = Readonly<
  Omit<ComponentPropsWithoutRef<typeof Marquee>, 'children' | 'startEndGap'> & {
    questions: ReadonlyArray<QuestionMetadata>;
    rows: 1 | 2;
  }
>;

export default function MarketingQuestionCardMarquee({
  questions,
  rows,
  ...marqueeProps
}: Props) {
  return (
    <div className="grid grid-cols-1 self-stretch">
      <Marquee {...marqueeProps} startEndGap={16}>
        <div
          className={clsx(
            'grid grid-flow-col gap-4 whitespace-normal',
            rows === 1 && 'grid-rows-1',
            rows === 2 && 'grid-rows-2 motion-reduce:pl-[80px]',
          )}>
          {questions.map((metadata) => (
            <div
              key={metadata.slug}
              className={clsx(
                'h-auto w-[300px]',
                rows === 2 && 'even:[transform:translateX(-80px)]',
              )}>
              <QuestionCard
                metadata={metadata}
                paddingSize="wide"
                showArrow={false}
              />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
