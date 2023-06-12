import { useState } from 'react';
import {
  RiAccountCircleFill,
  RiBuildingLine,
  RiGroupLine,
} from 'react-icons/ri';

import Tabs from './Tabs';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const tabs = [
  { icon: RiAccountCircleFill, label: 'Account', value: 'account' },
  { icon: RiBuildingLine, label: 'Company', value: 'company' },
  { icon: RiGroupLine, label: 'Team Members', value: 'team' },
];

export default function TabsExamples() {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <UIExamplesGroup darkMode="horizontal" title="Tabs">
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
