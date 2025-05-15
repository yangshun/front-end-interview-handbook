import { useState } from 'react';

import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import RadioGroup from './RadioGroup';

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
];

export default function RadioGroupExamples() {
  const [value, setValue] = useState('javascript');

  return (
    <UIExamplesGroup darkMode="horizontal" title="Radio Group">
      <RadioGroup
        label="Framework"
        value={value}
        onChange={(val) => {
          setValue(val);
        }}>
        {...options.map((option) => (
          <RadioGroupItem key={option.value} {...option} />
        ))}
      </RadioGroup>
      <RadioGroup
        direction="vertical"
        label="Framework"
        value={value}
        onChange={(val) => {
          setValue(val);
        }}>
        {...options.map((option) => (
          <RadioGroupItem key={option.value} {...option} />
        ))}
      </RadioGroup>
    </UIExamplesGroup>
  );
}
