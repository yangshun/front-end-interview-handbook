import DOMPurify from 'dompurify';
import { marked } from 'marked';

import type { Comments } from '~/types';

export function isRedditComments(replies: Comments | ''): replies is Comments {
  return (
    typeof replies === 'object' &&
    replies !== null &&
    'data' in replies &&
    Array.isArray(replies.data.children)
  );
}

export function parseMarkdown(content: string) {
  const parsedContent = marked.parse(content) as string;

  return DOMPurify.sanitize(parsedContent);
}

export function redditPermalinkToUrl(permalink: string) {
  return new URL(permalink, 'https://reddit.com').href;
}

export function redditPermalinkToAPIUrl(permalink: string) {
  return new URL(permalink, 'https://api.reddit.com').href;
}
