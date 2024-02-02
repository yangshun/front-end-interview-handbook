import clsx from 'clsx';
import { useState } from 'react';

import ReadonlyDirectoryExplorer from '~/components/common/directory-explorer/ReadonlyDirectoryExplorer';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

import { useGithubFileContents, useGithubRepositoryFilePaths } from './utils';

type Props = Readonly<{
  branchName: string;
  className?: string;
  repoName: string;
  repoOwner: string;
}>;

export default function GithubRepositoryCodeViewer({
  className,
  repoName,
  repoOwner,
  branchName,
}: Props) {
  const { data: filePaths } = useGithubRepositoryFilePaths({
    branchName,
    repoName,
    repoOwner,
  });

  const [activeFile, setActiveFile] = useState('README.md');

  const { data: fileContents } = useGithubFileContents({
    branchName,
    filePath: activeFile,
    repoName,
    repoOwner,
  });

  return (
    <div className={clsx("flex overflow-y-hidden", className)}>
      <div className="w-[300px] overflow-y-auto">
        <ReadonlyDirectoryExplorer
          activeFile={activeFile}
          filePaths={filePaths}
          onActiveFileChange={setActiveFile}
        />
      </div>
      <div className="flex-1">
        <MonacoCodeEditor
          filePath={activeFile}
          readOnly={true}
          value={fileContents}
        />
      </div>
    </div>
  );
}
