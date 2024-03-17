import clsx from 'clsx';

import { RichTextEditorConfig } from './RichTextEditorConfig';
import type { ProseTextSize } from '../Prose';
import { proseStyle } from '../Prose';
import { themeTextColor } from '../theme';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

type RichTextColor = 'body' | 'default';

type Props = Readonly<{
  className?: string;
  color?: RichTextColor;
  size?: ProseTextSize;
  value: string;
}>;

const textColorClasses: Record<RichTextColor, string> = {
  body: themeTextColor,
  default: '',
};

export default function RichText({
  className,
  color = 'default',
  size,
  value,
}: Props) {
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
            className={proseStyle(
              size,
              clsx(textColorClasses[color], className),
            )}
          />
        }
        placeholder={null}
      />
    </LexicalComposer>
  );
}
