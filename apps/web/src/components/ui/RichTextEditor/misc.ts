import type { RichTextEditorEventType } from './types';

export const richTextEditorToolbarEventTypes: Record<
  RichTextEditorEventType,
  RichTextEditorEventType
> = {
  bold: 'bold',
  code: 'code',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  italic: 'italic',
  normal: 'normal',
  ol: 'ol',
  quote: 'quote',
  redo: 'redo',
  strikethrough: 'strikethrough',
  subscript: 'subscript',
  superscript: 'superscript',
  ul: 'ul',
  underline: 'underline',
  undo: 'undo',
};
