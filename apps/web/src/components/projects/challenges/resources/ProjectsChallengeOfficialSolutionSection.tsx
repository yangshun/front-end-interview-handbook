'use client';

import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';
import SandpackTimeoutLogger from '~/components/workspace/common/sandpack/SandpackTimeoutLogger';

import solution from '~/__generated__/questions/user-interface/counter/vanilla/solution.json';

import ProjectsChallengeOfficialSolutionWorkspace from './ProjectsChallengeOfficialSolutionWorkspace';

import type { SandboxEnvironment } from '@codesandbox/sandpack-react';
import { SandpackProvider } from '@codesandbox/sandpack-react';

export default function ProjectsChallengeOfficialSolutionSection() {
  const { colorScheme } = useColorSchemePreferences();

  const { workspace, files } = solution;

  return (
    <CodingPreferencesProvider>
      <SandpackProvider
        customSetup={{
          environment: workspace.environment as SandboxEnvironment,
        }}
        files={files}
        options={{
          ...sandpackProviderOptions,
          activeFile: workspace?.activeFile,
          classes: {
            'sp-input': 'touch-none select-none pointer-events-none',
            'sp-layout': 'h-full',
            'sp-stack': 'h-full',
            'sp-wrapper': clsx('!w-full !text-sm !h-[650px]'),
          },
          visibleFiles: workspace?.visibleFiles.slice() ?? undefined,
        }}
        theme={colorScheme === 'dark' ? 'dark' : undefined}>
        <ProjectsChallengeOfficialSolutionWorkspace
          activeTabScrollIntoView={true}
          defaultFiles={files}
        />
        <SandpackTimeoutLogger instance="projects.official_solutions" />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
