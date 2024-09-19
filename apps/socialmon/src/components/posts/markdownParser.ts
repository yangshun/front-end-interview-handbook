import DOMPurify from 'dompurify';
import { marked } from 'marked';

export function parseMarkdown(content: string) {
  const parsedContent = marked.parse(content) as string;

  if (!window) {
    return '';
  }

  return DOMPurify.sanitize(parsedContent);
}
