import clsx from 'clsx';
import { RiArrowRightUpLine } from 'react-icons/ri';

import { useQuestionFrameworksData } from '~/data/QuestionCategories';

import { questionHrefFrameworkSpecificAndListType } from '~/components/interviews/questions/common/QuestionHrefUtils';
import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import useQuestionLogEventCopyContents from '~/components/interviews/questions/common/useQuestionLogEventCopyContents';
import QuestionCompanies from '~/components/interviews/questions/content/QuestionCompanies';
import QuestionContentProse from '~/components/interviews/questions/content/QuestionContentProse';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import QuestionSimilarQuestions from '~/components/interviews/questions/content/QuestionSimilarQuestions';
import { useQuestionsListTypeCurrent } from '~/components/interviews/questions/listings/utils/useQuestionsListDataForType';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { FormattedMessage, useIntl } from '~/components/intl';
import SponsorsAdFormatInContentContainer from '~/components/sponsors/ads/SponsorsAdFormatInContentContainer';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import ScrollArea from '~/components/ui/ScrollArea';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';

import { useQueryQuestionProgress } from '~/db/QuestionsProgressClient';

import { useUserInterfaceCodingWorkspaceSavesContext } from './UserInterfaceCodingWorkspaceSaveContext';
import useUserInterfaceCodingWorkspaceTilesContext from './useUserInterfaceCodingWorkspaceTilesContext';

type Props = Readonly<{
  canViewPremiumContent: boolean;
  contentType: 'description' | 'solution';
  environment?: 'embed' | 'workspace';
  framework: QuestionFramework;
  metadata: QuestionMetadata;
  mode: QuestionUserInterfaceMode;
  nextQuestions: ReadonlyArray<QuestionMetadata>;
  onFrameworkChange: (
    framework: QuestionFramework,
    contentType: 'description' | 'solution',
  ) => void;
  showAd: boolean;
  similarQuestions: ReadonlyArray<QuestionMetadata>;
  studyListKey?: string;
  writeup: string | null;
}>;

export default function UserInterfaceCodingWorkspaceWriteup({
  canViewPremiumContent,
  contentType,
  environment = 'workspace',
  framework,
  onFrameworkChange,
  metadata,
  nextQuestions,
  similarQuestions,
  showAd,
  mode,
  studyListKey,
  writeup,
}: Props) {
  const copyRef = useQuestionLogEventCopyContents<HTMLDivElement>();
  const listType = useQuestionsListTypeCurrent(studyListKey, framework);
  const { data } = useQueryQuestionProgress(metadata, studyListKey ?? null);
  const { save } = useUserInterfaceCodingWorkspaceSavesContext();
  const intl = useIntl();
  const frameworks = useQuestionFrameworksData();
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();
  const questionDescriptionHref = questionHrefFrameworkSpecificAndListType(
    metadata,
    listType,
    framework,
  );

  return (
    <>
      {/* Override the display:table because the content like MDXCodeBlock
    where there is long code make this overflow and the horizontal scrollbar doesn't appear */}
      <ScrollArea viewportClass="[&>div]:!block">
        <div
          ref={copyRef}
          className="mx-auto flex max-w-3xl flex-col gap-y-6 p-4">
          {contentType === 'description' && mode === 'solution' && (
            <Alert variant="info">
              <div className="flex flex-col items-start gap-2">
                <Text className="block" size="body2">
                  <FormattedMessage
                    defaultMessage="You are viewing the description from the solution page. To
                  practice this question, <backLink>go back</backLink> to the workspace page or <savedLink>load a saved version</savedLink>."
                    description="Description from solution page alert"
                    id="3+Q/U6"
                    values={{
                      backLink: (chunk) => (
                        <Anchor href={questionDescriptionHref}>{chunk}</Anchor>
                      ),
                      savedLink: (chunk) => (
                        <Anchor
                          onClick={() => {
                            dispatch({
                              payload: {
                                tabId: 'versions',
                              },
                              type: 'tab-set-active',
                            });
                          }}>
                          {chunk}
                        </Anchor>
                      ),
                    }}
                  />
                </Text>
              </div>
            </Alert>
          )}
          {contentType === 'description' && save != null && (
            <Alert variant="info">
              <div className="flex flex-col items-start gap-2">
                <Text className="block" size="body2">
                  <FormattedMessage
                    defaultMessage='You are currently editing code from the saved version: <strong>"{saveName}"</strong>.'
                    description="Viewing saved version alert message"
                    id="QrHNsv"
                    values={{
                      saveName: save.name,
                      strong: (chunk) => (
                        <Text color="inherit" weight="medium">
                          {chunk}
                        </Text>
                      ),
                    }}
                  />
                </Text>
                <Button
                  href={questionDescriptionHref}
                  label={intl.formatMessage({
                    defaultMessage: 'Start a new version',
                    description:
                      'Start a new version of the question button label',
                    id: '4gshRJ',
                  })}
                  size="sm"
                  variant="secondary"
                />
              </div>
            </Alert>
          )}
          <div className="flex items-center justify-between gap-x-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Heading level="heading5">
                <span>
                  {metadata.title} {contentType === 'solution' && ' Solution'}
                </span>
              </Heading>
              {metadata.access === 'premium' && (
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Premium',
                    description: 'Premium content',
                    id: 'gIeLON',
                  })}
                  size="sm"
                  variant="special"
                />
              )}
              <div>
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
            </div>
            <Select
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Framework',
                description:
                  'Label for the selection dropdown used to select the framework to use for the question',
                id: 'eeWLAW',
              })}
              options={metadata.frameworks.map((frameworkItem) => ({
                label: frameworks[frameworkItem.framework].label,
                value: frameworkItem.framework,
              }))}
              size="sm"
              value={framework}
              onChange={(value) => {
                onFrameworkChange(value, contentType);
              }}
            />
          </div>
          <Section>
            <QuestionMetadataSection metadata={metadata} />
            <div className="flex flex-col gap-y-8">
              <QuestionContentProse contents={writeup} />
              {contentType === 'description' && environment === 'workspace' && (
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
                />
              )}
              <QuestionNextQuestions questions={nextQuestions} />
              <QuestionSimilarQuestions questions={similarQuestions} />
              {showAd && (
                <div className={clsx('flex flex-col gap-y-6', 'max-lg:hidden')}>
                  <Divider />
                  <div className={clsx('pb-2')}>
                    <SponsorsAdFormatInContentContainer
                      adPlacement="questions_ui"
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

function SolutionPreviewButton() {
  const intl = useIntl();
  const { dispatch, getTabById } =
    useUserInterfaceCodingWorkspaceTilesContext();

  function onClick() {
    const result = getTabById('solution_preview');

    if (result != null) {
      dispatch({
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
      dispatch({
        payload: {
          tabId: solutionPreviewTab.tabId,
        },
        type: 'tab-set-active',
      });

      return;
    }

    // Open in same panel as file explorer tab.
    if (fileExplorerTab != null) {
      dispatch({
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
    dispatch({
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
