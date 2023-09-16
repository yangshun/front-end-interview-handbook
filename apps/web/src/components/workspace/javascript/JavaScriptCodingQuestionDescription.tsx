import clsx from 'clsx';
import { useIntl } from 'react-intl';

import type { QuestionMetadata } from '~/components/questions/common/QuestionsTypes';
import QuestionCompanies from '~/components/questions/content/QuestionCompanies';
import QuestionContentProse from '~/components/questions/content/QuestionContentProse';
import QuestionNextQuestions from '~/components/questions/content/QuestionNextQuestions';
import QuestionSimilarQuestions from '~/components/questions/content/QuestionSimilarQuestions';
import QuestionMetadataSection from '~/components/questions/metadata/QuestionMetadataSection';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  description: string | null;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function JavaScriptCodingQuestionDescription({
  canViewPremiumContent,
  metadata,
  description,
  nextQuestions,
  similarQuestions,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const intl = useIntl();

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col">
        <div className="flex justify-between gap-x-4 p-4">
          <Heading level="heading5">{metadata.title}</Heading>
          {questionProgress?.status === 'complete' && (
            <Badge
              label={intl.formatMessage({
                defaultMessage: 'Completed',
                description:
                  'Label indicating that the question has been completed',
                id: 'iIQL6V',
              })}
              size="sm"
              variant="success"
            />
          )}
        </div>
        <div
          className={clsx(
            'flex items-center gap-x-4 p-4',
            themeBackgroundEmphasized,
          )}>
          <QuestionMetadataSection metadata={metadata} />
        </div>
      </div>
      <div className="flex flex-col gap-y-8 p-4">
        <QuestionContentProse contents={description} />
        {metadata.companies && metadata.companies.length > 0 && (
          <QuestionCompanies
            canViewPremiumContent={canViewPremiumContent}
            question={metadata}
          />
        )}
        <QuestionNextQuestions questions={nextQuestions} />
        <QuestionSimilarQuestions questions={similarQuestions} />
      </div>
    </div>
  );
}
