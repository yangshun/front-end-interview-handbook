import { useTilesContext } from '~/react-tiling/state/useTilesContext';

import type {
  PredefinedTabsContents,
  StaticTabsType,
} from './UserInterfaceCodingWorkspace';

import { useSandpack } from '@codesandbox/sandpack-react';

type UserInterfaceCodingNewTabTypeData =
  | {
      payload: { code: string; file: string };
      type: 'code';
    }
  | {
      type: StaticTabsType;
    };

export default function UserInterfaceCodingWorkspaceNewTabContents({
  predefinedTabs,
  onSelectTabType,
}: Readonly<{
  onSelectTabType: (data: UserInterfaceCodingNewTabTypeData) => void;
  predefinedTabs: PredefinedTabsContents;
}>) {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const { queryTabByPattern } = useTilesContext();
  const openedFiles = new Set(
    queryTabByPattern(/^\//).map(({ tabId }) => tabId),
  );
  const unopenedFiles = Object.entries(files).filter(
    ([file]) => !openedFiles.has(file),
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Tools</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
            <button
              key={tabType}
              className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
              type="button"
              onClick={() => {
                onSelectTabType({ type: tabType });
              }}>
              {tabDetails.label}
            </button>
          ))}
        </div>
      </div>
      {unopenedFiles.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Files</p>
          <div className="flex flex-wrap gap-2">
            {unopenedFiles.map(([file, { code }]) => (
              <button
                key={file}
                className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
                type="button"
                onClick={() => {
                  onSelectTabType({
                    payload: { code, file },
                    type: 'code',
                  });
                }}>
                <code>{file.replace(/^\//, '')}</code>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
