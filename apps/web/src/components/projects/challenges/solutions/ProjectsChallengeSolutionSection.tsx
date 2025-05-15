'use client';

import type { SandboxEnvironment } from '@codesandbox/sandpack-react';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type { ProjectsChallengeSolutionBundle } from '~/components/projects/challenges/types';
import SandpackErrorReporting from '~/components/workspace/common/sandpack/SandpackErrorReporting';
import sandpackProviderOptions from '~/components/workspace/common/sandpack/sandpackProviderOptions';

import ProjectsChallengeSolutionWorkspace from './ProjectsChallengeSolutionWorkspace';

type Props = Readonly<{
  solution: ProjectsChallengeSolutionBundle;
}>;

export default function ProjectsChallengeSolutionSection({ solution }: Props) {
  const { colorScheme } = useColorSchemePreferences();

  const { files, workspace } = solution;

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
          externalResources: workspace?.externalResources,
          visibleFiles: workspace?.visibleFiles?.slice() ?? undefined,
        }}
        theme={colorScheme === 'dark' ? 'dark' : undefined}>
        <ProjectsChallengeSolutionWorkspace
          activeTabScrollIntoView={true}
          defaultFiles={files}
        />
        <SandpackErrorReporting instance="projects.official_solutions" />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
