'use client';

import clsx from 'clsx';
import { type ComponentProps } from 'react';
import { useCallback, useState } from 'react';

import { useIntl } from '~/components/intl';
import Alert from '~/components/ui/Alert';
import Divider from '~/components/ui/Divider';
import Heading from '~/components/ui/Heading';
import Text, { textVariants } from '~/components/ui/Text';
import { themeBackgroundColor } from '~/components/ui/theme';
import CodingWorkspaceDescriptionAddOnItems from '~/components/workspace/common/CodingWorkspaceDescriptionAddOnItems';
import CodingWorkspaceMobileExperienceBanner from '~/components/workspace/common/CodingWorkspaceMobileExperienceBanner';
import CodingWorkspaceConsole from '~/components/workspace/common/console/CodingWorkspaceConsole';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';
import {
  useCodingWorkspaceDispatch,
  useCodingWorkspaceSelector,
} from '~/components/workspace/common/store/hooks';
import { updateFile } from '~/components/workspace/common/store/sandpack-slice';
import JavaScriptCodingWorkspaceCodeEditor from '~/components/workspace/javascript/editor/JavaScriptCodingWorkspaceCodeEditor';
import JavaScriptCodingWorkspaceSolution from '~/components/workspace/javascript/solution/JavaScriptCodingWorkspaceSolution';

import type { JavaScriptWorkspaceRenderProps } from './JavaScriptCodingWorkspace';
import JavaScriptCodingWorkspaceBottomBar from './JavaScriptCodingWorkspaceBottomBar';
import JavaScriptCodingWorkspaceDescription from './JavaScriptCodingWorkspaceDescription';

type Props = JavaScriptWorkspaceRenderProps;
type Mode = ComponentProps<typeof JavaScriptCodingWorkspaceBottomBar>['mode'];

export default function JavaScriptCodingWorkspaceMobile({
  canViewPremiumContent,
  embed,
  nextQuestions,
  question,
  similarQuestions,
  studyListKey,
}: Props) {
  const intl = useIntl();
  const { description, metadata, solution, workspace } = question;
  const [mode, setMode] = useState<Mode>('practice');

  const onModeChange = useCallback((value: Mode) => {
    window.scrollTo(0, 0);
    setMode(value);
  }, []);

  const onOpenSolutionInWorkspace = useCallback(() => {
    onModeChange('practice');
  }, [onModeChange]);

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
          <JavaScriptCodingWorkspaceDescription
            canViewPremiumContent={canViewPremiumContent}
            description={description}
            metadata={metadata}
            nextQuestions={[]}
            showAd={!embed}
            showLanguageSelector={true}
            similarQuestions={[]}
            studyListKey={studyListKey}
          />
        )}
        {mode === 'solution' && (
          <JavaScriptCodingWorkspaceSolution
            canViewPremiumContent={canViewPremiumContent}
            isMobile={true}
            metadata={metadata}
            nextQuestions={[]}
            showLanguageSelector={true}
            similarQuestions={[]}
            solution={solution}
            studyListKey={studyListKey}
            onOpenSolutionInWorkspace={onOpenSolutionInWorkspace}
          />
        )}
        <div
          className={clsx(
            'flex-col gap-y-6 px-3',
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
            <div className="h-[362px] overflow-hidden rounded-sm">
              <JavaScriptCodingWorkspaceCodeEditor
                filePath={workspace.main}
                isMobile={true}
                type="coding"
                onOpenSolution={() => onModeChange('solution')}
              />
            </div>
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
                  defaultMessage: 'Test cases',
                  description: 'Coding workspace test cases heading',
                  id: 'CXucIh',
                })}
              </Heading>
              <Text color="secondary" size="body2">
                {intl.formatMessage({
                  defaultMessage:
                    'Automated test cases your code will be run against on desktop',
                  description: 'Coding workspace test cases description',
                  id: 'xKcTPG',
                })}
              </Text>
            </div>
            <div className="h-[290px] overflow-hidden rounded-sm">
              <TestsCodeEditorMobile specPath={workspace.run} />
            </div>
            <Alert borderClass="!rounded-sm" variant="warning">
              {intl.formatMessage({
                defaultMessage:
                  'Running automated test cases and submission is not supported on mobile devices. Use a wider screen for a better experience.',
                description: 'Coding workspace not supported on mobile warning',
                id: '+oqIZ2',
              })}
            </Alert>
          </div>
          <Divider />
          <div className="space-y-3">
            <Heading
              className={textVariants({
                size: 'body1',
                weight: 'bold',
              })}
              level="custom"
              tag="p">
              {intl.formatMessage({
                defaultMessage: 'Console',
                description: 'Coding workspace console heading',
                id: 'EB0DMx',
              })}
            </Heading>
            <div
              className={clsx(
                'h-[306px] overflow-hidden rounded-sm',
                themeBackgroundColor,
              )}>
              <CodingWorkspaceConsole />,
            </div>
          </div>
        </div>
        <CodingWorkspaceDescriptionAddOnItems
          adPlacement="questions_js"
          className={clsx('space-y-3', 'px-3 pb-6')}
          nextQuestions={nextQuestions}
          showAd={true}
          similarQuestions={similarQuestions}
        />
      </div>
      <CodingWorkspaceMobileExperienceBanner />
      <JavaScriptCodingWorkspaceBottomBar
        device="mobile"
        layout={embed ? 'minimal' : 'full'}
        metadata={metadata}
        mode={mode}
        nextQuestions={nextQuestions}
        slideOutSearchParam_MUST_BE_UNIQUE_ON_PAGE="qns_slideout_mobile"
        studyListKey={studyListKey}
        onModeChange={onModeChange}
      />
    </div>
  );
}

function TestsCodeEditorMobile({
  specPath,
}: Readonly<{
  specPath: string;
}>) {
  const workspaceDispatch = useCodingWorkspaceDispatch();
  const files = useCodingWorkspaceSelector(
    (state) => state.sandpack.current.files,
  );

  return (
    <MonacoCodeEditor
      filePath={specPath}
      value={files[specPath].code}
      onChange={(val) => {
        workspaceDispatch(updateFile({ content: val ?? '', path: specPath }));
      }}
    />
  );
}
