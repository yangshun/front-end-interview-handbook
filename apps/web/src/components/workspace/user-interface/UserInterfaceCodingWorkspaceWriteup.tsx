import clsx from 'clsx';
import { RiArrowRightUpLine } from 'react-icons/ri';

import { useQuestionTechnologyLists } from '~/data/QuestionFormats';

import type {
  QuestionFramework,
  QuestionMetadata,
} from '~/components/interviews/questions/common/QuestionsTypes';
import type { QuestionUserInterfaceMode } from '~/components/interviews/questions/common/QuestionUserInterfacePath';
import QuestionCompanies from '~/components/interviews/questions/content/QuestionCompanies';
import QuestionContentProse from '~/components/interviews/questions/content/QuestionContentProse';
import QuestionNextQuestions from '~/components/interviews/questions/content/QuestionNextQuestions';
import QuestionSimilarQuestions from '~/components/interviews/questions/content/QuestionSimilarQuestions';
import { questionUserInterfaceDescriptionPath } from '~/components/interviews/questions/content/user-interface/QuestionUserInterfaceRoutes';
import QuestionMetadataSection from '~/components/interviews/questions/metadata/QuestionMetadataSection';
import { useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
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
  similarQuestions: ReadonlyArray<QuestionMetadata>;
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
  writeup,
}: Props) {
  const { data: questionProgress } = useQueryQuestionProgress(metadata);
  const { save } = useUserInterfaceCodingWorkspaceSavesContext();
  const intl = useIntl();
  const questionTechnologyLists = useQuestionTechnologyLists();
  const { dispatch } = useUserInterfaceCodingWorkspaceTilesContext();

  return (
    <div className="w-full">
      <ScrollArea>
        <div className="mx-auto flex max-w-3xl flex-col gap-y-6 p-4">
          {contentType === 'description' && mode === 'solution' && (
            <Alert variant="info">
              <div className="flex flex-col items-start gap-2">
                <Text className="block" size="body2">
                  You are viewing the description from the solution page. To
                  practice this question,{' '}
                  <Anchor
                    href={questionUserInterfaceDescriptionPath(
                      metadata,
                      framework,
                    )}>
                    go back
                  </Anchor>{' '}
                  to the workspace page or{' '}
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
                </Text>
              </div>
            </Alert>
          )}
          {contentType === 'description' && save != null && (
            <Alert variant="info">
              <div className="flex flex-col items-start gap-2">
                <Text className="block" size="body2">
                  You are currently editing code from the saved version:{' '}
                  <strong>"{save.name}"</strong>.
                </Text>
                <Button
                  href={questionUserInterfaceDescriptionPath(metadata, framework)}
                  label="Start a new version"
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
              {metadata.premium && (
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
            <Select
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Framework',
                description:
                  'Label for the selection dropdown used to select the framework to use for the question',
                id: 'eeWLAW',
              })}
              options={metadata.frameworks.map((frameworkItem) => ({
                label: questionTechnologyLists[frameworkItem.framework].name,
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
          <div className="flex flex-col gap-y-8">
            <QuestionContentProse contents={writeup} />
            {contentType === 'description' && environment === 'workspace' && (
              <div
                className={clsx(
                  'hidden lg:block',
                  'rounded-md p-4 text-center',
                  'border-brand-light dark:border-brand-darkest border',
                  'bg-brand-darker/10',
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
          </div>
        </div>
      </ScrollArea>
    </div>
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
