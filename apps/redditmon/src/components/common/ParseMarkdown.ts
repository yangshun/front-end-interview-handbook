import DOMPurify from 'dompurify';
import { marked } from 'marked';

// Configure marked renderer to open links in new tabs
const renderer = new marked.Renderer();

renderer.link = function link({ href, title, tokens }) {
  const text = this.parser.parseInline(tokens);
  const titleAttr = title ? ` title="${title}"` : '';

  return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
};

marked.setOptions({
  renderer,
});

export function parseMarkdown(content: string) {
  const parsedContent = marked.parse(content) as string;

  // Configure DOMPurify to allow target and rel attributes on links
  return DOMPurify.sanitize(parsedContent, {
    ADD_ATTR: ['target', 'rel'],
  });
}
