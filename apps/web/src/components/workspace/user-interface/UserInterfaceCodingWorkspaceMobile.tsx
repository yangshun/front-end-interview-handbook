import clsx from 'clsx';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { themeBorderColor } from '~/components/ui/theme';

// Cannot lazy load the preview otherwise
// the bundling isn't triggered and no preview is shown.
import UserInterfaceCodingWorkspacePreview from './UserInterfaceCodingWorkspacePreview';

const SandpackLayout = dynamic(
  async () => {
    const { SandpackLayout: SandpackLayoutModule } = await import(
      '@codesandbox/sandpack-react'
    );

    return {
      default: SandpackLayoutModule,
    };
  },
  {
    ssr: false,
  },
);
const SandpackFileExplorer = dynamic(
  async () => {
    const { SandpackFileExplorer: SandpackFileExplorerModule } = await import(
      '@codesandbox/sandpack-react'
    );

    return {
      default: SandpackFileExplorerModule,
    };
  },
  {
    ssr: false,
  },
);
const SandpackCodeEditor = dynamic(
  async () => {
    const { SandpackCodeEditor: SandpackCodeEditorModule } = await import(
      '@codesandbox/sandpack-react'
    );

    return {
      default: SandpackCodeEditorModule,
    };
  },
  {
    ssr: false,
  },
);

// TODO: Loading this component crashes when using Turbopack.
export default function UserInterfaceCodingWorkspaceMobile({
  topAddOn,
}: Readonly<{
  topAddOn: ReactNode;
}>) {
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  if (laptopAndAbove) {
    return null;
  }

  return (
    <div
      className={clsx(
        'flex flex-col gap-y-6',
        'px-4',
        'mx-auto w-full max-w-3xl',
      )}>
      {topAddOn}
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor />
      </SandpackLayout>
      <div className={clsx('flex h-[500px] rounded border', themeBorderColor)}>
        <UserInterfaceCodingWorkspacePreview />
      </div>
    </div>
  );
}
