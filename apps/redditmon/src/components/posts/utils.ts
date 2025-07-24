import type { Comments } from '~/types';

export function isRedditComments(replies: Comments | ''): replies is Comments {
  return (
    typeof replies === 'object' &&
    replies !== null &&
    'data' in replies &&
    Array.isArray(replies.data.children)
  );
}

export function redditPermalinkToUrl(permalink: string) {
  return new URL(permalink, 'https://reddit.com').href;
}

export function redditPermalinkToAPIUrl(permalink: string) {
  return new URL(permalink, 'https://oauth.reddit.com').href;
}
