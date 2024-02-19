import clsx from 'clsx';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ReadonlyDirectoryExplorer from '~/components/common/directory-explorer/ReadonlyDirectoryExplorer';
import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

type Props = Readonly<{
  branchName: string;
  className?: string;
  repoName: string;
  repoOwner: string;
}>;

export function isImageFile(filePath: string) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp|heif|svg|pdf|psd)$/i.test(filePath);
}

export default function GithubRepositoryCodeViewer({
  className,
  repoName,
  repoOwner,
  branchName,
}: Props) {
  const intl = useIntl();

  const { data: filePaths, isInitialLoading: isFetchingFilePaths } =
    trpc.projects.submission.getGitHubRepositoryFilePaths.useQuery(
      {
        branchName,
        repoName,
        repoOwner,
      },
      {
        keepPreviousData: true,
        refetchOnMount: false,
      },
    );

  const [activeFile, setActiveFile] = useState('README.md');

  const { data: fileContents, isInitialLoading: isFetchingFileContents } =
    trpc.projects.submission.getGitHubFileContents.useQuery(
      {
        filePath: activeFile,
        repoName,
        repoOwner,
      },
      {
        keepPreviousData: true,
      },
    );

  return (
    <div className={clsx('flex w-full overflow-y-hidden', className)}>
      {isFetchingFileContents || isFetchingFilePaths ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : !filePaths || !fileContents ? (
        <div className="flex h-full w-full items-center justify-center">
          <EmptyState
            title={intl.formatMessage({
              defaultMessage: 'Could not load files from repository',
              description:
                'Error message when files from a repository could not be loaded',
              id: 'BIOtRD',
            })}
            variant="error"
          />
        </div>
      ) : (
        <>
          <div className="flex w-[300px] flex-col overflow-y-auto p-2">
            <ReadonlyDirectoryExplorer
              activeFile={activeFile}
              filePaths={filePaths}
              onActiveFileChange={setActiveFile}
            />
          </div>
          <div className="flex-1">
            {isImageFile(activeFile) ? (
              <img alt={activeFile} className="w-full" src={fileContents} />
            ) : (
              <MonacoCodeEditor
                filePath={activeFile}
                readOnly={true}
                value={fileContents}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
