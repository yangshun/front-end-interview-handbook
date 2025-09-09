import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import QuestionSimilarQuestions from '~/components/interviews/questions/content/QuestionSimilarQuestions';
import type { SponsorsAdFormatInContentPlacement } from '~/components/sponsors/ads/SponsorsAdFormatInContent';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Divider from '~/components/ui/Divider';

type Props = Readonly<{
  adPlacement: SponsorsAdFormatInContentPlacement;
  className?: string;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  showAd?: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
}>;

export default function CodingWorkspaceDescriptionAddOnItems({
  adPlacement,
  className,
  nextQuestions,
  showAd = true,
  similarQuestions,
}: Props) {
  return (
    <div className={className}>
      {nextQuestions.length > 0 || similarQuestions.length > 0 ? (
        <div>
          <Divider className="mb-3" />
          <QuestionNextQuestions questions={nextQuestions} />
          <QuestionSimilarQuestions questions={similarQuestions} />
        </div>
      ) : null}
      {showAd && (
        <div className="flex flex-col gap-y-6">
          <Divider />
          <SponsorsAdFormatInContentContainer
            adPlacement={adPlacement}
            size="sm"
          />
        </div>
      )}
    </div>
  );
}
