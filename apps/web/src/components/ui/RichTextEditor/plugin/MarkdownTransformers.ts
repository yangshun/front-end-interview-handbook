import type { Transformer } from '@lexical/markdown';
import {
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
} from '@lexical/markdown';

export const PLAYGROUND_TRANSFORMERS: Array<Transformer> = [
  ...ELEMENT_TRANSFORMERS,
  ...TEXT_FORMAT_TRANSFORMERS,
];
