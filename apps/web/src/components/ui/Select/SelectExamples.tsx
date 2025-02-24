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
    <UIExamplesGroup darkMode="horizontal" title="Select">
      <div className="flex gap-x-24">
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
      <Select
        label="Framework"
        options={options}
        rounded="normal"
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
      />
      <Select
        isLabelHidden={true}
        label="Framework"
        options={options}
        value={value}
        onChange={(val) => {
          setValue(val);
        }}
      />
    </UIExamplesGroup>
  );
}
