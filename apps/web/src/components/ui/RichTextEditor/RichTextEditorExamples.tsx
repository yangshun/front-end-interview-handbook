import RichTextEditor from './RichTextEditor';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function RichTextEditorExamples() {
  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Richtext Editor">
      <RichTextEditor
        isLabelHidden={true}
        label="Richtext Editor"
        placeholder="Enter"
      />
    </UIExamplesGroup>
  );
}
