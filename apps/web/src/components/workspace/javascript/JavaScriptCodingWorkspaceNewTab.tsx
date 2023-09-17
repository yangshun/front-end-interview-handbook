import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

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
      <Text display="block" size="body2" weight="medium">
        Tabs
      </Text>
      <div className="flex flex-wrap gap-2">
        {Object.entries(predefinedTabs).map(([tabType, tabDetails]) => (
          <Button
            key={tabType}
            addonPosition="start"
            icon={tabDetails.icon}
            label={tabDetails.label}
            variant="secondary"
            onClick={() => {
              onSelectTabType(tabType as keyof PredefinedTabsContents);
            }}
          />
        ))}
      </div>
    </div>
  );
}
