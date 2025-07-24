'use client';

import type { SandboxEnvironment } from '@codesandbox/sandpack-react';
import { SandpackProvider } from '@codesandbox/sandpack-react';
import clsx from 'clsx';

import CodingPreferencesProvider from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';
import type { ProjectsChallengeSolutionBundle } from '~/components/projects/challenges/types';
import SandpackObservability from '~/components/workspace/common/sandpack/SandpackObservability';
import { SandpackTimeout } from '~/components/workspace/common/sandpack/SandpackTimeout';
import { useSandpackBundlerURL } from '~/components/workspace/common/sandpack/useSandpackBundlerURL';

import ProjectsChallengeSolutionWorkspace from './ProjectsChallengeSolutionWorkspace';

type Props = Readonly<{
  solution: ProjectsChallengeSolutionBundle;
}>;

const sandpackO11yInstance = 'projects.challenge_solution';

export default function ProjectsChallengeSolutionSection({ solution }: Props) {
  const { colorScheme } = useColorSchemePreferences();
  const [bundlerURL, changeToFallbackUrl] =
    useSandpackBundlerURL(sandpackO11yInstance);
  const { files, workspace } = solution;

  return (
    <CodingPreferencesProvider>
      <SandpackProvider
        // Remount if the bundler URL changes
        key={bundlerURL}
        customSetup={{
          environment: workspace.environment as SandboxEnvironment,
        }}
        files={files}
        options={{
          activeFile: workspace?.activeFile,
          bundlerURL,
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
        <SandpackTimeout
          instance={sandpackO11yInstance}
          onTimeout={() => changeToFallbackUrl('timeout')}
        />
        <SandpackObservability
          bundlerURL={bundlerURL}
          instance={sandpackO11yInstance}
        />
      </SandpackProvider>
    </CodingPreferencesProvider>
  );
}
