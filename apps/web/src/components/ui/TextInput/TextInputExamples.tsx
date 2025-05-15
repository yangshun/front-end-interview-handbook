import { RiMailFill, RiPhoneFill } from 'react-icons/ri';

import UIExamplesGroup from '../misc/UIExamplesGroup';
import type { TextInputSize } from './TextInput';
import TextInput from './TextInput';

const sizes: ReadonlyArray<TextInputSize> = ['md', 'sm', 'xs'];

export default function TextInputExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Text Input">
      <div className="flex gap-x-12">
        {sizes.map((size) => (
          <TextInput
            key={size}
            label="Email"
            placeholder="john.doe@example.com"
            size={size}
            type="email"
          />
        ))}
      </div>
      <TextInput
        description="Minimum 6 characters"
        label="Password"
        type="password"
      />
      <TextInput
        description="Minimum 6 characters"
        errorMessage="Password is too simple!"
        label="Password"
        type="password"
      />
      <TextInput
        isLabelHidden={true}
        label="Name"
        placeholder="Label is hidden"
        type="text"
      />
      <div className="flex gap-x-24">
        {sizes.map((size) => (
          <TextInput
            key={size}
            label="Email"
            placeholder="you@example.com"
            size={size}
            startIcon={RiMailFill}
            type="email"
          />
        ))}
      </div>
      <div className="flex gap-x-12">
        {sizes.map((size) => (
          <TextInput
            key={size}
            endIcon={RiPhoneFill}
            label="Phone number"
            placeholder="(234) 56-7890"
            size={size}
            type="text"
          />
        ))}
      </div>
      <TextInput
        isDisabled={true}
        label="Disabled input"
        placeholder="John Doe"
        type="text"
      />
      <TextInput
        label="Required input"
        placeholder="You shouldn't leave this empty"
        required={true}
        type="text"
      />
      <TextInput
        label="Maximum length"
        maxLength={10}
        placeholder="Maximum of 10 characters"
        type="text"
      />
      <TextInput
        description="There's nothing to see here"
        descriptionStyle="tooltip"
        label="Description in tooltip"
        placeholder="You shouldn't leave this empty"
        type="text"
      />
      <TextInput
        description="Still has a description"
        isLabelHidden={true}
        label="Name"
        placeholder="Hidden labels cannot have descriptions"
      />
      <TextInput
        isLabelHidden={true}
        label="Name"
        maxLength={100}
        placeholder="Hidden labels with max length"
      />
    </UIExamplesGroup>
  );
}
