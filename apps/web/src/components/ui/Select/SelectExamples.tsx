import { useState } from 'react';

import Select from './Select';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function SelectExamples() {
  const [value, setValue] = useState('javascript');

  return (
    <UIExamplesGroup title="Select">
      <div className="flex gap-x-4">
        <Select
          label="Framework"
          options={[
            {
              label: 'JavaScript',
              value: 'javascript',
            },
            {
              label: 'React',
              value: 'react',
            },
          ]}
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        />
        <Select
          label="Framework"
          options={[
            {
              label: 'JavaScript',
              value: 'javascript',
            },
            {
              label: 'React',
              value: 'react',
            },
          ]}
          size="sm"
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        />
      </div>
    </UIExamplesGroup>
  );
}
