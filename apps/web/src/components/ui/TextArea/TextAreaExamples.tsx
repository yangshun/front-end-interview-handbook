import type { TextAreaSize } from './TextArea';
import TextArea from './TextArea';
import UIExamplesGroup from '../misc/UIExamplesGroup';

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
        description="Enter your name, anything you want"
        label="Name"
        placeholder="John Doe"
      />
      <TextArea
        isLabelHidden={true}
        label="Name"
        placeholder="Label is hidden"
      />
      <TextArea
        disabled={true}
        label="Disabled Textarea"
        placeholder="You can't type here"
      />
      <TextArea
        errorMessage="Enter more than 4 words please"
        label="Message"
        placeholder="This is such a great product"
      />
    </UIExamplesGroup>
  );
}
