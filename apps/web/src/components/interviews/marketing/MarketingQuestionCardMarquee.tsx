import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

import Marquee from '~/components/ui/Marquee';

import type { QuestionMetadata } from '../questions/common/QuestionsTypes';
import QuestionCard from '../questions/listings/auxilliary/QuestionCard';

type Props = Readonly<
  Omit<
    ComponentPropsWithoutRef<typeof Marquee>,
    'children' | 'direction' | 'startEndGap'
  > & {
    questions: ReadonlyArray<QuestionMetadata>;
    rows: 1 | 2;
    titleLines?: 1 | 2;
  }
>;

export default function MarketingQuestionCardMarquee({
  questions,
  rows,
  titleLines = 1,
  ...marqueeProps
}: Props) {
  return (
    <div className="grid grid-cols-1 self-stretch">
      <Marquee {...marqueeProps} direction="leftToRight" startEndGap={16}>
        <div
          className={clsx(
            'grid grid-flow-col gap-4 whitespace-normal',
            rows === 1 && 'grid-rows-1',
            rows === 2 && 'motion-reduce:grid-rows-2 motion-reduce:pl-[80px]',
          )}>
          {questions.map((metadata) => (
            <div
              key={metadata.slug}
              className={clsx(
                'h-auto w-[300px]',
                rows === 2 &&
                  'even:[transform:translateX(-80px)] motion-safe:even:sr-only',
              )}>
              <QuestionCard
                metadata={metadata}
                paddingSize="wide"
                showArrow={false}
                titleLines={titleLines}
              />
            </div>
          ))}
        </div>
      </Marquee>
      {rows === 2 && (
        <div className="motion-reduce:hidden">
          <Marquee {...marqueeProps} direction="rightToLeft" startEndGap={16}>
            <div
              className={clsx(
                'grid grid-flow-col gap-4 whitespace-normal pt-4',
              )}>
              {questions
                .filter((_, i) => i % 2 === 1)
                .map((metadata) => (
                  <div key={metadata.slug} className={clsx('h-auto w-[300px]')}>
                    <QuestionCard
                      metadata={metadata}
                      paddingSize="wide"
                      showArrow={false}
                      titleLines={titleLines}
                    />
                  </div>
                ))}
            </div>
          </Marquee>
        </div>
      )}
    </div>
  );
}
