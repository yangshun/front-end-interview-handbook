const languageMapping: Record<string, string> = {
  css: 'css',
  js: 'javascript',
  jsx: 'javascript',
  svelte: 'html',
  ts: 'typescript',
  tsx: 'typescript',
  // TODO(workspace): Not ideal but works for now.
  vue: 'html',
};

export default function getLanguageFromFilePath(
  filePath?: string,
): { ext: string | null; language: string | null } | null {
  if (filePath == null) {
    return null;
  }

  const parts = filePath.split('.');
  const ext = parts[parts.length - 1];

  return {
    ext,
    language: ext in languageMapping ? languageMapping[ext] : null,
  };
}
