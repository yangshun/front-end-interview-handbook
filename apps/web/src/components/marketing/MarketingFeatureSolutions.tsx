import clsx from 'clsx';
import { useState } from 'react';
import { RiJavascriptLine, RiReactjsLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import logEvent from '~/logging/logEvent';

import MarketingCodeMirrorTheme from './coding/MarketingCodeMirrorTheme';
import type { QuestionUserInterfaceBundle } from '../questions/common/QuestionsTypes';
import sandpackProviderOptions from '../workspace/common/sandpack/sandpackProviderOptions';
import SandpackTimeoutLogger from '../workspace/common/sandpack/SandpackTimeoutLogger';

import type { SandboxEnvironment } from '@codesandbox/sandpack-react';
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from '@codesandbox/sandpack-react';

const height = 450;
const editorPartPercentage = 70;
const previewPartPercentage = 100 - editorPartPercentage;

type Props = Readonly<{
  solutions: Readonly<{
    todoListReact: QuestionUserInterfaceBundle;
    todoListVanilla: QuestionUserInterfaceBundle;
  }>;
}>;

export default function MarketingFeatureSolutions({ solutions }: Props) {
  const { todoListReact, todoListVanilla } = solutions;
  const [selectedTab, setSelectedTab] = useState('react');
  const { workspace, files } =
    selectedTab === 'vanilla'
      ? {
          ...todoListVanilla,
          workspace: {
            ...todoListVanilla.workspace,
            activeFile: '/src/index.js',
          },
        }
      : {
          ...todoListReact,
          workspace: {
            ...todoListReact.workspace,
            activeFile: '/App.js',
          },
        };

  return (
    <div
      className={clsx(
        'relative flex max-h-[300px] max-w-full flex-col gap-y-2',
      )}>
      <div className="grow">
        <TabsUnderline
          label="Select framework"
          size="sm"
          tabs={[
            { icon: RiReactjsLine, label: 'React', value: 'react' },
            {
              icon: RiJavascriptLine,
              label: 'Vanilla JavaScript',
              value: 'vanilla',
            },
          ]}
          value={selectedTab}
          onSelect={(newTab) => {
            gtag.event({
              action: `homepage.solutions.${newTab}.click`,
              category: 'engagement',
              label: newTab,
            });
            logEvent('click', {
              element: 'Homepage solutions tab',
              label: newTab,
            });
            setSelectedTab(newTab);
          }}
        />
      </div>
      <SandpackProvider
        customSetup={{
          // Dependencies: setup?.dependencies,
          // entry: setup?.entry,
          environment: workspace?.environment as SandboxEnvironment | undefined,
        }}
        files={files}
        options={{
          ...sandpackProviderOptions,
          activeFile: workspace?.activeFile,
          classes: {
            'sp-input': 'touch-none select-none pointer-events-none',
            'sp-wrapper': '!w-[200%] !scale-50 !origin-top-left -mb-[200px]',
          },
          initMode: 'user-visible',
          initModeObserverOptions: { rootMargin: `1000px 0px` },
          visibleFiles: workspace?.visibleFiles,
        }}
        theme={MarketingCodeMirrorTheme}>
        <SandpackLayout>
          <SandpackCodeEditor
            showLineNumbers={true}
            showTabs={true}
            style={{
              // Reference: https://github.com/codesandbox/sandpack/blob/d1301bdbcf80c063e6ed63451f5b48ce55ea46e5/sandpack-react/src/presets/Sandpack.tsx
              flexGrow: editorPartPercentage,
              flexShrink: editorPartPercentage,
              height,
              minWidth:
                700 *
                (editorPartPercentage /
                  (previewPartPercentage + editorPartPercentage)),
            }}
            wrapContent={false}
          />
          <SandpackPreview
            showNavigator={true}
            showOpenInCodeSandbox={false}
            style={{
              // Reference: https://github.com/codesandbox/sandpack/blob/d1301bdbcf80c063e6ed63451f5b48ce55ea46e5/sandpack-react/src/presets/Sandpack.tsx
              flexGrow: previewPartPercentage,
              flexShrink: previewPartPercentage,
              height,
              minWidth:
                700 *
                (previewPartPercentage /
                  (previewPartPercentage + editorPartPercentage)),
            }}
          />
        </SandpackLayout>
        <SandpackTimeoutLogger instance="marketing.feature.solutions" />
      </SandpackProvider>
    </div>
  );
}
