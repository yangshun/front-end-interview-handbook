import { RichTextEditorConfig } from './RichTextEditorConfig';
import type { ProseTextSize } from '../Prose';
import { proseStyle } from '../Prose';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

type Props = Readonly<{
  className?: string;
  textSize?: ProseTextSize;
  value: string;
}>;

export default function RichText({ value, ...props }: Props) {
  return (
    <LexicalComposer
      initialConfig={{
        ...RichTextEditorConfig,
        editable: false,
        editorState: value,
      }}>
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={
          <ContentEditable
            className={proseStyle(props.textSize, props.className)}
          />
        }
        placeholder={null}
      />
    </LexicalComposer>
  );
}
