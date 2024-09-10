const languageMapping: Record<string, string> = {
  js: 'javascript',
  jsx: 'javascript',
  svelte: 'html',
  ts: 'typescript',
  tsx: 'typescript',
  // TODO(workspace): Not ideal but works for now.
  vue: 'html',
};

export default function getLanguageFromFilePath(filePath: string): string {
  const parts = filePath.split('.');
  const ext = parts[parts.length - 1];

  return ext in languageMapping ? languageMapping[ext] : ext;
}
