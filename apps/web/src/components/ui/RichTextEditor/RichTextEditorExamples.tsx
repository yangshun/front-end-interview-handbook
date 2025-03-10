import { useState } from 'react';

import RichTextEditor from './RichTextEditor';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function RichTextEditorExamples() {
  const [value, setValue] = useState('');

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
        value={value}
        onChange={setValue}
      />
      {value && (
        <pre className="max-h-[300px] overflow-auto p-2 text-xs">
          {JSON.stringify(JSON.parse(value), null, 2)}
        </pre>
      )}
    </UIExamplesGroup>
  );
}
