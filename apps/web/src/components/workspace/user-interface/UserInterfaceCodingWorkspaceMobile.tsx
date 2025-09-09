'use client';

import type { SandpackFiles } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useCallback, useState } from 'react';

import { useIntl } from '~/components/intl';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text, { textVariants } from '~/components/ui/Text';
import CodingWorkspaceDescriptionAddOnItems from '~/components/workspace/common/CodingWorkspaceDescriptionAddOnItems';
import CodingWorkspaceMobileExperienceBanner from '~/components/workspace/common/CodingWorkspaceMobileExperienceBanner';
import { CodingWorkspaceTabIcons } from '~/components/workspace/common/CodingWorkspaceTabIcons';
import { codingWorkspaceTabFileId } from '~/components/workspace/common/tabs/codingWorkspaceTabId';
import { codingWorkspaceExtractFileNameFromPath } from '~/components/workspace/common/utils/codingWorkspaceExtractFileNameFromPath';

import UserInterfaceCodingWorkspaceCodeEditor from './editor/UserInterfaceCodingWorkspaceCodeEditor';
import UserInterfaceCodingWorkspaceCodeEditorMobile from './editor/UserInterfaceCodingWorkspaceCodeEditorMobile';
import UserInterfaceCodingWorkspacePreviewMobile from './preview/UserInterfaceCodingWorkspacePreviewMobile';
import { replaceUserInterfaceCodeEditorContents } from './store/actions';
import {
  useUserInterfaceCodingWorkspaceDispatch,
  useUserInterfaceCodingWorkspaceSelector,
} from './store/hooks';
import type { UserInterfaceWorkspaceRenderProps } from './UserInterfaceCodingWorkspace';
import UserInterfaceCodingWorkspaceBottomBar from './UserInterfaceCodingWorkspaceBottomBar';
import UserInterfaceCodingWorkspaceExplorer from './UserInterfaceCodingWorkspaceExplorer';
import type { UserInterfaceCodingWorkspaceTabsType } from './UserInterfaceCodingWorkspaceTypes';
import UserInterfaceCodingWorkspaceWriteup from './UserInterfaceCodingWorkspaceWriteup';

type Props = UserInterfaceWorkspaceRenderProps;
type Mode = ComponentProps<
  typeof UserInterfaceCodingWorkspaceBottomBar
>['mode'];

