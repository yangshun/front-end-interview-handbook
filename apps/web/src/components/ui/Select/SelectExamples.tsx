import { useState } from 'react';

import Select from './Select';
import UIExamplesGroup from '../misc/UIExamplesGroup';

const options = [
  {
    label: 'JavaScript',
    value: 'javascript',
  },
  {
    label: 'React',
    value: 'react',
  },
  {
    label: 'Vue',
    value: 'vue',
  },
  {
    label: 'Angular',
    value: 'angular',
  },
];

export default function SelectExamples() {
  const [value, setValue] = useState('javascript');

  return (
    <UIExamplesGroup title="Select">
      <div className="flex gap-x-4">
        <Select
          label="Framework"
          options={options}
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        />
        <Select
          label="Framework"
          options={options}
          size="sm"
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        />
        <Select
          label="Framework"
          options={options}
          size="xs"
          value={value}
          onChange={(val) => {
            setValue(val);
          }}
        />
      </div>
    </UIExamplesGroup>
  );
}
