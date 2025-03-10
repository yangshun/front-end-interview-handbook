import clsx from 'clsx';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import QuestionCompanies from '~/components/interviews/questions/content/QuestionCompanies';
import QuestionContentProse from '~/components/interviews/questions/content/QuestionContentProse';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import QuestionSimilarQuestions from '~/components/interviews/questions/content/QuestionSimilarQuestions';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { useIntl } from '~/components/intl';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Badge from '~/components/ui/Badge';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  description: string | null;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  showAd: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspaceDescription({
  canViewPremiumContent,
  description,
  metadata,
  nextQuestions,
  similarQuestions,
  showAd,
  studyListKey,
}: Props) {
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();

  const { data } = useQueryQuestionProgress(metadata, studyListKey ?? null);
  const intl = useIntl();

  return (
    <>
      {/* Override the display:table because the content like MDXCodeBlock
      where there is long code make this overflow and the horizontal scrollbar doesn't appear */}
      <ScrollArea viewportClass="[&>div]:!block">
        <div
          ref={copyRef}
          className={clsx(
            'flex flex-col gap-y-6',
            'mx-auto max-w-3xl',
            'px-4 py-4',
          )}>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading level="heading5">{metadata.title}</Heading>
              {metadata.access === 'premium' && <InterviewsPremiumBadge />}
              {data?.questionProgress?.status === 'complete' && (
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
            <QuestionMetadataSection metadata={metadata} />
          </div>
          <Section>
            <div className="flex flex-col gap-y-8">
              <QuestionContentProse contents={description} />
              <QuestionCompanies
                canViewPremiumContent={canViewPremiumContent}
                companies={metadata.companies}
              />
              <QuestionNextQuestions questions={nextQuestions} />
              <QuestionSimilarQuestions questions={similarQuestions} />
              {showAd && (
                <div className={clsx('flex flex-col gap-y-6', 'max-lg:hidden')}>
                  <Divider />
                  <div className={clsx('pb-2')}>
                    <SponsorsAdFormatInContentContainer
                      adPlacement="questions_js"
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </Section>
        </div>
      </ScrollArea>
    </>
  );
}
