import { useState } from 'react';

import Tabs from './Tabs';
import UIExamplesGroup from '../misc/UIExamplesGroup';

import {
  BanknotesIcon,
  BuildingLibraryIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

const tabs = [
  { icon: UserCircleIcon, label: 'Account', value: 'account' },
  { icon: BuildingLibraryIcon, label: 'Company', value: 'company' },
  { icon: UserGroupIcon, label: 'Team Members', value: 'team' },
  { icon: BanknotesIcon, label: 'Billing', value: 'billing' },
];

export default function TabsExamples() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <UIExamplesGroup title="Tabs">
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
      <Tabs
        label="Select navigation item"
        size="xs"
        tabs={tabs}
        value={selectedTab}
        onSelect={setSelectedTab}
      />
    </UIExamplesGroup>
  );
}
