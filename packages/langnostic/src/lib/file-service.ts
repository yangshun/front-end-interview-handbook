import fs from 'fs/promises';
import * as path from 'path';

export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf8');
}

export async function writeFile(
  filePath: string,
  content: string,
): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  return await fs.writeFile(filePath, content.trim() + '\n', 'utf8');
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Ensures that the directory for the given file path exists.
 * If the file does not exist, creates an empty JSON file.
 */
export async function ensureFileAndDirExists(
  filePath: string,
  defaultContent: string = '',
): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  const exists = await fileExists(filePath);
  if (!exists) {
    await writeFile(filePath, defaultContent);
  }
}
