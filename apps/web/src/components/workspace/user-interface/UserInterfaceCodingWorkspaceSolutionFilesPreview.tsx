import type { SandpackFiles } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { useState } from 'react';

import { useIntl } from '~/components/intl';
import MDXCodeBlock from '~/components/mdx/MDXCodeBlock';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';
import { codingWorkspaceExtractFileNameFromPath } from '~/components/workspace/common/codingWorkspaceExtractFileNameFromPath';
import getLanguageFromFilePath from '~/components/workspace/common/editor/getLanguageFromFilePath';

import UserInterfaceCodingWorkspacePushCodeToEditorButton from './UserInterfaceCodingWorkspacePushCodeToEditorButton';

type Props = Readonly<{
  files: SandpackFiles;
  onOpenSolutionInWorkspace: ComponentProps<
    typeof UserInterfaceCodingWorkspacePushCodeToEditorButton
  >['onOpenSolutionInWorkspace'];
  openInWorkspaceMetadata: ComponentProps<
    typeof UserInterfaceCodingWorkspacePushCodeToEditorButton
  >['metadata'];
  showOpenInWorkspace: boolean;
  type: ComponentProps<
    typeof UserInterfaceCodingWorkspacePushCodeToEditorButton
  >['type'];
}>;

export default function UserInterfaceCodingWorkspaceSolutionFilesPreview({
  files,
  onOpenSolutionInWorkspace,
  openInWorkspaceMetadata,
  showOpenInWorkspace,
  type,
}: Props) {
  const intl = useIntl();
  const [selectedFile, setSelectedFile] = useState<string>('');

  const fileEntries = Object.entries(files).filter(
    ([filePath]) =>
      filePath !== '/package.json' && filePath !== '/tsconfig.json',
  );

  if (fileEntries.length === 0) {
    return null;
  }

  const currentSelectedFile = selectedFile || fileEntries[0][0];
  const selectedFileData = files[currentSelectedFile];

  let selectedFileContent = '';

  if (selectedFileData) {
    if (typeof selectedFileData === 'string') {
      selectedFileContent = selectedFileData;
    } else if (selectedFileData?.code) {
      selectedFileContent = selectedFileData.code;
    }
  }

  selectedFileContent = selectedFileContent || '';

  if (typeof selectedFileContent !== 'string') {
    selectedFileContent = '';
  }

  function SafeCodeBlock({
    content,
    filePath,
  }: {
    content: string;
    filePath: string;
  }) {
    const safeContent =
      typeof content === 'string' && content.trim() ? content : '';

    if (!safeContent) {
      return (
        <div className="flex items-center justify-center py-8 text-neutral-500 dark:text-neutral-400">
          <Text size="body2">
            {intl.formatMessage({
              defaultMessage: 'This file is empty',
              description: 'Message shown when a solution file has no content',
              id: '3Tf+UB',
            })}
          </Text>
        </div>
      );
    }

    return (
      <MDXCodeBlock
        key={`${filePath}-${safeContent.length}`}
        language={getLanguageFromFilePath(filePath)?.language ?? 'javascript'}
        showCopyButton={true}
        showLineNumbers={true}>
        {safeContent}
      </MDXCodeBlock>
    );
  }

  return (
    <div>
      <div className={clsx('flex items-center justify-between gap-x-2')}>
        <Text size="body1" weight="bold">
          {intl.formatMessage({
            defaultMessage: 'Files',
            description: 'Solution files section heading',
            id: 'q/prth',
          })}
        </Text>
        {showOpenInWorkspace && (
          <UserInterfaceCodingWorkspacePushCodeToEditorButton
            files={files}
            metadata={openInWorkspaceMetadata}
            type={type}
            onOpenSolutionInWorkspace={onOpenSolutionInWorkspace}
          />
        )}
      </div>
      <div className="-ml-1.5 flex overflow-x-auto">
        {fileEntries.map(([filePath]) => {
          const isActive = filePath === currentSelectedFile;

          return (
            <button
              key={filePath}
              className={clsx('px-2 py-1.5')}
              type="button"
              onClick={() => setSelectedFile(filePath)}>
              <Text
                color={isActive ? 'default' : 'secondary'}
                size="body3"
                weight={isActive ? 'bold' : 'medium'}>
                {codingWorkspaceExtractFileNameFromPath(filePath)}
              </Text>
            </button>
          );
        })}
      </div>
      {/* Code display */}
      <Prose textSize="sm">
        <div className="m-0 [&>div>div>pre]:my-0">
          <SafeCodeBlock
            content={selectedFileContent}
            filePath={currentSelectedFile}
          />
        </div>
      </Prose>
    </div>
  );
}
