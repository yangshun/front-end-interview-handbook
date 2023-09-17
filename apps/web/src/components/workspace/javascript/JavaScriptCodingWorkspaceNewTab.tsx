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
      <p className="text-sm font-medium">Tabs</p>
      <div className="flex flex-wrap gap-2">
        {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
          <button
            key={tabType}
            className="flex gap-x-1.5 rounded-full border border-neutral-700 px-3 py-1.5 text-xs transition-colors hover:bg-neutral-700"
            type="button"
            onClick={() => {
              onSelectTabType(tabType as keyof PredefinedTabsContents);
            }}>
            <tabDetails.icon className="h-4 w-4 shrink-0" />
            {tabDetails.label}
          </button>
        ))}
      </div>
    </div>
  );
}
