import TextArea from './TextArea';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function TextAreaExamples() {
  return (
    <UIExamplesGroup gapSize="lg" title="Text Area">
      <TextArea label="Email" placeholder="john.doe@email.com" />
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
        label="Disabled textarea"
        placeholder="John Doe"
      />
      <TextArea
        errorMessage="Enter more than 4 words please"
        label="Message"
        placeholder="This is such a great product"
      />
      <TextArea
        fontSize="xs"
        label="Smaller text size"
        placeholder="This is such a great product"
      />
    </UIExamplesGroup>
  );
}
