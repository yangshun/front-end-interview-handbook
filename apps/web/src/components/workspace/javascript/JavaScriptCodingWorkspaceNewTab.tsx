import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import type {
  JavaScriptCodingWorkspacePredefinedTabsContents,
  JavaScriptCodingWorkspacePredefinedTabsType,
} from './JavaScriptCodingWorkspaceTypes';
import { INTERVIEWS_JS_COMMUNITY_SOLUTIONS_IS_LIVE } from '../../../data/FeatureFlags';

export default function JavaScriptCodingWorkspaceNewTab({
  predefinedTabs,
  onSelectTabType,
}: Readonly<{
  onSelectTabType: (
    tabType: JavaScriptCodingWorkspacePredefinedTabsType,
  ) => void;
  predefinedTabs: JavaScriptCodingWorkspacePredefinedTabsContents;
}>) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Text className="block" size="body2" weight="medium">
        Tabs
      </Text>
      <div className="flex flex-wrap gap-2">
        {Object.entries(predefinedTabs)
          .filter(([tabType]) =>
            INTERVIEWS_JS_COMMUNITY_SOLUTIONS_IS_LIVE
              ? true
              : tabType !== 'community_solutions' &&
                tabType !== 'community_solution_create',
          )
          .map(([tabType, tabDetails]) => (
            <Button
              key={tabType}
              addonPosition="start"
              icon={tabDetails.icon}
              iconSecondary_USE_SPARINGLY={tabDetails.iconSecondary}
              label={tabDetails.label}
              variant="secondary"
              onClick={() => {
                onSelectTabType(
                  tabType as JavaScriptCodingWorkspacePredefinedTabsType,
                );
              }}
            />
          ))}
      </div>
    </div>
  );
}
