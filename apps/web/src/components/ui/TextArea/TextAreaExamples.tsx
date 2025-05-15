import UIExamplesGroup from '../misc/UIExamplesGroup';
import type { TextAreaSize } from './TextArea';
import TextArea from './TextArea';

const sizes: ReadonlyArray<TextAreaSize> = ['md', 'sm', 'xs'];

export default function TextAreaExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Text Area">
      <div className="flex gap-x-12">
        {sizes.map((size) => (
          <TextArea
            key={size}
            label="Message"
            placeholder="Compliments only"
            size={size}
          />
        ))}
      </div>
      <TextArea
        description="Maximum of 200 characters"
        label="Message"
        placeholder="This is such a great product"
      />
      <TextArea
        description="Maximum of 200 characters"
        errorMessage="Enter more than 4 words please"
        label="Message"
        placeholder="This is such a great product"
      />
      <TextArea
        isLabelHidden={true}
        label="Name"
        placeholder="Label is hidden"
      />
      <TextArea
        disabled={true}
        label="Disabled textarea"
        placeholder="You can't type here"
      />
      <TextArea
        label="Required textarea"
        placeholder="You shouldn't leave this empty"
        required={true}
      />
      <TextArea
        label="Resize horizontal"
        placeholder="You can resize this textarea horizontally"
        resize="horizontal"
      />
      <TextArea
        label="Maximum length"
        maxLength={10}
        placeholder="Maximum of 10 characters"
      />
      <TextArea
        description="There's nothing to see here"
        descriptionStyle="tooltip"
        label="Description in tooltip"
        placeholder="You shouldn't leave this empty"
      />
      <TextArea
        description="Still has a description"
        isLabelHidden={true}
        label="Name"
        placeholder="Hidden labels cannot have descriptions"
      />
      <TextArea
        isLabelHidden={true}
        label="Name"
        maxLength={100}
        placeholder="Hidden labels with max length"
      />
      <TextArea
        autoResize={true}
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        label="Auto-resize"
        placeholder="Resizes according to content"
      />
    </UIExamplesGroup>
  );
}
