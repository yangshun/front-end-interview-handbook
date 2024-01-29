export type RichTextEditorEventType =
  | 'code'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'italic'
  | 'normal'
  | 'ol'
  | 'quote'
  | 'redo'
  | 'strikethrough'
  | 'subscript'
  | 'superscript'
  | 'ul'
  | 'underline'
  | 'undo';

export type RichTextEditorHeadingType = 'h1' | 'h2' | 'h3' | 'normal';

export type RichTextEditorSpecialCase =
  | 'strikethrough'
  | 'subscript'
  | 'superscript';
