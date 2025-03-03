import clsx from 'clsx';

import type { RichTextEditorConfigType } from './RichTextEditorConfig';
import { RichTextEditorWithExternalLinkConfig } from './RichTextEditorConfig';
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
  editorConfig?: RichTextEditorConfigType;
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
  editorConfig,
}: Props) {
  return (
    <LexicalComposer
      initialConfig={{
        ...(editorConfig ? editorConfig : RichTextEditorWithExternalLinkConfig),
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
