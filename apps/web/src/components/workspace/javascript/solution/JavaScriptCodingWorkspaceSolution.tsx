import clsx from 'clsx';
import { getMDXComponent } from 'mdx-bundler/client';
import { useMemo, useState } from 'react';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import type { QuestionMetadata } from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { useIntl } from '~/components/intl';
import type { Props as MDXCodeBlockProps } from '~/components/mdx/MDXCodeBlock';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Badge from '~/components/ui/Badge';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import ScrollArea from '~/components/ui/ScrollArea';
import { textVariants } from '~/components/ui/Text';
import { themeBackgroundCardWhiteOnLightColor } from '~/components/ui/theme';
import CodingWorkspaceDescriptionAddOnItems from '~/components/workspace/common/CodingWorkspaceDescriptionAddOnItems';
import CodingWorkspaceMDXComponents from '~/components/workspace/common/CodingWorkspaceMDXComponents';
import JavaScriptCodingWorkspacePushCodeToEditorButton from '~/components/workspace/javascript/JavaScriptCodingWorkspacePushCodeToEditorButton';
import JavaScriptCodingWorkspaceLanguageDropdown from '~/components/workspace/javascript/language/JavaScriptCodingWorkspaceLanguageDropdown';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  environment?: 'embed' | 'workspace';
  isMobile?: boolean;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onOpenSolutionInWorkspace?: () => void;
  showLanguageSelector?: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  solution: string | null;
  studyListKey?: string;
}>;

export default function JavaScriptCodingWorkspaceSolution({
  canViewPremiumContent,
  environment = 'workspace',
  isMobile,
  metadata,
  nextQuestions,
  onOpenSolutionInWorkspace,
  showLanguageSelector,
  similarQuestions,
  solution,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const { data } = useQueryQuestionProgress(metadata, studyListKey ?? null);
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  // It's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Contents = useMemo(() => {
    if (!solution) {
      return null;
    }

    function WrappedMDXCodeBlock(props: MDXCodeBlockProps) {
      return (
        <MDXCodeBlockWithPushButton
          {...props}
          isMobile={isMobile}
          onOpenSolutionInWorkspace={onOpenSolutionInWorkspace}
        />
      );
    }

    return getMDXComponent(solution, {
      MDXCodeBlock: WrappedMDXCodeBlock,
    });
  }, [solution, onOpenSolutionInWorkspace, isMobile]);

  if (Contents == null) {
    if (canViewPremiumContent) {
      return null;
    }

    return (
      <div className="flex w-full items-center justify-center">
        <InterviewsPurchasePaywall
          background="vignette"
          premiumFeature="official-solutions"
        />
      </div>
    );
  }

  return (
    <ScrollArea viewportClass="[&>div]:!block">
      <div ref={copyRef} className="w-full">
        <div className={clsx('mx-auto max-w-3xl', 'flex flex-col gap-y-6')}>
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
                  {metadata.title} (
                  {intl.formatMessage({
                    defaultMessage: 'Official Solution',
                    description: 'Questions official solution label',
                    id: 'AINf9L',
                  })}
                  )
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
          <div className="px-3 pb-4 sm:px-3.5">
            <Section>
              <div className="flex flex-col gap-y-6">
                <Prose textSize="sm">
                  <Contents components={CodingWorkspaceMDXComponents} />
                </Prose>
                <CodingWorkspaceDescriptionAddOnItems
                  adPlacement="questions_js"
                  className="space-y-3 max-lg:hidden"
                  contentType="solution"
                  environment={environment}
                  metadata={metadata}
                  nextQuestions={nextQuestions}
                  similarQuestions={similarQuestions}
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function MDXCodeBlockWithPushButton({
  isMobile = false,
  onOpenSolutionInWorkspace,
  ...props
}: Readonly<
  MDXCodeBlockProps & {
    isMobile?: boolean;
    onOpenSolutionInWorkspace?: () => void;
  }
>) {
  const intl = useIntl();
  const [content, setContent] = useState('');

  const pushButton = (
    <JavaScriptCodingWorkspacePushCodeToEditorButton
      contents={content}
      metadata={{
        name: intl.formatMessage({
          defaultMessage: 'Official Solution',
          description: 'Label for the solution name in workspace',
          id: 'nCqgeQ',
        }),
      }}
      type="solution"
      onOpenSolutionInWorkspace={onOpenSolutionInWorkspace}
    />
  );

  return (
    <div className={clsx('flex flex-col gap-y-2', '[&>div>div>pre]:my-0')}>
      {isMobile && <div className="flex justify-end">{pushButton}</div>}
      <MDXCodeBlock
        renderExtraButtons={isMobile ? undefined : () => pushButton}
        onSelectedCodeChange={setContent}
        {...props}
      />
    </div>
  );
}
