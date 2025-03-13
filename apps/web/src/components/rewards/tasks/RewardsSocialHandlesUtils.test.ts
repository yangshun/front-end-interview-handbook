import {
  cleanGitHubUserInput,
  cleanInstagramUserInput,
  cleanLinkedInUserInput,
  cleanTwitterUserInput,
} from './RewardsSocialHandlesUtils';

describe('cleanGitHubUserInput', () => {
  test.each([
    ['https://github.com/johndoe', 'johndoe'],
    ['https://github.com/john-doe', 'john-doe'],
    ['https://github.com/john-doe/', 'john-doe'],
    ['https://www.github.com/johndoe', 'johndoe'],
    ['http://github.com/johndoe', 'johndoe'],
    ['http://github.com/johndoe?utm_source=mobile', 'johndoe'],
    ['johndoe', 'johndoe'],
    ['johnDoe', 'johnDoe'],
    ['john-doe', 'john-doe'],
  ])('cleanGitHubUserInput(%s)', (input, expected) => {
    expect(cleanGitHubUserInput(input)).toBe(expected);
  });
});

describe('cleanInstagramUserInput', () => {
  test.each([
    ['https://instagram.com/johndoe', 'johndoe'],
    ['https://instagram.com/john-doe', 'john-doe'],
    ['https://instagram.com/john.doe', 'john.doe'],
    ['https://instagram.com/john_doe', 'john_doe'],
    ['https://instagram.com/john-doe/', 'john-doe'],
    ['https://www.instagram.com/johndoe', 'johndoe'],
    ['http://instagram.com/johndoe', 'johndoe'],
    ['http://instagram.com/johndoe?utm_source=mobile', 'johndoe'],
    ['johndoe', 'johndoe'],
    ['johnDoe', 'johnDoe'],
    ['john-doe', 'john-doe'],
  ])('cleanInstagramUserInput(%s)', (input, expected) => {
    expect(cleanInstagramUserInput(input)).toBe(expected);
  });
});

describe('cleanLinkedInUserInput', () => {
  test.each([
    ['https://linkedin.com/in/johndoe', 'johndoe'],
    ['https://linkedin.com/in/john-doe', 'john-doe'],
    ['https://linkedin.com/in/john-doe/', 'john-doe'],
    ['https://www.linkedin.com/in/john-doe/', 'john-doe'],
    ['http://linkedin.com/in/johndoe', 'johndoe'],
    ['http://linkedin.com/in/johndoe?utm_source=mobile', 'johndoe'],
    ['johndoe', 'johndoe'],
    ['johnDoe', 'johnDoe'],
    ['john-doe', 'john-doe'],
  ])('cleanLinkedInUserInput(%s)', (input, expected) => {
    expect(cleanLinkedInUserInput(input)).toBe(expected);
  });
});

describe('cleanTwitterUserInput', () => {
  test.each([
    ['https://twitter.com/johndoe', 'johndoe'],
    ['https://twitter.com/john-doe', 'john-doe'],
    ['https://twitter.com/john-doe/', 'john-doe'],
    ['https://www.twitter.com/john-doe/', 'john-doe'],
    ['http://twitter.com/johndoe', 'johndoe'],
    ['https://x.com/johndoe', 'johndoe'],
    ['https://x.com/john-doe', 'john-doe'],
    ['https://x.com/john-doe/', 'john-doe'],
    ['https://www.x.com/john-doe/', 'john-doe'],
    ['http://x.com/johndoe', 'johndoe'],
    ['johndoe', 'johndoe'],
    ['johnDoe', 'johnDoe'],
    ['john-doe', 'john-doe'],
  ])('cleanTwitterUserInput(%s)', (input, expected) => {
    expect(cleanTwitterUserInput(input)).toBe(expected);
  });
});
