import { useState } from 'react';
import {
  RiAccountCircleFill,
  RiBuildingFill,
  RiGroupFill,
} from 'react-icons/ri';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import Tabs from './Tabs';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const tabs = [
  { icon: RiAccountCircleFill, label: 'Account', value: 'account' },
  { icon: RiBuildingFill, label: 'Company', value: 'company' },
  { icon: RiGroupFill, label: 'Team Members', value: 'team' },
];

export default function TabsExamples() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Tabs">
      <div className="grid gap-y-4">
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
      </div>
      <div className="grid gap-y-4">
        <TabsUnderline
          label="Select navigation item"
          tabs={tabs}
          value={selectedTab}
          onSelect={setSelectedTab}
        />
        <TabsUnderline
          label="Select navigation item"
          size="sm"
          tabs={tabs}
          value={selectedTab}
          onSelect={setSelectedTab}
        />
        <TabsUnderline
          label="Select navigation item"
          size="xs"
          tabs={tabs}
          value={selectedTab}
          onSelect={setSelectedTab}
        />
      </div>
    </UIExamplesGroup>
  );
}
