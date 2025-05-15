import { useState } from 'react';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import Typeahead from './Typeahead';

const options = [
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Yellow',
    value: 'yellow',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
  {
    label: 'Black',
    value: 'black',
  },
];

export default function TypeaheadExamples() {
  const [value, setValue] = useState<ReadonlyArray<
    (typeof options)[number]
  > | null>([options[0]]);

  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Typeahead">
      <Typeahead label="Colors" options={options} placeholder="Select colors" />
      <Typeahead
        isLabelHidden={true}
        label="Colors"
        options={options}
        placeholder="Label is hidden"
      />
      <Typeahead label="Colors" options={options} placeholder="Select colors" />
      <Typeahead isDisabled={true} label="Disabled" options={options} />
      <Typeahead
        errorMessage={
          !value?.map((item) => item.value).includes('orange')
            ? 'Must select orange'
            : undefined
        }
        label="Colors"
        options={options}
        value={value}
        onChange={setValue}
      />
      <Typeahead
        label="Required input"
        options={options}
        placeholder="Select colors"
        required={true}
      />
    </UIExamplesGroup>
  );
}
