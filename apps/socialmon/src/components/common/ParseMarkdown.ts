import DOMPurify from 'dompurify';
import { marked } from 'marked';

export function parseMarkdown(content: string) {
  const parsedContent = marked.parse(content) as string;

  return DOMPurify.sanitize(parsedContent);
}
