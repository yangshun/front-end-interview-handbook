import clsx from 'clsx';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import ReadonlyDirectoryExplorer from '~/components/common/directory-explorer/ReadonlyDirectoryExplorer';
import EmptyState from '~/components/ui/EmptyState';
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
  const intl = useIntl();

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

  if (!filePaths || !fileContents) {
    return (
      <EmptyState
        title={intl.formatMessage({
          defaultMessage: 'Could not load files from repository',
          description:
            'Error message when files from a repository could not be loaded',
          id: 'BIOtRD',
        })}
        variant="error"
      />
    );
  }

  return (
    <div className={clsx('flex overflow-y-hidden', className)}>
      <div className="flex flex-col w-[300px] overflow-y-auto p-2">
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
