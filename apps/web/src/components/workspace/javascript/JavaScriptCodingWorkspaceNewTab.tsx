'use client';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import { INTERVIEWS_JS_COMMUNITY_SOLUTIONS_IS_LIVE } from '../../../data/FeatureFlags';
import type {
  JavaScriptCodingWorkspacePredefinedTabsContents,
  JavaScriptCodingWorkspacePredefinedTabsType,
} from './JavaScriptCodingWorkspaceTypes';

export default function JavaScriptCodingWorkspaceNewTab({
  onSelectTabType,
  predefinedTabs,
}: Readonly<{
  onSelectTabType: (
    tabType: JavaScriptCodingWorkspacePredefinedTabsType,
  ) => void;
  predefinedTabs: JavaScriptCodingWorkspacePredefinedTabsContents;
}>) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-2 p-4">
      <Text className="block" size="body2" weight="medium">
        {intl.formatMessage({
          defaultMessage: 'Tabs',
          description: 'Coding workspace tabs',
          id: 'gsNMIS',
        })}
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
