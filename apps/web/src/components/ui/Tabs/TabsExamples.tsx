import { useState } from 'react';
import {
  RiAccountCircleFill,
  RiBuildingFill,
  RiGroupFill,
} from 'react-icons/ri';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

import Badge from '../Badge';
import UIExamplesGroup from '../misc/UIExamplesGroup';
import Tabs from './Tabs';

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
        <TabsUnderline
          label="Select navigation item"
          size="sm"
          tabs={[
            {
              addOn: (
                <Badge className="ml-1.5" label="23" variant="neutral-active" />
              ),
              icon: RiAccountCircleFill,
              label: 'Account',
              value: 'account',
            },
            {
              addOn: (
                <Badge className="ml-1.5" label="45" variant="neutral-active" />
              ),
              icon: RiBuildingFill,
              label: 'Company',
              value: 'company',
            },
            {
              addOn: (
                <Badge className="ml-1.5" label="67" variant="neutral-active" />
              ),
              icon: RiGroupFill,
              label: 'Team Members',
              value: 'team',
            },
          ]}
          value={selectedTab}
          onSelect={setSelectedTab}
        />
      </div>
    </UIExamplesGroup>
  );
}
