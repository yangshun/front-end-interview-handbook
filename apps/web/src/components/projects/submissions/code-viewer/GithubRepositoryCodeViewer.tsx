import clsx from 'clsx';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ReadonlyDirectoryExplorer from '~/components/common/directory-explorer/ReadonlyDirectoryExplorer';
import EmptyState from '~/components/ui/EmptyState';
import Spinner from '~/components/ui/Spinner';
import MonacoCodeEditor from '~/components/workspace/common/editor/MonacoCodeEditor';

type Props = Readonly<{
  className?: string;
  repoName: string;
  repoOwner: string;
}>;

export function isImageFile(filePath: string) {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp|heif|svg|pdf|psd)$/i.test(filePath);
}

const DEFAULT_FILE = 'README.md';

export default function GithubRepositoryCodeViewer({
  className,
  repoName,
  repoOwner,
}: Props) {
  const intl = useIntl();

  const { data: filePaths, isInitialLoading: isFetchingFilePaths } =
    trpc.projects.submission.getGitHubRepositoryFilePaths.useQuery(
      {
        repoName,
        repoOwner,
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
        filePath: activeFile,
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
          <Spinner size="lg" />
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
      return <img alt={activeFile} className="w-full" src={fileContents} />;
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
              <Spinner size="lg" />
            </div>
          );
        }

        if (!filePaths) {
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
            <div className="flex w-[300px] flex-col overflow-y-auto p-2">
              <ReadonlyDirectoryExplorer
                activeFile={activeFile}
                filePaths={filePaths}
                onActiveFileChange={setActiveFile}
              />
            </div>
            <div className="flex-1">{renderFileContent()}</div>
          </>
        );
      })()}
    </div>
  );
}
