import clsx from 'clsx';

import CardContainer from '~/components/ui/Card/CardContainer';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import QuestionCardGlow from './QuestionCardGlow';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props = Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
  title: string;
}>;

export default function QuestionListingFeaturedQuestions({
  title,
  questions,
}: Props) {
  if (questions.length === 0) {
    return null;
  }

  const finalQuestions = questions.slice(0, 3);

  return (
    <div className="flex flex-col gap-y-4">
      <Heading className="text-base font-semibold" level="custom">
        {title}
      </Heading>
      <Section>
        <CardContainer
          className={clsx(
            'grid gap-6 lg:grid-cols-2',
            finalQuestions.length === 3 && 'xl:grid-cols-3',
          )}>
          {finalQuestions.map((metadata, index) => (
            <div
              key={metadata.href}
              className={clsx(index >= 2 && 'hidden xl:block')}>
              <QuestionCardGlow metadata={metadata} />
            </div>
          ))}
        </CardContainer>
      </Section>
    </div>
  );
}