export default function UserInterfaceCodingWorkspaceMobile({
  canViewPremiumContent,
  embed,
  nextQuestions,
  similarQuestions,
  studyListKey,
  ...props
}: Props) {
  const intl = useIntl();
  const fileNames = useUserInterfaceCodingWorkspaceSelector(
    (state) => Object.keys(state.sandpack.current.files),
    (previousFileNames, currentFileNames) => {
      if (previousFileNames.length !== currentFileNames.length) {
        return false;
      }

      return previousFileNames.every((fileName) =>
        currentFileNames.includes(fileName),
      );
    },
  );
  const workspaceDispatch = useUserInterfaceCodingWorkspaceDispatch();
  const visibleFiles = useUserInterfaceCodingWorkspaceSelector(
    (state) => state.sandpack.current.visibleFiles,
  );
  const { onFrameworkChange, question } = props;
  const { description, framework, metadata, solution } = question;
  const questionAuthor = question.skeletonBundle.author;
  const solutionAuthor = question.solutionBundle?.author ?? metadata.author;
  const [mode, setMode] = useState<Mode>('practice');

  const onModeChange = useCallback((value: Mode) => {
    window.scrollTo(0, 0);
    setMode(value);
  }, []);
  const onOpenSolution = useCallback(() => {
    onModeChange('solution');
  }, [onModeChange]);

  function createFileTabContent(filePath: string) {
    return {
      closeable: true,
      contents: (
        <UserInterfaceCodingWorkspaceCodeEditor
          filePath={filePath}
          isMobile={true}
          replaceCodeEditorContents={replaceCodeEditorContents}
          onOpenSolution={onOpenSolution}
        />
      ),
      id: codingWorkspaceTabFileId(filePath),
      label: codingWorkspaceExtractFileNameFromPath(filePath),
    };
  }

  const visibleFilesTabsEntries = visibleFiles
    .filter((filePath) => fileNames.includes(filePath))
    .map((filePath) => createFileTabContent(filePath));

  function openFile(filePath: string) {
    const tabId = codingWorkspaceTabFileId(filePath);

    setTabContents((tabs) =>
      tabs.some((tab) => tab.id === tabId)
        ? tabs
        : [...tabs, createFileTabContent(filePath)],
    );
    setActiveTabId(tabId);
  }

  const [tabContents, setTabContents] = useState<
    ComponentProps<
      typeof UserInterfaceCodingWorkspaceCodeEditorMobile
    >['tabContents']
  >([
    {
      contents: <UserInterfaceCodingWorkspaceExplorer openFile={openFile} />,
      icon: CodingWorkspaceTabIcons.explorer.icon,
      id: 'file_explorer',
      label: intl.formatMessage({
        defaultMessage: 'Files',
        description: 'Coding workspace file explorer label',
        id: 'shjtM6',
      }),
    },
    ...visibleFilesTabsEntries,
  ]);
  const [activeTabId, setActiveTabId] = useState<string>(
    visibleFilesTabsEntries[0].id,
  );

  function closeFile(tabId: UserInterfaceCodingWorkspaceTabsType) {
    setTabContents((prev) => [...prev].filter((tab) => tab.id !== tabId));
    if (tabId === activeTabId) {
      const nextTab = tabContents.find((tab) => tab.id !== tabId);

      setActiveTabId(nextTab?.id ?? 'file_explorer');
    }
  }

  function replaceCodeEditorContents(newFiles: SandpackFiles) {
    workspaceDispatch(
      replaceUserInterfaceCodeEditorContents({
        changeActiveFile: setActiveTabId,
        closeFile,
        newFiles,
        openFile,
      }),
    );
  }

  function onOpenSolutionInWorkspace(newFiles: SandpackFiles) {
    replaceCodeEditorContents(newFiles);
    onModeChange('practice');
  }

  // TODO(workspace): If the user somehow resize the screen to tablet or desktop screen,
  // show a UI that suggests them to switch to desktop device.
  return (
    <div
      className={clsx(
        'flex flex-col',
        'size-full min-h-[calc(100vh_-_var(--global-sticky-height))]',
      )}>
      <div className="flex grow flex-col gap-y-6">
        {mode === 'practice' && (
          <UserInterfaceCodingWorkspaceWriteup
            canViewPremiumContent={canViewPremiumContent}
            contentType="description"
            framework={framework}
            metadata={{ ...question.metadata, author: questionAuthor }}
            nextQuestions={[]}
            showAd={!embed}
            showFrameworkSelector={true}
            similarQuestions={[]}
            studyListKey={studyListKey}
            writeup={description}
            onFrameworkChange={onFrameworkChange}
          />
        )}
        {mode === 'solution' && (
          <UserInterfaceCodingWorkspaceWriteup
            canViewPremiumContent={canViewPremiumContent}
            contentType="solution"
            framework={framework}
            metadata={{ ...question.metadata, author: solutionAuthor }}
            nextQuestions={[]}
            showAd={!embed}
            showFrameworkSelector={true}
            similarQuestions={[]}
            solutionFiles={question.solutionBundle?.files}
            studyListKey={studyListKey}
            writeup={solution}
            onFrameworkChange={onFrameworkChange}
            onOpenSolutionInWorkspace={onOpenSolutionInWorkspace}
          />
        )}
        <div
          className={clsx(
            'flex-col gap-y-6',
            'px-3',
            // Needed to use CSS instead because conditionally rendering the code editor
            // is not working with update file for open solution in workspace flow. Need to check why.
            mode === 'practice' ? 'flex' : 'hidden',
          )}>
          <Divider />
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Heading
                className={textVariants({
                  size: 'body1',
                  weight: 'bold',
                })}
                level="custom"
                tag="p">
                {intl.formatMessage({
                  defaultMessage: 'Code Editor',
                  description: 'Coding workspace code editor heading',
                  id: 'QjBlCT',
                })}
              </Heading>
              <Text color="secondary" size="body2">
                {intl.formatMessage({
                  defaultMessage: 'Start coding your solution here',
                  description: 'Coding workspace code editor description',
                  id: 'Hv6acz',
                })}
              </Text>
            </div>
            <UserInterfaceCodingWorkspaceCodeEditorMobile
              activeTabId={activeTabId}
              closeFile={closeFile}
              setActiveTabId={setActiveTabId}
              tabContents={tabContents}
            />
          </div>
          <Divider />
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Heading
                className={textVariants({
                  size: 'body1',
                  weight: 'bold',
                })}
                level="custom"
                tag="p">
                {intl.formatMessage({
                  defaultMessage: 'Browser preview and Console',
                  description: 'Coding workspace preview heading',
                  id: 'oRJbie',
                })}
              </Heading>
              <Text color="secondary" size="body2">
                {intl.formatMessage({
                  defaultMessage: 'Test and preview your UI in real time',
                  description: 'Coding workspace preview description',
                  id: 'UK7olU',
                })}
              </Text>
            </div>
            <UserInterfaceCodingWorkspacePreviewMobile />
          </div>
        </div>

        <CodingWorkspaceDescriptionAddOnItems
          adPlacement="questions_ui"
          className={clsx('space-y-3', 'px-3 pb-6')}
          nextQuestions={nextQuestions}
          showAd={true}
          similarQuestions={similarQuestions}
        />
      </div>
      <CodingWorkspaceMobileExperienceBanner />
      <UserInterfaceCodingWorkspaceBottomBar
        device="mobile"
        framework={framework}
        metadata={metadata}
        mode={mode}
        nextQuestions={nextQuestions}
        question={question}
        replaceCodeEditorContents={replaceCodeEditorContents}
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout_mobile"
        studyListKey={studyListKey}
        onFrameworkChange={onFrameworkChange}
        onModeChange={onModeChange}
      />
    </div>
  );
}
