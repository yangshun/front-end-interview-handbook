import fs from 'fs';
import path from 'path';
import slugify from 'slugify';

type FileObj = {
  lines: Array<string>;
  slug: string | null;
  title: string | null;
};

function createFileObj() {
  return {
    lines: [],
    slug: null,
    title: null,
  };
}

const TITLE_MARKER = '### ';

async function processFile(topic: string, filePath: string, outDir: string) {
  const file = String(fs.readFileSync(filePath));
  const lines = file.split('\n');
  const allFiles: Array<FileObj> = [];

  let currentFile: FileObj | null = null;
  let stopAdding = false;

  lines.forEach((line) => {
    if (line.includes('Back to top')) {
      return;
    }

    if (line.includes('###### References')) {
      stopAdding = true;

      return;
    }

    if (line.startsWith(TITLE_MARKER)) {
      stopAdding = false;
      if (currentFile != null) {
        allFiles.push(currentFile);
      }

      currentFile = createFileObj();
      currentFile.title = line.replace(new RegExp(`^${TITLE_MARKER}`), '');
      currentFile.slug = slugify(line)
        .toLocaleLowerCase()
        .replace(/(\?|\.|"|:|'|\(|\)|\*)/g, '');
    } else if (!stopAdding) {
      if (
        line !== '' ||
        (line === '' &&
          currentFile!.lines.length > 0 &&
          currentFile!.lines[currentFile!.lines.length - 1] !== '')
      ) {
        currentFile?.lines.push(line);
      }
    }
  });

  if (currentFile != null) {
    allFiles.push(currentFile);
  }

  await Promise.all(
    allFiles.map(async (fileObj) => {
      const fileContents =
        `
---
slug: ${fileObj.slug}
title: ${fileObj.title?.includes(':') ? `"${fileObj.title}"` : fileObj.title}
languages: []
companies: []
premium: false
duration: 5
published: true
difficulty: medium
---

${fileObj.lines.join('\n').trim()}

## Source

- [Front End Interview Handbook](https://www.frontendinterviewhandbook.com/${topic}-questions)
`.trim() + '\n';

      fs.mkdirSync(outDir, { recursive: true });

      return await fs.writeFileSync(
        path.join(outDir, `${fileObj.slug}.mdx`),
        fileContents,
      );
    }),
  );
}

processFile(
  'javascript',
  path.join(process.cwd(), 'scripts/data/javascript-questions.md'),
  path.join(process.cwd(), 'questions/quiz/javascript'),
);
processFile(
  'css',
  path.join(process.cwd(), 'scripts/data/css-questions.md'),
  path.join(process.cwd(), 'questions/quiz/css'),
);
processFile(
  'html',
  path.join(process.cwd(), 'scripts/data/html-questions.md'),
  path.join(process.cwd(), 'questions/quiz/html'),
);
