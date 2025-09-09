import type { SandpackFiles } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import InterviewsPremiumBadge from '~/components/interviews/common/InterviewsPremiumBadge';
import InterviewsPurchasePaywall from '~/components/interviews/purchase/InterviewsPurchasePaywall';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import QuestionCompanies from '~/components/interviews/questions/content/QuestionCompanies';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import { textVariants } from '~/components/ui/Text';
import { themeBackgroundCardWhiteOnLightColor } from '~/components/ui/theme';
import CodingWorkspaceDescriptionAddOnItems from '~/components/workspace/common/CodingWorkspaceDescriptionAddOnItems';
import CodingWorkspaceQuestionContentProse from '~/components/workspace/common/CodingWorkspaceQuestionContentProse';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import useUserInterfaceCodingWorkspaceTilesContext from './hooks/useUserInterfaceCodingWorkspaceTilesContext';
import UserInterfaceCodingWorkspaceSolutionFilesPreview from './solution/UserInterfaceCodingWorkspaceSolutionFilesPreview';
import UserInterfaceCodingWorkspaceFrameworkDropdown from './UserInterfaceCodingWorkspaceFrameworkDropdown';

type BaseProps = Readonly<{
  canViewPremiumContent: boolean;
  environment?: 'embed' | 'workspace';
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (framework: QuestionFramework) => void;
  showAd: boolean;
  showFrameworkSelector?: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  solutionFiles?: SandpackFiles;
  studyListKey?: string;
  writeup: string | null;
}>;

type Props =
  | Readonly<
      BaseProps & {
        contentType: 'description';
      }
    >
  | Readonly<
      BaseProps & {
        contentType: 'solution';
        onOpenSolutionInWorkspace: ComponentProps<
          typeof UserInterfaceCodingWorkspaceSolutionFilesPreview
        >['onOpenSolutionInWorkspace'];
      }
    >;

export default function UserInterfaceCodingWorkspaceWriteup({
  canViewPremiumContent,
  environment = 'workspace',
  framework,
  metadata,
  nextQuestions,
  onFrameworkChange,
  showAd,
  showFrameworkSelector,
  similarQuestions,
  solutionFiles,
  studyListKey,
  writeup,
  ...props
}: Props) {
  const { contentType } = props;
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const { data } = useQueryQuestionProgress(metadata, studyListKey ?? null);
  const intl = useIntl();
  const isSolutionLocked =
    (metadata.access === 'standard' || metadata.access === 'premium') &&
    !canViewPremiumContent;

  return (
    <>
      {/* Override the display:table because the content like MDXCodeBlock
    where there is long code make this overflow and the horizontal scrollbar doesn't appear */}
      <ScrollArea viewportClass="[&>div]:!block">
        <div ref={copyRef} className="mx-auto flex max-w-3xl flex-col gap-y-6">
          {!writeup && isSolutionLocked ? (
            <div className="flex w-full items-center justify-center">
              <InterviewsPurchasePaywall
                background="vignette"
                premiumFeature="official-solutions"
              />
            </div>
          ) : (
            <>
              <div
                className={clsx(
                  'px-3 py-3 sm:px-3.5',
                  themeBackgroundCardWhiteOnLightColor,
                )}>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-x-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <Heading
                        className={textVariants({
                          size: 'body0',
                          weight: 'bold',
                        })}
                        level="custom"
                        tag="h2">
                        <span>
                          {metadata.title}{' '}
                          {contentType === 'solution' &&
                            `(${intl.formatMessage({
                              defaultMessage: 'Official Solution',
                              description: 'Questions official solution label',
                              id: 'AINf9L',
                            })})`}
                        </span>
                      </Heading>
                      {metadata.access === 'premium' && (
                        <InterviewsPremiumBadge />
                      )}
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
                    {showFrameworkSelector && (
                      <UserInterfaceCodingWorkspaceFrameworkDropdown
                        framework={framework}
                        metadata={metadata}
                        onFrameworkChange={onFrameworkChange}
                      />
                    )}
                  </div>
                  <QuestionMetadataSection metadata={metadata} />
                </div>
              </div>
              <div className="px-3 sm:px-3.5 sm:pb-4">
                <Section>
                  <div className="flex flex-col gap-y-6">
                    {!writeup ? null : (
                      <>
                        <CodingWorkspaceQuestionContentProse
                          contents={writeup}
                        />
                        {contentType === 'solution' && solutionFiles && (
                          <UserInterfaceCodingWorkspaceSolutionFilesPreview
                            files={solutionFiles}
                            openInWorkspaceMetadata={{
                              name: intl.formatMessage({
                                defaultMessage: 'Official Solution',
                                description:
                                  'Label for the solution name in workspace',
                                id: 'nCqgeQ',
                              }),
                            }}
                            showOpenInWorkspace={contentType === 'solution'}
                            type="solution"
                            onOpenSolutionInWorkspace={
                              props.onOpenSolutionInWorkspace
                            }
                          />
                        )}
                        {contentType === 'description' &&
                          environment === 'workspace' && (
                            <div
                              className={clsx(
                                'hidden lg:block',
                                'rounded-md p-4 text-center',
                                'bg-brand',
                              )}>
                              <SolutionPreviewButton />
                            </div>
                          )}
                        {contentType === 'description' && (
                          <QuestionCompanies
                            canViewPremiumContent={canViewPremiumContent}
                            companies={metadata.companies}
                            topAddOn={<Divider />}
                          />
                        )}
                        <CodingWorkspaceDescriptionAddOnItems
                          adPlacement="questions_ui"
                          className="space-y-3 max-lg:hidden"
                          nextQuestions={nextQuestions}
                          showAd={showAd}
                          similarQuestions={similarQuestions}
                        />
                      </>
                    )}
                  </div>
                </Section>
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </>
  );
}

function SolutionPreviewButton() {
  const intl = useIntl();
  const { getTabById, tilesDispatch } =
    useUserInterfaceCodingWorkspaceTilesContext();

  function onClick() {
    const result = getTabById('solution_preview');

    if (result != null) {
      tilesDispatch({
        payload: {
          tabId: result.tabId,
        },
        type: 'tab-set-active',
      });

      return;
    }

    const solutionPreviewTab = getTabById('solution_preview');
    const descriptionTab = getTabById('description');
    const fileExplorerTab = getTabById('file_explorer');

    // Focus if already open.
    if (solutionPreviewTab != null) {
      tilesDispatch({
        payload: {
          tabId: solutionPreviewTab.tabId,
        },
        type: 'tab-set-active',
      });

      return;
    }

    // Open in same panel as file explorer tab.
    if (fileExplorerTab != null) {
      tilesDispatch({
        payload: {
          newTabCloseable: true,
          newTabId: 'solution_preview',
          panelId: fileExplorerTab.panelId,
          tabId: fileExplorerTab.tabId,
        },
        type: 'tab-open',
      });

      return;
    }

    // Open in same panel as description tab.
    tilesDispatch({
      payload: {
        newTabCloseable: true,
        newTabId: 'solution_preview',
        panelId: descriptionTab!.panelId,
        tabId: descriptionTab?.tabId,
      },
      type: 'tab-open',
    });
  }

  return (
    <Button
      icon={RiArrowRightUpLine}
      label={intl.formatMessage({
        defaultMessage: 'Preview what you need to build',
        description: 'Solution preview button label',
        id: 'JiKm6K',
      })}
      size="sm"
      variant="secondary"
      onClick={onClick}
    />
  );
}
