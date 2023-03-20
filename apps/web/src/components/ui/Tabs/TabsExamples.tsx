import { useState } from 'react';

import Tabs from './Tabs';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const tabs = [
  { label: 'My Account', value: 'my-account' },
  { label: 'Company', value: 'company' },
  { label: 'Team Members', value: 'team' },
  { label: 'Billing', value: 'billing' },
];

export default function TabsExamples() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <UIExamplesGroup title="Tabs">
      <div className="space-y-4">
        <Tabs
          label="Select navigation item"
          tabs={tabs}
          value={selectedTab}
          onSelect={setSelectedTab}
        />
        <Tabs
          label="Select navigation item"
          size="sm"
          tabs={tabs}
          value={selectedTab}
          onSelect={setSelectedTab}
        />
      </div>
    </UIExamplesGroup>
  );
}
