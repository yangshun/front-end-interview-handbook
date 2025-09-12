import clsx from 'clsx';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import QuestionCompanies from '~/components/interviews/questions/content/QuestionCompanies';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import { textVariants } from '~/components/ui/Text';
import { themeBackgroundCardWhiteOnLightColor } from '~/components/ui/theme';
import CodingWorkspaceDescriptionAddOnItems from '~/components/workspace/common/CodingWorkspaceDescriptionAddOnItems';
import CodingWorkspaceQuestionContentProse from '~/components/workspace/common/CodingWorkspaceQuestionContentProse';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import JavaScriptCodingWorkspaceLanguageDropdown from './language/JavaScriptCodingWorkspaceLanguageDropdown';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  description: string | null;
  environment?: 'embed' | 'workspace';
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  showAd: boolean;
  showLanguageSelector?: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspaceDescription({
  canViewPremiumContent,
  description,
  environment = 'workspace',
  metadata,
  nextQuestions,
  showAd,
  showLanguageSelector,
  similarQuestions,
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
          className={clsx('flex flex-col gap-y-6', 'mx-auto max-w-3xl')}>
          <div
            className={clsx(
              'flex flex-col gap-2.5',
              'px-3 py-3 sm:px-3.5',
              themeBackgroundCardWhiteOnLightColor,
            )}>
            <div className="flex items-center justify-between gap-x-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <Heading
                  className={textVariants({
                    size: 'body0',
                    weight: 'bold',
                  })}
                  level="custom"
                  tag="h2">
                  {metadata.title}
                </Heading>
                {metadata.access === 'premium' && <InterviewsPremiumBadge />}
                {data?.questionProgress?.status === 'complete' && (
                  <Badge
                    label={intl.formatMessage({
                      defaultMessage: 'Completed',
                      description: 'Question completion label',
                      id: 'TY7Aig',
                    })}
                    size="sm"
                    variant="success"
                  />
                )}
              </div>
              {showLanguageSelector && (
                <JavaScriptCodingWorkspaceLanguageDropdown />
              )}
            </div>
            <QuestionMetadataSection metadata={metadata} />
          </div>
          <div className="px-3 sm:px-3.5 sm:pb-4">
            <Section>
              <div className="flex flex-col gap-y-6">
                <CodingWorkspaceQuestionContentProse contents={description} />
                <QuestionCompanies
                  canViewPremiumContent={canViewPremiumContent}
                  companies={metadata.companies}
                  topAddOn={<Divider />}
                />
                <CodingWorkspaceDescriptionAddOnItems
                  adPlacement="questions_js"
                  className="space-y-3 max-lg:hidden"
                  contentType="description"
                  environment={environment}
                  metadata={metadata}
                  nextQuestions={nextQuestions}
                  showAd={showAd}
                  similarQuestions={similarQuestions}
                />
              </div>
            </Section>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
