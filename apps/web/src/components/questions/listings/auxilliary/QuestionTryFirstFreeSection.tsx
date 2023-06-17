import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { themeBackgroundColor } from '~/components/ui/theme';

import QuestionsList from '../items/QuestionsList';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props = Readonly<{
  codingQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function QuestionTryFirstFreeSection({
  codingQuestions,
}: Props) {
  return (
    <div
      className={clsx(
        'grid gap-y-6 rounded-lg p-6 shadow',
        themeBackgroundColor,
      )}>
      <Heading level="heading5">
        <FormattedMessage
          defaultMessage="Try your first free question"
          description="Header for section prompting user to try their first question"
          id="RXqyFg"
        />
      </Heading>
      <Section>
        <div className="mt-1">
          <QuestionsList
            checkIfCompletedQuestion={() => false}
            columns={1}
            questions={codingQuestions.filter(({ slug }) => slug === 'flatten')}
            showProgress={false}
            showTimeline={false}
          />
        </div>
      </Section>
    </div>
  );
}
