import type { PredefinedTabsContents } from './JavaScriptCodingWorkspace';

export default function JavaScriptCodingWorkspaceNewTab({
  predefinedTabs,
  onSelectTabType,
}: Readonly<{
  onSelectTabType: (tabType: keyof PredefinedTabsContents) => void;
  predefinedTabs: PredefinedTabsContents;
}>) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-sm font-medium">Tools</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
          <button
            key={tabType}
            className="rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
            type="button"
            onClick={() => {
              onSelectTabType(tabType as keyof PredefinedTabsContents);
            }}>
            {tabDetails.label}
          </button>
        ))}
      </div>
    </div>
  );
}
