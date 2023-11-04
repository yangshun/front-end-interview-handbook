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

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  description: string | null;
  alwaysShowExtraData?: boolean;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function JavaScriptCodingWorkspaceDescription({
  canViewPremiumContent,
  description,
  alwaysShowExtraData = true,
  metadata,
  nextQuestions,
  similarQuestions,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const intl = useIntl();

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-3xl flex-col gap-y-6 p-4">
        <div className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading level="heading5">{metadata.title}</Heading>
              <div>
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
            </div>
          </div>
          <QuestionMetadataSection metadata={metadata} />
        </div>
        <div className="flex flex-col gap-y-8">
          <QuestionContentProse contents={description} />
          <div
            className={clsx(
              'flex-col gap-y-8 ',
              !alwaysShowExtraData && 'hidden lg:flex',
            )}>
            <QuestionCompanies
              canViewPremiumContent={canViewPremiumContent}
              companies={metadata.companies}
            />
            <QuestionNextQuestions questions={nextQuestions} />
            <QuestionSimilarQuestions questions={similarQuestions} />
          </div>
        </div>
      </div>
    </div>
  );
}
