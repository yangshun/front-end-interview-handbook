import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import ReadonlyDirectoryExplorer from '~/components/common/directory-explorer/ReadonlyDirectoryExplorer';
import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';
import Img from '~/components/ui/Img';
import Spinner from '~/components/ui/Spinner';
import { themeBorderColor } from '~/components/ui/theme';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

import { isImageFile } from '~/utils/isImageFile';

type Props = Readonly<{
  className?: string;
  repoName: string;
  repoOwner: string;
  repoSubdirectoryPath: string | null;
}>;

const DEFAULT_FILE = 'README.md';

export default function GithubRepositoryCodeViewer({
  className,
  repoName,
  repoOwner,
  repoSubdirectoryPath,
}: Props) {
  const intl = useIntl();

  const { data: filePaths, isInitialLoading: isFetchingFilePaths } =
    trpc.projects.submission.getGitHubRepositoryFilePaths.useQuery(
      {
        repoName,
        repoOwner,
        repoSubdirectoryPath,
      },
      {
        keepPreviousData: true,
        refetchOnMount: false,
      },
    );

  const [activeFile, setActiveFile] = useState(DEFAULT_FILE);

  const { data: fileContents, isFetching: isFetchingFileContents } =
    trpc.projects.submission.getGitHubFileContents.useQuery(
      {
        filePath: repoSubdirectoryPath
          ? `${repoSubdirectoryPath}${activeFile}`
          : activeFile,
        repoName,
        repoOwner,
      },
      {
        keepPreviousData: true,
      },
    );

  const renderFileContent = () => {
    if (!fileContents && isFetchingFileContents) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size="md" />
        </div>
      );
    }

    if (!fileContents) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          {activeFile === DEFAULT_FILE ? (
            <EmptyState
              title={intl.formatMessage({
                defaultMessage:
                  'No file selected from the repository. Select a file to view.',
                description:
                  'Empty state message when the default file from the repository could not be loaded',
                id: 'wW8IAK',
              })}
            />
          ) : (
            <EmptyState
              title={intl.formatMessage({
                defaultMessage:
                  'Could not load the file from the repository. Select a different file to view.',
                description:
                  'Error message when the file from the repository could not be loaded',
                id: 'Et6OSf',
              })}
              variant="error"
            />
          )}
        </div>
      );
    }

    if (isImageFile(activeFile)) {
      return <Img alt={activeFile} className="w-full" src={fileContents} />;
    }

    return (
      <MonacoCodeEditor
        filePath={activeFile}
        keepCurrentModel={false}
        readOnly={true}
        value={fileContents}
        wordWrap={true}
      />
    );
  };

  return (
    <div className={clsx('flex w-full overflow-y-hidden', className)}>
      {(() => {
        if (isFetchingFilePaths) {
          return (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner size="md" />
            </div>
          );
        }

        if (!filePaths || filePaths.length === 0) {
          return (
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
          );
        }

        return (
          <>
            <div
              className={clsx(
                'hidden overflow-y-auto p-2',
                'flex-col',
                'md:flex',
                'w-[300px]',
                ['border-e', themeBorderColor],
              )}>
              <ReadonlyDirectoryExplorer
                activeFile={activeFile}
                filePaths={filePaths}
                onActiveFileChange={setActiveFile}
              />
            </div>
            <div className="flex-1 overflow-auto">
              {isFetchingFileContents ? (
                <div className="flex size-full items-center justify-center">
                  <Spinner className="block" />
                </div>
              ) : (
                renderFileContent()
              )}
            </div>
          </>
        );
      })()}
    </div>
  );
}
