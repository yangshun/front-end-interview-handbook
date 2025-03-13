export function cleanGitHubUserInput(value: string) {
  const match = value.match(/github\.com\/([a-zA-Z0-9-]+)/);

  if (match) {
    return match[1].trim();
  }

  return value.trim();
}

export function cleanInstagramUserInput(value: string) {
  const match = value.match(/instagram\.com\/([a-zA-Z0-9-_.]+)/);

  if (match) {
    return match[1].trim();
  }

  return value.trim();
}

export function cleanLinkedInUserInput(value: string) {
  const match = value.match(/linkedin\.com\/in\/([a-zA-Z0-9-_]+)/);

  if (match) {
    return match[1].trim();
  }

  return value.trim();
}

export function cleanTwitterUserInput(value: string) {
  const match = value.match(/(x|twitter)\.com\/([a-zA-Z0-9-_]+)/);

  if (match) {
    return match[2].trim();
  }

  return value.trim();
}
