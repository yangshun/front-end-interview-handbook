import RichTextEditor from './RichTextEditor';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function RichTextEditorExamples() {
  return (
    <UIExamplesGroup
      darkMode="horizontal"
      gapSize="lg"
      title="Rich Text Editor">
      <RichTextEditor
        isLabelHidden={true}
        label="Summary"
        minHeight="300px"
        placeholder="Enter something"
      />
    </UIExamplesGroup>
  );
}
