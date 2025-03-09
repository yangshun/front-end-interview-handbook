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
import { useIntl } from '~/components/intl';
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
import { themeBackgroundCardColor } from '~/components/ui/theme';

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
        <div ref={copyRef} className={clsx('mx-auto', 'flex flex-col gap-y-6')}>
          {contentType === 'description' && mode === 'solution' && (
            <div className={clsx('px-3.5', 'mx-auto w-full max-w-3xl')}>
              <Alert bodySize="body3" variant="info">
                You are viewing the description from the solution page. To
                practice this question,{' '}
                <Anchor href={questionDescriptionHref}>go back</Anchor> to the
                workspace page or{' '}
                <Anchor
                  onClick={() => {
                    dispatch({
                      payload: {
                        tabId: 'versions',
                      },
                      type: 'tab-set-active',
                    });
                  }}>
                  load a saved version
                </Anchor>
                .
              </Alert>
            </div>
          )}
          {contentType === 'description' && save != null && (
            <div className={clsx('px-3.5', 'mx-auto w-full max-w-3xl')}>
              <Alert bodySize="body3" variant="info">
                <div className="flex flex-col items-start gap-2">
                  <div>
                    You are currently editing code from the saved version:{' '}
                    <strong>"{save.name}"</strong>.
                  </div>
                  <Button
                    href={questionDescriptionHref}
                    label="Start a new version"
                    size="sm"
                    variant="secondary"
                  />
                </div>
              </Alert>
            </div>
          )}
          <div className={clsx(themeBackgroundCardColor, 'pb-5 pt-4')}>
            <div
              className={clsx(
                'flex flex-col gap-y-3',
                'px-3.5',
                'mx-auto w-full max-w-3xl',
              )}>
              <div className="flex items-center justify-between gap-x-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Heading level="heading5">
                    <span>
                      {metadata.title}{' '}
                      {contentType === 'solution' && ' Solution'}
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
              <QuestionMetadataSection metadata={metadata} />
            </div>
          </div>
          <Section>
            <div className={clsx('px-3.5', 'mx-auto w-full max-w-3xl')}>
              <QuestionContentProse contents={writeup} />
            </div>
            {contentType === 'description' && environment === 'workspace' && (
              <div className={clsx('px-3.5', 'mx-auto w-full max-w-3xl')}>
                <div
                  className={clsx(
                    'hidden lg:block',
                    'rounded-md p-4 text-center',
                    'bg-brand',
                  )}>
                  <SolutionPreviewButton />
                </div>
              </div>
            )}
            {metadata.companies.length > 0 && contentType === 'description' && (
              <>
                <Divider />
                <div className={clsx('px-3.5', 'mx-auto w-full max-w-3xl')}>
                  <QuestionCompanies
                    canViewPremiumContent={canViewPremiumContent}
                    companies={metadata.companies}
                  />
                </div>
              </>
            )}
            {(nextQuestions.length > 0 || similarQuestions.length > 0) && (
              <>
                <Divider />
                <div
                  className={clsx(
                    'flex flex-col gap-6',
                    'px-3.5',
                    'mx-auto w-full max-w-3xl',
                  )}>
                  <QuestionNextQuestions questions={nextQuestions} />
                  <QuestionSimilarQuestions questions={similarQuestions} />
                </div>
              </>
            )}
            <Divider />
            <div
              className={clsx(
                'max-lg:hidden',
                'px-3.5',
                'pb-6',
                'mx-auto w-full max-w-3xl',
              )}>
              <SponsorsAdFormatInContentContainer
                adPlacement="questions_ui"
                size="sm"
              />
            </div>
          </Section>
        </div>
      </ScrollArea>
    </>
  );
}

function SolutionPreviewButton() {
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
      label="Preview what you need to build"
      size="sm"
      variant="secondary"
      onClick={onClick}
    />
  );
}
